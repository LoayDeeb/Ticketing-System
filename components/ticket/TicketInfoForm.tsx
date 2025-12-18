import React, { useState } from 'react';
import { Ticket, ChevronDown, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TicketInfoFormProps {
  initialStatus?: string;
  initialDepartment?: string;
  initialType?: string;
  initialClassification?: string;
  onSave?: (data: TicketFormData) => void;
}

interface TicketFormData {
  statusId: string;
  departmentId: string;
  typeId: string;
  classificationId: string;
  tags: string[];
}

const statusOptions = [
  { value: "987", label: "Created" },
  { value: "2089", label: "Assigned" },
  { value: "3191", label: "Open" },
  { value: "4293", label: "Pending" },
  { value: "5395", label: "On Hold" },
  { value: "6497", label: "Solved" },
  { value: "7599", label: "ReOpen" },
  { value: "8701", label: "Closed" },
  { value: "9803", label: "Unassigned Ticket" }
];

const departmentOptions = [
  { value: "0", label: "Select Department" },
  { value: "19799", label: "General" }
];

const typeOptions = [
  { value: "22", label: "Issue" }
];

const classificationOptions = [
  { value: "21", label: "Unsubscribe Issues" }
];

export const TicketInfoForm = ({
  initialStatus = "987",
  initialDepartment = "19799",
  initialType = "22",
  initialClassification = "21",
  onSave
}: TicketInfoFormProps) => {
  const [formData, setFormData] = useState<TicketFormData>({
    statusId: initialStatus,
    departmentId: initialDepartment,
    typeId: initialType,
    classificationId: initialClassification,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-6"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D3E8FB]">
            <Ticket size={14} className="text-[#50A5F1]" />
          </div>
          <h4 className="m-0 font-medium text-[19.6px] text-[#495057]">
            Ticket Info
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
            <div className="relative">
              <select 
                id="status" 
                name="statusId" 
                value={formData.statusId} 
                onChange={handleInputChange} 
                className="w-full h-[38px] px-3 py-1.5 text-[13px] bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none text-slate-600 transition-all cursor-pointer"
              >
                {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="department" className="block text-sm font-medium text-slate-700">Department</label>
            <div className="relative">
              <select 
                id="department" 
                name="departmentId" 
                value={formData.departmentId} 
                onChange={handleInputChange} 
                className="w-full h-[38px] px-3 py-1.5 text-[13px] bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none text-slate-600 transition-all cursor-pointer"
              >
                {departmentOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-slate-700">TicketTypeId</label>
            <div className="relative">
              <select 
                id="type" 
                name="typeId" 
                value={formData.typeId} 
                onChange={handleInputChange} 
                className="w-full h-[38px] px-3 py-1.5 text-[13px] bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none text-slate-600 transition-all cursor-pointer"
              >
                {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="classification" className="block text-sm font-medium text-slate-700">TicketClassificationId</label>
            <div className="relative">
              <select 
                id="classification" 
                name="classificationId" 
                value={formData.classificationId} 
                onChange={handleInputChange} 
                className="w-full h-[38px] px-3 py-1.5 text-[13px] bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none text-slate-600 transition-all cursor-pointer"
              >
                {classificationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <div className="min-h-[38px] p-1.5 flex flex-wrap gap-2 bg-white border border-slate-200 rounded focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              {formData.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 focus:outline-none">×</button>
                </span>
              ))}
              <input 
                type="text" 
                value={tagInput} 
                onChange={e => setTagInput(e.target.value)} 
                onKeyDown={handleAddTag} 
                placeholder={formData.tags.length === 0 ? "Add tags..." : ""} 
                className="flex-1 min-w-[110px] h-[27px] px-2 text-[13px] text-slate-600 focus:outline-none bg-transparent" 
              />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="inline-flex items-center gap-2 px-3 py-2 bg-[#556EE6] hover:bg-[#485ec4] text-white text-[13px] font-normal rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#556EE6]">
              <Save size={14} />
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

