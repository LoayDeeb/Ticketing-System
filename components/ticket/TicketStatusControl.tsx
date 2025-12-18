"use client";

import React, { useState } from 'react';
import { Pause, Play, Ticket, Info, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type TicketStatus = 'Active' | 'On Hold' | 'Resolved' | 'Closed';

interface TicketStatusControlProps {
  ticketNumber?: string;
  initialStatus?: TicketStatus;
  onStatusChange?: (status: TicketStatus) => void;
}

export const TicketStatusControl = ({
  ticketNumber = "111",
  initialStatus = "Active",
  onStatusChange
}: TicketStatusControlProps) => {
  const [status, setStatus] = useState<TicketStatus>(initialStatus);
  const [isHovered, setIsHovered] = useState(false);

  const toggleStatus = () => {
    const nextStatus = status === 'Active' ? 'On Hold' : 'Active';
    setStatus(nextStatus);
    onStatusChange?.(nextStatus);
  };

  const getStatusConfig = (currentStatus: TicketStatus) => {
    switch (currentStatus) {
      case 'Active':
        return {
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: <Play className="w-3 h-3" />,
          buttonLabel: 'Pause',
          buttonIcon: <Pause className="w-4 h-4" />,
          buttonColor: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 shadow-amber-200'
        };
      case 'On Hold':
        return {
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: <Clock className="w-3 h-3" />,
          buttonLabel: 'Resume',
          buttonIcon: <Play className="w-4 h-4" />,
          buttonColor: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-emerald-200'
        };
      default:
        return {
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          icon: <Info className="w-3 h-3" />,
          buttonLabel: 'Update',
          buttonIcon: <Play className="w-4 h-4" />,
          buttonColor: 'bg-slate-500 hover:bg-slate-600'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="w-full mb-6">
      <div 
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-lg">
            <Ticket className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
              TICKET #{ticketNumber}
            </h3>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                STATUS:
              </span>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={status} 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }} 
                  className={cn("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium", config.bg, config.color, config.border)}
                >
                  {config.icon}
                  {status}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="hidden md:block h-10 w-px bg-slate-100 mx-2" />
          
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={toggleStatus} 
            className={cn("flex flex-1 sm:flex-none items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 shadow-lg cursor-pointer", config.buttonColor)}
          >
            {config.buttonIcon}
            <span>{config.buttonLabel}</span>
          </motion.button>

          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-help" title="Ticket Details">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Agent Assigned', value: 'John Smith', icon: <CheckCircle2 className="w-4 h-4" /> },
          { label: 'Priority', value: 'High', icon: <div className="w-2 h-2 rounded-full bg-rose-500" /> },
          { label: 'Last Activity', value: '2 mins ago', icon: <Clock className="w-4 h-4" /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-50/50 border border-slate-100 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              {stat.icon}
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <div className="text-sm font-semibold text-slate-700 ml-6">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

