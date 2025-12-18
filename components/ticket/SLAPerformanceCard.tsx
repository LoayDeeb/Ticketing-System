"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Timer, ChevronDown, History, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SLAStatus = 'MET' | 'PENDING' | 'BREACHED';

export interface OLAHistoryItem {
  department: string;
  timeSpent: string;
  status: 'MET' | 'BREACHED';
}

interface SLAPerformanceCardProps {
  overallDeadline: string;
  timeRemaining: string;
  firstResponseStatus: SLAStatus;
  olaEnabled?: boolean;
  currentDept?: string;
  currentDeptTimeRemaining?: string;
  currentDeptProgress?: number;
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
        return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
      case 'BREACHED':
        return { color: 'text-rose-600', bg: 'bg-rose-50', icon: <ShieldAlert className="w-3.5 h-3.5" /> };
      default:
        return { color: 'text-blue-600', bg: 'bg-blue-50', icon: <Timer className="w-3.5 h-3.5" /> };
    }
  };

  const slaConfig = getStatusConfig(firstResponseStatus);
  const isUrgent = timeRemaining.startsWith("00");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-3"
    >
      <div className={cn(
        "px-4 py-2.5 border-b border-slate-100 flex items-center justify-between",
        isUrgent ? "bg-rose-50/30" : "bg-slate-50/50"
      )}>
        <div className="flex items-center gap-2">
          <Clock className={cn("w-3.5 h-3.5", isUrgent ? "text-rose-500 animate-pulse" : "text-slate-400")} />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Overall SLA</span>
        </div>
        <div className={cn("text-sm font-mono font-bold tabular-nums", isUrgent ? "text-rose-600" : "text-slate-700")}>
          {timeRemaining}
        </div>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className={cn("flex items-center gap-2 p-1.5 rounded border border-transparent", slaConfig.bg)}>
            {slaConfig.icon}
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Response</span>
              <span className={cn("text-[11px] font-bold", slaConfig.color)}>{firstResponseStatus}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-slate-50 border border-slate-100">
            <Timer className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Resolution</span>
              <span className="text-[11px] font-bold text-slate-600 uppercase">Pending</span>
            </div>
          </div>
        </div>

        {olaEnabled && (
          <div className="bg-indigo-50/20 p-2.5 rounded border border-indigo-100/50">
            <div className="flex justify-between items-center mb-1.5">
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">{currentDept} OLA</div>
              <div className="text-[13px] font-mono font-bold text-slate-700">{currentDeptTimeRemaining}</div>
            </div>
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-500", currentDeptProgress > 80 ? "bg-rose-500" : "bg-indigo-500")} 
                style={{ width: `${currentDeptProgress}%` }} 
              />
            </div>
          </div>
        )}

        {olaHistory && olaHistory.length > 0 && (
          <div className="border-t border-slate-100 pt-1">
            <button 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="flex items-center justify-between w-full py-1 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <History className="w-3 h-3" />
                OLA HISTORY
              </div>
              <ChevronDown className={cn("w-3 h-3 transition-transform", isHistoryOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isHistoryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 space-y-2">
                    {olaHistory.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] bg-slate-50/50 p-1.5 rounded">
                        <span className="font-semibold text-slate-600">{item.department}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{item.timeSpent}</span>
                          <span className={cn("font-bold px-1 rounded-[2px]", item.status === 'MET' ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
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
    </div>
  );
};
