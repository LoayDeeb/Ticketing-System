"use client";

import React from 'react';
import { PageHeaderBreadcrumb } from '@/components/ticket/PageHeaderBreadcrumb';
import { TicketsTable } from '@/components/ticket/TicketsTable';

export default function TicketsOverviewPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* 1. Page Header / Breadcrumbs */}
      <PageHeaderBreadcrumb 
        title="Tickets Overview" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tickets', active: true }
        ]}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* 2. Main Tickets Table */}
        <TicketsTable />
      </div>
    </div>
  );
}

