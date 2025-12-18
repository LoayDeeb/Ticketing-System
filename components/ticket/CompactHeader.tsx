"use client";

import React, { useState } from 'react';
import { Home, Ticket, Pause, Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

interface CompactHeaderProps {
  ticketNumber: string;
  status: string;
  title: string;
  breadcrumbs: BreadcrumbItem[];
  onStatusToggle?: () => void;
}

export const CompactHeader = ({
  ticketNumber = "111",
  status = "Active",
  title = "Ticket Histories",
  breadcrumbs,
  onStatusToggle
}: CompactHeaderProps) => {
  return (
    <div className="w-full bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Left: Breadcrumbs & Title */}
      <div className="flex items-center gap-4">
        <nav aria-label="breadcrumb" className="hidden md:block">
          <ol className="flex items-center list-none p-0 m-0">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center text-[12px] font-medium">
                {index > 0 && <span className="px-2 text-gray-300">/</span>}
                {item.active ? (
                  <span className="text-[#74788d]">{item.label}</span>
                ) : (
                  <a href={item.href || '#'} className="text-[#495057] hover:text-primary transition-colors flex items-center gap-1">
                    {item.label === 'Home' && <Home size={12} />}
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="h-4 w-px bg-gray-200 hidden md:block" />
        <div className="flex items-center gap-2">
          <h4 className="text-[14px] font-bold text-[#495057] uppercase tracking-tight m-0">
            TICKET #{ticketNumber}
          </h4>
          <span className="text-gray-300">|</span>
          <span className="text-[13px] font-medium text-slate-500 truncate max-w-[300px]">
            {title}
          </span>
        </div>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border",
          status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Active' ? "bg-emerald-500" : "bg-amber-500")} />
          {status}
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={onStatusToggle}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded text-white text-[12px] font-bold transition-all shadow-sm",
            status === 'Active' ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"
          )}
        >
          {status === 'Active' ? <Pause size={12} /> : <Play size={12} />}
          {status === 'Active' ? 'Pause' : 'Resume'}
        </motion.button>
        
        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors">
          <Info size={16} />
        </button>
      </div>
    </div>
  );
};

