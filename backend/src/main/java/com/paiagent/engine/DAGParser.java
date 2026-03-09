package com.paiagent.engine;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class DAGParser {

    // 拓扑排序 (Kahn 算法)
    public List<String> topologicalSort(WorkflowGraph graph) {
        Map<String, Integer> inDegree = new HashMap<>();
        Map<String, List<String>> adj = new HashMap<>();
        
        for (WorkflowGraph.Node node : graph.getNodes()) {
            inDegree.put(node.getId(), 0);
            adj.put(node.getId(), new ArrayList<>());
        }
        
        for (WorkflowGraph.Edge edge : graph.getEdges()) {
            adj.get(edge.getSource()).add(edge.getTarget());
            inDegree.put(edge.getTarget(), inDegree.get(edge.getTarget()) + 1);
        }
        
        Queue<String> queue = new LinkedList<>();
        for (Map.Entry<String, Integer> entry : inDegree.entrySet()) {
            if (entry.getValue() == 0) {
                queue.add(entry.getKey());
            }
        }
        
        List<String> sortedList = new ArrayList<>();
        while (!queue.isEmpty()) {
            String u = queue.poll();
            sortedList.add(u);
            
            for (String v : adj.get(u)) {
                inDegree.put(v, inDegree.get(v) - 1);
                if (inDegree.get(v) == 0) {
                    queue.add(v);
                }
            }
        }
        
        if (sortedList.size() != graph.getNodes().size()) {
            throw new RuntimeException("检测到循环依赖，无法进行拓扑排序");
        }
        
        return sortedList;
    }

    // DFS 循环依赖检测
    public void detectCycle(WorkflowGraph graph) {
        Map<String, List<String>> adj = new HashMap<>();
        for (WorkflowGraph.Node node : graph.getNodes()) {
            adj.put(node.getId(), new ArrayList<>());
        }
        for (WorkflowGraph.Edge edge : graph.getEdges()) {
            adj.get(edge.getSource()).add(edge.getTarget());
        }
        
        Set<String> visited = new HashSet<>();
        Set<String> recStack = new HashSet<>();
        
        for (String nodeId : adj.keySet()) {
            if (hasCycle(nodeId, adj, visited, recStack)) {
                throw new RuntimeException("检测到循环依赖: " + nodeId);
            }
        }
    }

    private boolean hasCycle(String u, Map<String, List<String>> adj, Set<String> visited, Set<String> recStack) {
        if (recStack.contains(u)) return true;
        if (visited.contains(u)) return false;
        
        visited.add(u);
        recStack.add(u);
        
        for (String v : adj.get(u)) {
            if (hasCycle(v, adj, visited, recStack)) return true;
        }
        
        recStack.remove(u);
        return false;
    }
}
