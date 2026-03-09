package com.paiagent.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/execution")
public class ExecutionController {
    // 存储活跃的 Emitter
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    @GetMapping("/stream/{workflowId}")
    public SseEmitter stream(@PathVariable String workflowId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.put(workflowId, emitter);
        
        emitter.onCompletion(() -> emitters.remove(workflowId));
        emitter.onTimeout(() -> emitters.remove(workflowId));
        
        return emitter;
    }
    
    // 供引擎调用的发送方法
    public void sendEvent(String workflowId, String eventName, Object data) {
        SseEmitter emitter = emitters.get(workflowId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name(eventName).data(data));
            } catch (Exception e) {
                emitters.remove(workflowId);
            }
        }
    }
}
