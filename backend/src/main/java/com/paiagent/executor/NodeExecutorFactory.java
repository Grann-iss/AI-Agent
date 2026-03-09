package com.paiagent.executor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import jakarta.annotation.PostConstruct;

@Component
public class NodeExecutorFactory {
    @Autowired
    private List<NodeExecutor> executors;

    private final Map<String, NodeExecutor> executorMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        for (NodeExecutor executor : executors) {
            executorMap.put(executor.getNodeType(), executor);
        }
    }

    public NodeExecutor getExecutor(String nodeType) {
        NodeExecutor executor = executorMap.get(nodeType);
        if (executor == null) {
            throw new IllegalArgumentException("No executor found for node type: " + nodeType);
        }
        return executor;
    }
}
