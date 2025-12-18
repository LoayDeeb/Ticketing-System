"use client";

import React from 'react';
import { PageHeaderBreadcrumb } from '@/components/ticket/PageHeaderBreadcrumb';
import { TicketStatusControl } from '@/components/ticket/TicketStatusControl';
import { TicketHeader } from '@/components/ticket/TicketHeader';
import { TicketInfoForm } from '@/components/ticket/TicketInfoForm';
import { ContactInfoHeader } from '@/components/ticket/ContactInfoHeader';
import { SupportTicketCard } from '@/components/ticket/SupportTicketCard';
import { SLAPerformanceCard } from '@/components/ticket/SLAPerformanceCard';

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const ticketId = params.id || "111";

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* 1. Page Header / Breadcrumbs */}
      <PageHeaderBreadcrumb 
        title="Ticket Details" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tickets', href: '/tickets' },
          { label: `Ticket #${ticketId}`, active: true }
        ]}
      />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6">
        {/* 2. Highlight / Status Bar */}
        <TicketStatusControl ticketNumber={ticketId} />

        {/* 3. Contact Quick Info Header (Now includes Email and Mobile) */}
        <ContactInfoHeader 
          name="Loay Deeb" 
          email="louy22009@hotmail.com"
          mobile="+962791748785"
          tags={["VIP Customer", "Priority Support"]} 
          className="bg-white rounded-lg border border-gray-100 shadow-sm px-6 mb-6"
        />

        {/* 4. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Column (Left) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Ticket Header (Title & Priority) */}
            <TicketHeader 
              title="تعذر إلغاء الاشتراك اليومي – موبايلي" 
              initialPriorityId={4} 
            />

            {/* Ticket Content (Description, Attachments, Reply) */}
            <SupportTicketCard id={ticketId} />
          </div>

          {/* Sidebar Column (Right) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Ticket Info Form (Primary Action - Top Visibility) */}
            <TicketInfoForm />

            {/* 2. SLA/OLA Performance (Secondary Action - Right under Form) */}
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
  );
}
