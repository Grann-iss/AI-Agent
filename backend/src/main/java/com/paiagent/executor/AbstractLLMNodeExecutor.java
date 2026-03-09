package com.paiagent.executor;

import com.paiagent.client.ChatClient;
import com.paiagent.entity.NodeDefinition;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;

public abstract class AbstractLLMNodeExecutor implements NodeExecutor {

    protected abstract ChatClient getChatClient();

    @Override
    public Map<String, Object> execute(NodeDefinition node, Map<String, Object> input, Consumer<Map<String, Object>> callback) {
        Map<String, Object> config = new HashMap<>(); // 简化解析
        String prompt = input.getOrDefault("prompt", "").toString();
        
        long startTime = System.currentTimeMillis();
        String response = getChatClient().chat(prompt, config);
        long duration = System.currentTimeMillis() - startTime;
        
        Map<String, Object> result = new HashMap<>();
        result.put("response", response);
        result.put("duration", duration);
        return result;
    }
}
