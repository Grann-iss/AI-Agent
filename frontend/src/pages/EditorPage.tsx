import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider, useReactFlow, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '../store/workflowStore';
import { NodePanel } from '../components/NodePanel';
import { ConfigurationPanel } from '../components/ConfigurationPanel';

const FlowCanvas: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNode } = useWorkflowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = project({ x: event.clientX - 256, y: event.clientY - 64 }); // 减去面板宽度和顶部高度
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'default',
      position,
      data: { label: `${type} 节点` },
    };
    addNode(newNode);
  }, [project, addNode]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  return (
    <div className="flex-1" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export const EditorPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-gray-50">
        <NodePanel />
      </div>
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
      <div className="w-80 border-l bg-gray-50">
        <ConfigurationPanel />
      </div>
    </div>
  );
};
