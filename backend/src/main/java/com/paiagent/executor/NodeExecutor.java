package com.paiagent.executor;

import com.paiagent.entity.NodeDefinition;
import java.util.Map;
import java.util.function.Consumer;

public interface NodeExecutor {
    // 节点类型标识
    String getNodeType();

    // 执行节点
    // node: 节点定义
    // input: 输入数据
    // callback: 执行回调，用于处理中间结果或进度
    Map<String, Object> execute(NodeDefinition node, Map<String, Object> input, Consumer<Map<String, Object>> callback);
}
