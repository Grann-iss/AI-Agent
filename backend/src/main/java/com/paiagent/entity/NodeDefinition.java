package com.paiagent.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("node_definition")
public class NodeDefinition {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String nodeType;
    private String displayName;
    private String category;
    private String icon;
    private String inputSchema; // JSON
    private String outputSchema; // JSON
    private String configSchema; // JSON
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
    
    @TableLogic
    private Integer deleted;
}
