# PaiAgent - 用户指南与开发规范

## 1. 项目概述
PaiAgent 是一个企业级 AI Agent 工作流可视化编排平台。

## 2. 技术架构
- **前端 (Frontend)**: React + TypeScript + Vite + Zustand + ReactFlow
- **后端 (Backend)**: Node.js + Express + TypeScript
- **通信**: REST API (Swagger/OpenAPI) + SSE (实时事件)

## 3. 项目目录结构
```
PaiAgent/
├── src/              # 核心源码
│   ├── workflow/     # 工作流引擎核心
│   └── ...
├── server.ts         # Express 后端入口
└── ...
```

## 4. 开发任务清单
- [x] Node.js + Express + React 全栈架构搭建
- [x] Swagger UI 集成
- [x] 工作流引擎基础架构 (DAGParser, NodeExecutor)
- [ ] LLM 节点执行器实现
- [ ] TTS 节点执行器实现
- [ ] 工作流执行引擎 (SSE 推送)
- [ ] 前端工作流可视化编排
