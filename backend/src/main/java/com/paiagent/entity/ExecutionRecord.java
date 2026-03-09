package com.paiagent.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("execution_record")
public class ExecutionRecord {
    @TableId
    private String id;
    private String workflowId;
    private String status; // STARTING, RUNNING, SUCCESS, ERROR
    private String inputData;
    private String outputData;
    private Long duration;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
