export interface NodeExecutor {
  getSupportedNodeType(): string;
  execute(node: any, input: any, progressCallback?: (progress: number) => void): Promise<any>;
}

export class NodeExecutorFactory {
  private executors: Map<string, NodeExecutor> = new Map();

  register(executor: NodeExecutor) {
    this.executors.set(executor.getSupportedNodeType(), executor);
  }

  getExecutor(nodeType: string): NodeExecutor {
    const executor = this.executors.get(nodeType);
    if (!executor) {
      throw new Error(`未找到支持节点类型: ${nodeType} 的执行器`);
    }
    return executor;
  }
}
