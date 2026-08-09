"use client";

import { useRequestPlaygroundStore } from "../store/useRequestStore";
import RequestBar from "./request-bar";
import RequestEditorArea from "./request-editor-area";
import ResponseViewer from "./response-viewer";


export default function RequestEditor() {
  const { tabs, activeTabId, updateTab, responseViewerData } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  if (!activeTab) return null;

  const currentResponse = activeTab.responseViewerData || responseViewerData;

  return (
    <div className="flex flex-col items-center justify-start py-4 px-4 w-full">
      <RequestBar tab={activeTab} updateTab={updateTab} />

      <div className="flex flex-1 flex-col w-full justify-start mt-4 items-center">
        <RequestEditorArea tab={activeTab} updateTab={updateTab} />
      </div>

      {currentResponse && (
        <ResponseViewer responseData={currentResponse} />
      )}
    </div>
  );
}
