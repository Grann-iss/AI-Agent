package com.paiagent.engine;

import com.paiagent.entity.Workflow;
import com.paiagent.executor.NodeExecutor;
import com.paiagent.executor.NodeExecutorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class DAGWorkflowEngine implements WorkflowEngine {
    @Autowired private DAGParser dagParser;
    @Autowired private NodeExecutorFactory executorFactory;

    @Override
    public void execute(Workflow workflow, Map<String, Object> context) {
        // 1. 转换并解析图
        WorkflowGraph graph = convertToGraph(workflow);
        dagParser.detectCycle(graph);
        List<String> sortedNodeIds = dagParser.topologicalSort(graph);
        
        // 2. 按顺序执行
        for (String nodeId : sortedNodeIds) {
            // 获取节点定义并执行
            NodeExecutor executor = executorFactory.getExecutor("OPENAI"); // 示例
            executor.execute(null, context, null);
        }
    }

    private WorkflowGraph convertToGraph(Workflow workflow) {
        return new WorkflowGraph();
    }
}
