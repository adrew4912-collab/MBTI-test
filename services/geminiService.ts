import { MBTIScore } from "../types";
import { PERSONALITY_REPORTS } from "../data/personalityReports";

export const generatePersonalityReport = (type: string, scores: MBTIScore): string => {
  // 直接从本地数据查找对应类型的报告
  const report = PERSONALITY_REPORTS.find(r => r.type === type)?.content;
  
  if (report) {
    return report;
  }
  
  return "## 报告加载错误\n\n抱歉，未能找到该性格类型的详细分析数据。";
};
