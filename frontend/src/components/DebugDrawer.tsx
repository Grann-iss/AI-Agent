import React, { useEffect, useState } from 'react';

interface DebugLog {
  event: string;
  data: any;
  timestamp: string;
}

export const DebugDrawer: React.FC<{ workflowId: string }> = ({ workflowId }) => {
  const [logs, setLogs] = useState<DebugLog[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/execution/stream/${workflowId}`);
    
    eventSource.onmessage = (event) => {
      console.log('SSE Message:', event.data);
    };

    // 监听特定事件
    ['WORKFLOW_START', 'NODE_START', 'NODE_SUCCESS', 'NODE_PROGRESS', 'NODE_ERROR', 'WORKFLOW_COMPLETE'].forEach(eventName => {
      eventSource.addEventListener(eventName, (event: any) => {
        setLogs(prev => [...prev, { event: eventName, data: JSON.parse(event.data), timestamp: new Date().toLocaleTimeString() }]);
      });
    });

    return () => eventSource.close();
  }, [workflowId]);

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-900 text-green-400 font-mono text-xs">
      <h2 className="font-bold mb-4 text-white">调试日志</h2>
      {logs.map((log, index) => (
        <div key={index} className="mb-2">
          <span className="text-gray-500">[{log.timestamp}]</span>
          <span className="text-blue-400 font-bold"> {log.event}: </span>
          <span>{JSON.stringify(log.data)}</span>
        </div>
      ))}
    </div>
  );
};
