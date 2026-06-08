import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRequestToCollection,
  getAllRequestFromCollection,
  Request,
  run,
  runDirect,
  runUnsavedRequest,
  saveRequest,
} from "../actions";
import { useRequestPlaygroundStore } from "../store/useRequestStore";

export function useAddRequestToCollection(collectionId: string) {
  const queryClient = useQueryClient();
  const { updateTabFromSavedRequest, activeTabId } = useRequestPlaygroundStore();
  return useMutation({
    mutationFn: async (value: Request) => addRequestToCollection(collectionId, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
      // @ts-ignore
      updateTabFromSavedRequest(activeTabId!, data);
    },
  });
}

export function useGetAllRequestFromCollection(collectionId: string) {

  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}

export function useSaveRequest(id: string) {
 const { updateTabFromSavedRequest, activeTabId } = useRequestPlaygroundStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });

      // @ts-ignore
       updateTabFromSavedRequest(activeTabId!, data);
    },
  });
}

export interface RunRequestInput {
  requestId?: string;
  method: string;
  url: string;
  headers?: string;
  parameters?: string;
  body?: string;
}

export function useRunRequest() {
  const { setResponseViewerData } = useRequestPlaygroundStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RunRequestInput) => {
      // Parse JSON strings to objects for the server actions
      let parsedHeaders: Record<string, string> | undefined;
      let parsedParams: Record<string, any> | undefined;

      try {
        if (input.headers) {
          const arr = JSON.parse(input.headers);
          if (Array.isArray(arr)) {
            parsedHeaders = {};
            arr.forEach((item: { key: string; value: string }) => {
              if (item.key?.trim()) parsedHeaders![item.key] = item.value;
            });
          }
        }
      } catch { /* ignore parse errors */ }

      try {
        if (input.parameters) {
          const arr = JSON.parse(input.parameters);
          if (Array.isArray(arr)) {
            parsedParams = {};
            arr.forEach((item: { key: string; value: string }) => {
              if (item.key?.trim()) parsedParams![item.key] = item.value;
            });
          }
        }
      } catch { /* ignore parse errors */ }

      if (input.requestId) {
        // Saved request — use runDirect with live UI values
        return runDirect({
          id: input.requestId,
          method: input.method,
          url: input.url,
          headers: parsedHeaders,
          parameters: parsedParams,
          body: input.body,
        });
      } else {
        // Unsaved request — use runUnsavedRequest (no DB write)
        return runUnsavedRequest({
          method: input.method,
          url: input.url,
          headers: parsedHeaders,
          parameters: parsedParams,
          body: input.body,
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setResponseViewerData(data as any);
    },
  });
}