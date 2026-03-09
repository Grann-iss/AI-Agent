import React, { useEffect, useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { debounce } from 'lodash';

export const ConfigurationPanel: React.FC = () => {
  const { selectedNode, updateNodeData } = useWorkflowStore();
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
    }
  }, [selectedNode]);

  const debouncedUpdate = debounce((nodeId: string, label: string) => {
    updateNodeData(nodeId, { label });
  }, 500);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    if (selectedNode) {
      debouncedUpdate(selectedNode.id, newLabel);
    }
  };

  if (!selectedNode) {
    return <div className="p-4 text-gray-500">请选择一个节点进行配置</div>;
  }

  return (
    <div className="p-4">
      <h2 className="font-bold mb-4">节点配置: {selectedNode.id}</h2>
      <label className="block mb-2">节点名称</label>
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        className="w-full border p-2 rounded"
      />
    </div>
  );
};
