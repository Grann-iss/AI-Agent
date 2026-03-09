package com.paiagent.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.paiagent.entity.ExecutionRecord;
import com.paiagent.mapper.ExecutionRecordMapper;
import org.springframework.stereotype.Service;

@Service
public class ExecutionRecordService extends ServiceImpl<ExecutionRecordMapper, ExecutionRecord> {
}
