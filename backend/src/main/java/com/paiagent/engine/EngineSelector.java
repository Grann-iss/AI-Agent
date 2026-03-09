package com.paiagent.engine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EngineSelector {
    @Autowired private DAGWorkflowEngine dagEngine;

    public WorkflowEngine getEngine(String type) {
        if ("DAG".equals(type)) return dagEngine;
        return dagEngine;
    }
}
