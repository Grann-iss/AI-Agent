import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { authInterceptor } from "./backend/src/interceptor/AuthInterceptor";
import { login } from "./backend/src/controller/AuthController";

// ... (existing imports)

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PaiAgent API",
      version: "1.0.0",
      description: "PaiAgent 后端接口文档",
    },
  },
  apis: ["./server.ts"], // 扫描当前文件中的注释
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Swagger UI 路由
  app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Public routes
  // ... (existing routes)
  // Auth Routes
  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *     summary: 用户登录
   *     tags: [Auth]
   */
  app.post("/api/auth/login", login);

  /**
   * @openapi
   * /api/auth/logout:
   *   post:
   *     summary: 用户登出
   *     tags: [Auth]
   */
  app.post("/api/auth/logout", (req, res) => res.json({ message: "Logged out" }));

  /**
   * @openapi
   * /api/auth/me:
   *   get:
   *     summary: 获取当前用户信息
   *     tags: [Auth]
   */
  app.get("/api/auth/me", (req, res) => res.json({ user: { id: 1, name: "admin" } }));

  // Workflow Routes
  /**
   * @openapi
   * /api/workflows:
   *   post:
   *     summary: 创建工作流
   *     tags: [Workflow]
   *   get:
   *     summary: 获取工作流列表
   *     tags: [Workflow]
   */
  app.post("/api/workflows", (req, res) => res.json({ id: "new-id" }));
  app.get("/api/workflows", (req, res) => res.json([]));

  /**
   * @openapi
   * /api/workflows/{id}:
   *   get:
   *     summary: 获取工作流详情
   *     tags: [Workflow]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *   put:
   *     summary: 更新工作流
   *     tags: [Workflow]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *   delete:
   *     summary: 删除工作流
   *     tags: [Workflow]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   */
  app.get("/api/workflows/:id", (req, res) => res.json({ id: req.params.id }));
  app.put("/api/workflows/:id", (req, res) => res.json({ id: req.params.id }));
  app.delete("/api/workflows/:id", (req, res) => res.json({ id: req.params.id }));

  /**
   * @openapi
   * /api/node-types:
   *   get:
   *     summary: 获取节点类型列表
   *     tags: [Workflow]
   */
  app.get("/api/node-types", (req, res) => res.json([]));

  /**
   * @openapi
   * /api/workflows/{id}/execute:
   *   post:
   *     summary: 同步执行工作流
   *     tags: [Workflow]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   */
  app.post("/api/workflows/:id/execute", (req, res) => res.json({ output: "done" }));

  /**
   * @openapi
   * /api/workflows/{id}/execute/stream:
   *   get:
   *     summary: SSE 流式执行工作流
   *     tags: [Workflow]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   */
  app.get("/api/workflows/:id/execute/stream", (req, res) => res.send("SSE stream"));

  // Protected routes
  app.use("/api", authInterceptor);
  app.post("/api/workflow/execute", (req, res) => {
    const { nodes, edges, input } = req.body;
    console.log("Executing workflow with input:", input);
    res.json({ output: "Workflow executed successfully (mock)" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
