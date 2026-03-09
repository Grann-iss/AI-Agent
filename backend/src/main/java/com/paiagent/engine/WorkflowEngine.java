package com.paiagent.engine;

import com.paiagent.entity.Workflow;
import java.util.Map;

public interface WorkflowEngine {
    void execute(Workflow workflow, Map<String, Object> context);
}
