"use client";

import React, { useState } from 'react';
import { CompactHeader } from '@/components/ticket/CompactHeader';
import { TicketHeader } from '@/components/ticket/TicketHeader';
import { TicketInfoForm } from '@/components/ticket/TicketInfoForm';
import { ContactInfoHeader } from '@/components/ticket/ContactInfoHeader';
import { SupportTicketCard } from '@/components/ticket/SupportTicketCard';
import { SLAPerformanceCard } from '@/components/ticket/SLAPerformanceCard';

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const ticketId = params.id || "111";
  const [ticketStatus, setTicketStatus] = useState<'Active' | 'On Hold'>('Active');

  const toggleStatus = () => {
    setTicketStatus(prev => prev === 'Active' ? 'On Hold' : 'Active');
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FA] overflow-hidden">
      {/* 1. Combined Compact Header (Breadcrumbs + ID + Pause/Resume) */}
      <CompactHeader 
        ticketNumber={ticketId}
        status={ticketStatus}
        title="Unsubscription Issue"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tickets', href: '/tickets' },
          { label: 'Detail', active: true }
        ]}
        onStatusToggle={toggleStatus}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1700px] mx-auto px-4 py-4">
          
          {/* 2. Unified Context Bar (Name, Email, Mobile, Tags, Priority, Status) */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm px-6 py-1 mb-4 flex flex-wrap items-center justify-between">
            <ContactInfoHeader 
              name="Loay Deeb" 
              email="louy22009@hotmail.com"
              mobile="+962791748785"
              tags={["VIP", "Priority"]} 
              className="mb-0 py-2 border-0"
            />
            <div className="h-8 w-px bg-gray-100 mx-4" />
            <div className="flex-1">
              <TicketHeader 
                title="" 
                initialPriorityId={4} 
                className="mb-0 py-0 border-0 shadow-none max-w-none"
              />
            </div>
          </div>

          {/* 3. Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* Main Column (Left) - Scrollable conversation */}
            <div className="lg:col-span-8 space-y-4">
              <SupportTicketCard id={ticketId} />
            </div>

            {/* Sidebar Column (Right) - Key Management Tools */}
            <div className="lg:col-span-4 space-y-4 sticky top-4">
              {/* Ticket Info Form (Compact 2-column grid) */}
              <TicketInfoForm />

              {/* SLA/OLA Performance (Compact view) */}
              <SLAPerformanceCard 
                overallDeadline="Dec 20, 2025 04:00 PM"
                timeRemaining="02:45:12"
                firstResponseStatus="MET"
                currentDept="Technical Support"
                currentDeptTimeRemaining="00:45:00"
                currentDeptProgress={65}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
