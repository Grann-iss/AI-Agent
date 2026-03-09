package com.paiagent.interceptor;

import com.paiagent.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private AuthService authService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 从请求头获取 Authorization
        String token = request.getHeader("Authorization");
        
        // 验证 Token
        if (authService.validateToken(token)) {
            return true; // 放行
        }
        
        // 验证失败，返回 401
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return false;
    }
}
