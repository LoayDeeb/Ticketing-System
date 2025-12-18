import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Priority {
  id: number;
  label: string;
  color: string;
}

interface Status {
  label: string;
  color: string;
}

interface TicketHeaderProps {
  title?: string;
  initialPriorityId?: number;
  initialStatus?: string;
  onPriorityChange?: (priority: Priority) => void;
}

const priorities: Priority[] = [
  { id: 1, label: 'Low', color: '#34c38f' },
  { id: 2, label: 'Medium', color: '#50a5f1' },
  { id: 3, label: 'High', color: '#f1b44c' },
  { id: 4, label: 'Urgent', color: '#f46a6a' }
];

const currentStatus: Status = {
  label: 'Created',
  color: '#3498db'
};

export const TicketHeader = ({
  title = "Unsubscription Issue",
  initialPriorityId = 3,
  onPriorityChange
}: TicketHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority>(
    priorities.find(p => p.id === initialPriorityId) || priorities[2]
  );

  const handlePrioritySelect = (priority: Priority) => {
    setSelectedPriority(priority);
    setIsOpen(false);
    if (onPriorityChange) {
      onPriorityChange(priority);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 py-3 bg-white border border-gray-100 rounded-lg shadow-sm font-sans mb-4">
      <h5 className="m-0 text-[15px] font-medium text-[#495057] truncate">
        {title}
      </h5>

      <div className="flex items-center gap-4 text-[13px] text-[#747891]">
        <div className="flex items-center gap-2">
          <span>Priority:</span>
          <div className="relative">
            <button 
              type="button" 
              onClick={() => setIsOpen(!isOpen)} 
              className={cn(
                "flex items-center gap-2 px-2 py-1 h-6 border border-[#eff2f7] rounded bg-[#f8f9fa] cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none",
                isOpen && "ring-1 ring-blue-400"
              )}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedPriority.color }} />
              <span className="text-[#495057]">{selectedPriority.label}</span>
              <ChevronDown size={14} className={cn("text-gray-400 transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                  <motion.ul 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.15, ease: "easeOut" }} 
                    className="absolute right-0 top-full mt-1 z-50 min-w-[140px] py-2 bg-white border border-gray-200 rounded shadow-lg overflow-hidden list-none"
                  >
                    {priorities.map(priority => (
                      <li key={priority.id}>
                        <button 
                          onClick={() => handlePrioritySelect(priority)} 
                          className={cn(
                            "flex items-center gap-2 w-full px-6 py-1.5 text-left text-[#212529] hover:bg-[#f8f9fa] transition-colors",
                            selectedPriority.id === priority.id && "bg-[#f8f9fa] text-[#343a40]"
                          )}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: priority.color }} />
                          {priority.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 h-6 px-4 rounded bg-[#eaf9f4] text-center">
          <span className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: currentStatus.color }} />
          <span className="text-[#212529] font-medium leading-none">
            {currentStatus.label}
          </span>
        </div>
      </div>
    </div>
  );
};

