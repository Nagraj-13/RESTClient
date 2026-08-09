"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useWorkspaceStore } from "@/modules/Layout/store";
import TabbedSidebar from "@/modules/workspace/components/sidebar";
import { useGetWorkspace } from "@/modules/workspace/hooks/workspace";
import RealtimeConnectionBar from '@/modules/realtime/components/realtime-connection-bar';
import RealtimeMessageEditor from '@/modules/realtime/components/realtime-message-editor';
import { Loader } from "lucide-react";

const Page = () => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: currentWorkspace, isLoading } = useGetWorkspace(selectedWorkspace?.id!);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin h-6 w-6 text-indigo-500" />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} maxSize={40} minSize={25} className="flex">
        <div className="flex-1">
          <TabbedSidebar currentWorkspace={currentWorkspace} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={65} minSize={40}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 space-y-2">
            <h1 className="text-2xl font-bold">WebSocket</h1>
            <p className="text-sm text-muted-foreground">Connect to a websocket server and start testing!</p>
            <RealtimeConnectionBar />
          </div>
          <div className="flex-1 overflow-auto flex flex-col px-6 pb-6">
            <RealtimeMessageEditor />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Page;