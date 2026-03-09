package com.paiagent.service;

import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    // 使用 ConcurrentHashMap 模拟 Token 存储
    private final ConcurrentHashMap<String, String> tokenStore = new ConcurrentHashMap<>();

    // 模拟登录，返回 Token
    public String login(String username, String password) {
        // 这里仅做演示，实际应查询数据库并校验密码
        if ("admin".equals(username) && "admin".equals(password)) {
            String token = UUID.randomUUID().toString();
            tokenStore.put(token, username);
            return token;
        }
        return null;
    }

    // 验证 Token
    public boolean validateToken(String token) {
        return token != null && tokenStore.containsKey(token);
    }
}
