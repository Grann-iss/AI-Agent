package com.paiagent.engine;

import lombok.Data;
import java.util.List;

@Data
public class WorkflowGraph {
    private List<Node> nodes;
    private List<Edge> edges;

    @Data
    public static class Node {
        private String id;
        private String type;
        private Object config;
    }

    @Data
    public static class Edge {
        private String source;
        private String target;
    }
}
