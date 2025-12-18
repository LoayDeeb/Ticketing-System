import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, Timer, ChevronDown, History, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SLAStatus = 'MET' | 'PENDING' | 'BREACHED';

export interface OLAHistoryItem {
  department: string;
  timeSpent: string;
  status: 'MET' | 'BREACHED';
}

interface SLAPerformanceCardProps {
  overallDeadline: string;
  timeRemaining: string; // e.g., "02:45:12"
  firstResponseStatus: SLAStatus;
  olaEnabled?: boolean;
  currentDept?: string;
  currentDeptTimeRemaining?: string;
  currentDeptProgress?: number; // 0 to 100
  olaHistory?: OLAHistoryItem[];
}

export const SLAPerformanceCard = ({
  overallDeadline = "Dec 20, 2025 04:00 PM",
  timeRemaining = "02:45:12",
  firstResponseStatus = "MET",
  olaEnabled = true,
  currentDept = "Technical Support",
  currentDeptTimeRemaining = "00:45:00",
  currentDeptProgress = 65,
  olaHistory = [
    { department: "Sales", timeSpent: "45m", status: "MET" },
    { department: "Billing", timeSpent: "4h 20m", status: "BREACHED" }
  ]
}: SLAPerformanceCardProps) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const getStatusConfig = (status: SLAStatus) => {
    switch (status) {
      case 'MET':
        return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CheckCircle2 className="w-4 h-4" /> };
      case 'BREACHED':
        return { color: 'text-rose-600', bg: 'bg-rose-50', icon: <ShieldAlert className="w-4 h-4" /> };
      default:
        return { color: 'text-blue-600', bg: 'bg-blue-50', icon: <Timer className="w-4 h-4" /> };
    }
  };

  const slaConfig = getStatusConfig(firstResponseStatus);
  const isUrgent = timeRemaining.startsWith("00"); // Example logic for urgency

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6"
    >
      {/* Header: Overall SLA */}
      <div className={cn(
        "p-4 border-b border-slate-100 transition-colors duration-500",
        isUrgent ? "bg-rose-50/50" : "bg-white"
      )}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Clock className={cn("w-4 h-4", isUrgent ? "text-rose-500 animate-pulse" : "text-slate-400")} />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall SLA</span>
          </div>
          <div className={cn(
            "text-lg font-mono font-bold tabular-nums",
            isUrgent ? "text-rose-600" : "text-slate-700"
          )}>
            {timeRemaining}
          </div>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center justify-between">
          <span>Deadline: {overallDeadline}</span>
          {isUrgent && <span className="text-rose-500 font-bold animate-pulse">ACTION REQUIRED</span>}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Milestone Badges */}
        <div className="grid grid-cols-2 gap-3">
          <div className={cn("flex flex-col p-2.5 rounded-lg border border-transparent transition-all", slaConfig.bg)}>
            <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">First Response</span>
            <div className={cn("flex items-center gap-1.5 text-sm font-semibold", slaConfig.color)}>
              {slaConfig.icon}
              {firstResponseStatus}
            </div>
          </div>
          <div className="flex flex-col p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Resolution</span>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
              <Timer className="w-4 h-4" />
              PENDING
            </div>
          </div>
        </div>

        {/* OLA Section (if enabled) */}
        {olaEnabled && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Current OLA</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="p-3 bg-indigo-50/30 rounded-lg border border-indigo-100 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[11px] font-semibold text-indigo-600 mb-0.5">{currentDept}</div>
                  <div className="text-xl font-mono font-bold text-slate-800 tracking-tight tabular-nums">
                    {currentDeptTimeRemaining}
                  </div>
                </div>
                <div className="p-2 bg-indigo-100/50 rounded-md">
                  <AlertCircle className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${currentDeptProgress}%` }}
                  className={cn(
                    "h-full transition-colors duration-500",
                    currentDeptProgress > 80 ? "bg-rose-500" : "bg-indigo-500"
                  )}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-400">Departmental Ownership</span>
                <span className="text-[10px] font-bold text-slate-500">{currentDeptProgress}% elapsed</span>
              </div>
            </div>

            {/* OLA History Accordion */}
            {olaHistory && olaHistory.length > 0 && (
              <div className="mt-4">
                <button 
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="flex items-center justify-between w-full p-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5" />
                    OLA History Log
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", isHistoryOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isHistoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-1 px-2 space-y-4">
                        {olaHistory.map((item, idx) => (
                          <div key={idx} className="relative pl-6 border-l border-slate-200 pb-1">
                            <div className={cn(
                              "absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white",
                              item.status === 'MET' ? "bg-emerald-500" : "bg-rose-500"
                            )} />
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-[11px] font-bold text-slate-700">{item.department}</div>
                                <div className="text-[10px] text-slate-400">Spent: {item.timeSpent}</div>
                              </div>
                              <span className={cn(
                                "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border",
                                item.status === 'MET' ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"
                              )}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 text-[10px] text-slate-400 italic">
        * Times are calculated based on the Support Policy: "Premium SLA v2"
      </div>
    </motion.div>
  );
};

