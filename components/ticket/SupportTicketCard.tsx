import React, { useState } from 'react';
import { Paperclip, Send, Clock, Shield, Upload, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Attachment = {
  id: string;
  url: string;
  thumbnail?: string;
  filename: string;
};

type TicketProps = {
  id?: string;
  description?: string;
  timestamp?: string;
  content?: {
    title: string;
    description: string;
    actionRequired: string;
  };
  attachments?: Attachment[];
  onReplySubmit?: (message: string, isPrivate: boolean, files: FileList | null) => void;
};

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10.138" viewBox="0 0 14 10.138" fill="#667CE8">
    <path id="Path_135" d="M25.276,47.862A.724.724,0,0,0,26,47.138V45.207A1.207,1.207,0,0,0,24.793,44H13.207A1.207,1.207,0,0,0,12,45.207v1.931a.724.724,0,0,0,.724.724,1.207,1.207,0,1,1,0,2.414A.724.724,0,0,0,12,51v1.931a1.207,1.207,0,0,0,1.207,1.207H24.793A1.207,1.207,0,0,0,26,52.931V51a.724.724,0,0,0-.724-.724,1.207,1.207,0,1,1,0-2.414ZM13.448,51.624a2.655,2.655,0,0,0,0-5.11V45.448h3.138V52.69H13.448Zm11.1,0V52.69H18.034V45.448h6.517v1.066a2.655,2.655,0,0,0,0,5.11Z" transform="translate(-12 -44)"></path>
  </svg>
);

export const SupportTicketCard = ({
  id = "111",
  description = "Description",
  timestamp = "06/08/2025 06:23 am",
  content = {
    title: "تعذر إلغاء الاشتراك اليومي – موبايلي",
    description: "أفاد المستخدم بأنه غير قادر على إلغاء الاشتراك اليومي الخاص به في خدمة موبايلي، رغم محاولته اتباع خطوات الإلغاء المعتادة.",
    actionRequired: "يرجى التحقق من المشكلة ومساعدة المستخدم في إلغاء الاشتراك اليومي."
  },
  attachments = [{
    id: "att-1",
    url: "https://chat.labibabot.com/UploadedFiles/HelpDeskUploadedFiles/1248/784dcdaf-32ff-4b2c-a698-9c18f4bfc6f5.jpeg",
    filename: "screenshot.jpeg"
  }],
  onReplySubmit
}: TicketProps) => {
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onReplySubmit) {
      onReplySubmit(message, isPrivate, selectedFiles);
    }
    setMessage('');
    setSelectedFiles(null);
  };

  return (
    <div className="w-full font-sans text-[#495057]">
      <div className="bg-white rounded-md shadow-[0_12px_24px_rgba(18,38,63,0.03)] mb-4 border border-[#eff2f7]">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0 flex items-center justify-center bg-[#e4e8fb] w-9 h-9 rounded-sm">
              <TicketIcon />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-x-4 mb-3 border-b border-gray-50 pb-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-[#74788d] uppercase tracking-wider">{description}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#74788d]" />
                  <span className="text-xs text-[#74788d]">{timestamp}</span>
                </div>
              </div>

              <div className="space-y-4 text-right" dir="rtl">
                <h2 className="text-lg font-semibold text-[#495057]">{content.title}</h2>
                <div className="text-sm leading-relaxed">
                  <p className="mb-2"><strong className="text-[#343a40]">الوصف:</strong></p>
                  <p className="text-[#495057]">{content.description}</p>
                </div>
                <div className="text-sm leading-relaxed p-3 bg-blue-50/30 rounded-lg border-r-4 border-blue-400">
                  <p className="mb-1"><strong className="text-[#343a40]">الإجراء المطلوب:</strong></p>
                  <p className="text-[#495057]">{content.actionRequired}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="bg-white rounded-md shadow-[0_12px_24px_rgba(18,38,63,0.03)] mb-4 border border-[#eff2f7]">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="hidden sm:block w-9" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-2">
                  <Paperclip className="w-3.5 h-3.5 text-[#74788d]" />
                  <span className="text-xs font-medium text-[#74788d] uppercase tracking-wider">Attachments</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {attachments.map(att => (
                    <a key={att.id} href={att.url} target="_blank" rel="noopener noreferrer" className="block group overflow-hidden border border-gray-100 rounded-lg transition-all hover:shadow-md">
                      <img 
                        src={att.url} 
                        alt={att.filename} 
                        className="w-40 h-auto object-cover transition-transform group-hover:scale-105" 
                        onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Attachment'; }} 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-md shadow-[0_12px_24px_rgba(18,38,63,0.03)] overflow-hidden border border-[#eff2f7]">
        <div className="bg-gray-50/80 px-5 py-3 border-b border-[#eff2f7] flex items-center justify-between">
          <h4 className="text-[15px] font-semibold text-[#495057]">Reply</h4>
          <div className="flex items-center gap-3">
            <div className="flex items-center cursor-pointer select-none">
              <span className="text-sm font-medium mr-2 text-[#495057]">Private</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
                <div className="w-11 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#556ee6]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="TicketId" value={id} />
            
            <div className="relative group">
              <textarea 
                className="w-full min-h-[120px] p-3 text-sm border border-[#ced4da] rounded-md focus:outline-none focus:ring-1 focus:ring-[#556ee6] focus:border-[#556ee6] transition-all resize-y placeholder:text-gray-400" 
                placeholder="Type your message here..." 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                required 
              />
              <div className="absolute bottom-3 right-3 opacity-20 pointer-events-none group-focus-within:opacity-10 transition-opacity">
                <Send className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="relative">
                <label className="flex items-center gap-2 p-2 px-3 border border-[#ced4da] border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 text-[#556ee6]" />
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedFiles ? `${selectedFiles.length} file(s) selected` : "Upload attachments"}
                  </span>
                  <input type="file" className="hidden" multiple accept=".png,.jpg,.jpeg,.gif,.pdf,.docx,.xls,.xlsx" onChange={e => setSelectedFiles(e.target.files)} />
                </label>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-[#556ee6] rounded-md hover:bg-[#485ec4] transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none" 
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Reply
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isPrivate && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded-md border border-amber-100 text-xs mt-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>This reply will only be visible to staff members.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
        <Info className="w-3.5 h-3.5" />
        <span>Ticket ID: #{id} • Generated automatically by Labiba Bot HelpDesk</span>
      </div>
    </div>
  );
};

