import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Settings, Play, TerminalSquare } from "lucide-react";
import { socketService } from "../services/socket.service";
import { useParams } from "react-router";


export default function EditorWorkspace() {
  const { roomId } = useParams();
  const [code, setCode] = useState<any>();
  const [output, setOutput] = useState("Waiting for execution...");
  const socket = socketService.getSocket();
  const handleRunCode = () => {
    setOutput("Executing...\n\n[0, 1]\n\nExecution finished.");
  };

  useEffect(() => {
    socket.on(
      "editor:code-update",
      (incomingCode: string) => {
        console.log(incomingCode, "code update")
        setCode(incomingCode);
      }
    );
    return () => {
      socket.off(
        "editor:code-update"
      )
    }
  }, [])

  const handelCodeChange = (value: any) => {
    const updatedCode = value;
    setCode(updatedCode);
    socket.emit(
      "editor:code-change",
      {
        roomId,
        code: updatedCode
      }
    )
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Editor Panel */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-[#2A2A2A] bg-[#1E1E1E] shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-400 bg-[#1E1E1E] px-3 py-1 rounded">
              &lt; &gt; solution.js
            </span>
            <span className="text-xs text-stone-500">Java </span>
          </div>
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-stone-400 cursor-pointer hover:text-white" />
            <Button
              onClick={handleRunCode}
              className="bg-[#D95D22] hover:bg-[#B84B1A] text-white text-xs h-8 px-4 flex items-center gap-2 rounded-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run Code
            </Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={handelCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

      {/* Console Panel */}
      <div className="h-48 flex flex-col rounded-xl overflow-hidden border border-[#E8DFD8] bg-white shadow-sm">
        <div className="px-4 py-2 bg-[#FCF8F5] border-b border-[#E8DFD8] flex items-center gap-2">
          <TerminalSquare className="w-4 h-4 text-stone-500" />
          <span className="text-sm font-medium text-stone-700">Console Output</span>
        </div>
        <div className="flex-1 p-4 font-mono text-sm text-stone-500 bg-white overflow-y-auto">
          {output}
        </div>
      </div>
    </div>
  );
}