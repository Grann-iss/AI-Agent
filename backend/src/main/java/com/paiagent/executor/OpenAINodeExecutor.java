package com.paiagent.executor;

import com.paiagent.client.ChatClient;
import org.springframework.stereotype.Component;

@Component
public class OpenAINodeExecutor extends AbstractLLMNodeExecutor {

    @Override
    public String getNodeType() {
        return "OPENAI";
    }

    @Override
    protected ChatClient getChatClient() {
        return (prompt, config) -> "OpenAI Response for: " + prompt;
    }
}
