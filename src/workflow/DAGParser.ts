export interface WorkflowNode {
  id: string;
  type: string;
  config: any;
  inputs: string[]; // 依赖的节点ID
}

export interface WorkflowConfig {
  nodes: WorkflowNode[];
}

export class DAGParser {
  parse(config: WorkflowConfig): WorkflowNode[] {
    const nodes = config.nodes;
    const adj = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    // 1. 构建图
    nodes.forEach(node => {
      if (!inDegree.has(node.id)) inDegree.set(node.id, 0);
      node.inputs.forEach(input => {
        if (!adj.has(input)) adj.set(input, []);
        adj.get(input)!.push(node.id);
        inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1);
      });
    });

    // 2. Kahn 算法拓扑排序
    const queue: string[] = [];
    inDegree.forEach((degree, id) => {
      if (degree === 0) queue.push(id);
    });

    const result: WorkflowNode[] = [];
    while (queue.length > 0) {
      const u = queue.shift()!;
      const node = nodes.find(n => n.id === u);
      if (node) result.push(node);

      const neighbors = adj.get(u) || [];
      neighbors.forEach(v => {
        inDegree.set(v, inDegree.get(v)! - 1);
        if (inDegree.get(v) === 0) queue.push(v);
      });
    }

    // 3. 环检测
    if (result.length !== nodes.length) {
      throw new Error("工作流中存在循环依赖");
    }

    return result;
  }
}
