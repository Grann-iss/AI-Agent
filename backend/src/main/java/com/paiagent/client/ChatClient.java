package com.paiagent.client;

import java.util.Map;

public interface ChatClient {
    String chat(String prompt, Map<String, Object> config);
}
