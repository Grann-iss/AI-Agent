import React from 'react';

const nodeTypes = [
  { type: 'LLM', label: 'LLM 节点' },
  { type: 'TOOL', label: '工具节点' },
  { type: 'TTS', label: 'TTS 节点' },
];

export const NodePanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-4">节点面板</h2>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="p-2 mb-2 border rounded cursor-grab bg-white"
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable
        >
          {node.label}
        </div>
      ))}
    </div>
  );
};
