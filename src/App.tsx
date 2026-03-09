/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, addEdge, Connection, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { LayoutGrid, Bot, Settings, Play, Save, Plus, FolderOpen } from 'lucide-react';

export default function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const handleDebug = async () => {
    const response = await fetch('/api/workflow/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges, input: "Hello world" }),
    });
    const data = await response.json();
    alert(data.output);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">PaiAgent</h1>
          <span className="text-gray-500">qoder5</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"><Plus size={16}/> 新建</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"><FolderOpen size={16}/> 加载</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Save size={16}/> 保存</button>
          <button onClick={handleDebug} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Play size={16}/> 调试</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r p-4">
          <h2 className="font-semibold mb-4">节点库</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">大模型节点</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">DeepSeek</div>
                <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">通义千问</div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">工具节点</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">超拟人音频合成</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Canvas */}
        <section className="flex-1 bg-gray-100 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </section>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l p-4">
          <h2 className="font-semibold mb-4">节点配置</h2>
          <div className="text-sm text-gray-500">请选择一个节点以查看配置</div>
        </aside>
      </main>
    </div>
  );
}

