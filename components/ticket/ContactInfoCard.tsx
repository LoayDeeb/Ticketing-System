"use client";

import React from 'react';
import { Contact } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactDetailProps {
  label: string;
  value: string;
}

const ContactDetail = ({ label, value }: ContactDetailProps) => (
  <div className="flex flex-row justify-between items-center py-4 border-b border-gray-100 last:border-0">
    <span className="text-sm font-medium text-[#747891]">{label} :</span>
    <span className="text-sm font-medium text-[#49505C]">
      {value || <span className="text-gray-300 italic">Not provided</span>}
    </span>
  </div>
);

export const ContactInfoCard = () => {
  const contactData = {
    name: "Loay Deeb",
    email: "",
    mobile: "+962791748785"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }} 
      className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FBECD2] text-[#F1B44C]">
            <Contact size={20} />
          </div>
          <h4 className="text-[19.6px] font-medium text-[#495057] m-0">
            Contact Info
          </h4>
        </div>

        <div className="flex flex-col">
          <ContactDetail label="Name" value={contactData.name} />
          <ContactDetail label="Email" value={contactData.email} />
          <ContactDetail label="Mobile Number" value={contactData.mobile} />
        </div>
      </div>
      <div className="h-1.5 w-full bg-[#F1B44C] opacity-10" />
    </motion.div>
  );
};

