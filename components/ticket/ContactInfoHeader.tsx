"use client";

import React from 'react';
import { User, MessageCircle, Tag, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContactInfoHeaderProps {
  name?: string;
  email?: string;
  mobile?: string;
  whatsappLabel?: string;
  tags?: string[];
  className?: string;
}

export const ContactInfoHeader = ({
  name = "Altibbi??",
  email = "Not provided",
  mobile = "+962791748785",
  whatsappLabel = "Whatsapp",
  tags = [],
  className
}: ContactInfoHeaderProps) => {
  const badgeVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className={cn("w-full py-4 px-2 select-none mb-4", className)}>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {/* Name Section */}
        <motion.div variants={badgeVariants} initial="initial" animate="animate" whileHover="hover" className="flex items-center gap-2 group cursor-default">
          <div className="flex items-center justify-center w-5 h-5 text-[#495057] group-hover:text-primary transition-colors">
            <User size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-medium text-[#74788D] tracking-tight">
            {name}
          </span>
        </motion.div>

        {/* Email Section */}
        {email && (
          <motion.div variants={badgeVariants} initial="initial" animate="animate" whileHover="hover" className="flex items-center gap-2 group cursor-default">
            <div className="flex items-center justify-center w-5 h-5 text-[#495057] group-hover:text-primary transition-colors">
              <Mail size={16} strokeWidth={2} />
            </div>
            <span className="text-[13px] font-medium text-[#74788D] tracking-tight">
              {email}
            </span>
          </motion.div>
        )}

        {/* Mobile Section */}
        {mobile && (
          <motion.div variants={badgeVariants} initial="initial" animate="animate" whileHover="hover" className="flex items-center gap-2 group cursor-default">
            <div className="flex items-center justify-center w-5 h-5 text-[#495057] group-hover:text-primary transition-colors">
              <Phone size={16} strokeWidth={2} />
            </div>
            <span className="text-[13px] font-medium text-[#74788D] tracking-tight">
              {mobile}
            </span>
          </motion.div>
        )}

        {/* WhatsApp Channel Section */}
        <motion.div variants={badgeVariants} initial="initial" animate="animate" whileHover="hover" className="flex items-center gap-2 group cursor-pointer border-l border-slate-200 pl-8">
          <div className="flex items-center justify-center w-5 h-5 text-[#25D366] transition-transform group-hover:scale-110">
            <MessageCircle size={16} fill="currentColor" stroke="none" />
          </div>
          <span className="text-[13px] font-medium text-[#74788D] transition-colors group-hover:text-[#495057]">
            {whatsappLabel}
          </span>
        </motion.div>

        {/* Tags Section */}
        <motion.div variants={badgeVariants} initial="initial" animate="animate" className="flex items-center gap-2 border-l border-slate-200 pl-8">
          <div className="flex items-center justify-center w-5 h-5 text-[#495057]">
            <Tag size={16} strokeWidth={2} />
          </div>
          
          <div className="flex items-center flex-wrap gap-2 max-w-[400px]">
            {tags.length > 0 ? tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[12px] leading-relaxed bg-[#000000] text-[#FFFFFF] rounded-[4px] font-medium transition-all hover:opacity-80 cursor-pointer">
                {tag}
              </span>
            )) : (
              <div className="flex items-center px-2 h-6 bg-[#000000] rounded-[4px] cursor-default group overflow-hidden">
                <span className="text-[12px] text-[#808080] font-medium whitespace-nowrap">
                  No Tags Defined
                </span>
              </div>
            )}
            
            <button className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
              <MoreHorizontal size={14} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
