"use client";

import React from 'react';
import { PageHeaderBreadcrumb } from '@/components/ticket/PageHeaderBreadcrumb';
import { Plus, Search, MoreHorizontal, CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SLAPolicy {
  id: string;
  name: string;
  priority: number;
  status: 'Active' | 'Inactive';
  targets: {
    firstResponse: string;
    resolution: string;
  };
  conditions: string[];
  olaEnabled: boolean;
}

const POLICIES: SLAPolicy[] = [
  {
    id: '1',
    name: 'VIP Payment Issues',
    priority: 1,
    status: 'Active',
    targets: { firstResponse: '15m', resolution: '4h' },
    conditions: ['Priority is Critical', 'Type is Incident', 'Tag is VIP'],
    olaEnabled: true
  },
  {
    id: '2',
    name: 'Standard Support',
    priority: 2,
    status: 'Active',
    targets: { firstResponse: '24h', resolution: '48h' },
    conditions: ['Type is Support Request'],
    olaEnabled: false
  },
  {
    id: '3',
    name: 'Internal IT Requests',
    priority: 3,
    status: 'Inactive',
    targets: { firstResponse: '4h', resolution: '24h' },
    conditions: ['Group is Internal', 'Source is Email'],
    olaEnabled: true
  }
];

export default function SLAPoliciesPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12 font-sans">
      <PageHeaderBreadcrumb 
        title="SLA Policies" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Settings', href: '/settings' },
          { label: 'SLA Policies', active: true }
        ]}
      />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Service Level Agreements</h1>
            <p className="text-slate-500 text-sm max-w-2xl">
              Define the rules that determine how quickly your team should respond to and resolve tickets. 
              Policies are applied in order of priority (top to bottom).
            </p>
          </div>
          <Link href="/settings/sla/create" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
            Create Policy
          </Link>
        </div>

        {/* Global Policy Settings Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-3">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Default Policy Fallback</h3>
                  <p className="text-xs text-slate-500 mt-1">Applied when no other policies match a ticket</p>
                </div>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Edit Default</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">First Response</div>
                <div className="font-mono text-sm font-bold text-slate-700">24 hours</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Resolution Time</div>
                <div className="font-mono text-sm font-bold text-slate-700">5 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Policies List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-700 text-sm">Active Policies ({POLICIES.filter(p => p.status === 'Active').length})</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search policies..." 
                className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {POLICIES.map((policy) => (
              <div key={policy.id} className="group p-5 hover:bg-slate-50 transition-colors flex items-center gap-6">
                {/* Drag Handle (Visual Only) */}
                <div className="flex flex-col gap-1 cursor-grab opacity-0 group-hover:opacity-30 hover:!opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-100 text-[10px] font-bold text-slate-500">
                      {policy.priority}
                    </span>
                    <h4 className="text-base font-semibold text-slate-800">{policy.name}</h4>
                    {policy.status === 'Inactive' && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wide rounded">Inactive</span>
                    )}
                    {policy.olaEnabled && (
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] uppercase font-bold tracking-wide rounded flex items-center gap-1">
                        OLA Active
                      </span>
                    )}
                  </div>
                  
                  {/* Removed conditions tags as requested */}
                </div>

                {/* Targets Preview */}
                <div className="flex items-center gap-8 mr-4">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">First Response</div>
                    <div className="font-mono text-sm font-bold text-slate-700">{policy.targets.firstResponse}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Resolution</div>
                    <div className="font-mono text-sm font-bold text-slate-700">{policy.targets.resolution}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <Link href={`/settings/sla/create?id=${policy.id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{POLICIES.length}</span> of <span className="font-semibold text-slate-700">12</span> policies
            </span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-md opacity-50 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md">1</button>
              <button className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">2</button>
              <button className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

