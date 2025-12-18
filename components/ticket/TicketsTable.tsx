"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, MoreHorizontal, Filter, Search, Download, Plus, Calendar, User, MessageSquare, Globe, Flag, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Ticket {
  id: string;
  name: string;
  agent: string;
  status: 'Created' | 'In Progress' | 'Resolved' | 'Closed' | 'Pending';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  contact: string;
  classification: string;
  channel: 'Whatsapp' | 'Email' | 'Chat' | 'Phone';
  creationDate: string;
  slaStatus: 'Healthy' | 'Warning' | 'Breached';
  dueIn: string;
}

const DEFAULT_TICKETS: Ticket[] = [
  {
    id: '111',
    name: 'Unsubscription Issue',
    agent: 'Altibbi',
    status: 'Created',
    priority: 'High',
    contact: 'Loay Deeb',
    classification: 'Unsubscribe Issues',
    channel: 'Whatsapp',
    creationDate: '06/08/2025 06:23 am',
    slaStatus: 'Healthy',
    dueIn: '2h 45m'
  },
  {
    id: '112',
    name: 'Payment Gateway Error',
    agent: 'Support Team',
    status: 'In Progress',
    priority: 'Urgent',
    contact: 'Sarah Jenkins',
    classification: 'Billing',
    channel: 'Email',
    creationDate: '06/08/2025 08:45 am',
    slaStatus: 'Warning',
    dueIn: '15m'
  },
  {
    id: '113',
    name: 'Account Locked Out',
    agent: 'Security Dept',
    status: 'Pending',
    priority: 'Medium',
    contact: 'Mike Ross',
    classification: 'Access',
    channel: 'Phone',
    creationDate: '06/08/2025 09:12 am',
    slaStatus: 'Breached',
    dueIn: '-1h 20m'
  },
  {
    id: '114',
    name: 'New Feature Request',
    agent: 'Product Team',
    status: 'Created',
    priority: 'Low',
    contact: 'Harvey Specter',
    classification: 'Feedback',
    channel: 'Chat',
    creationDate: '06/08/2025 10:30 am',
    slaStatus: 'Healthy',
    dueIn: '24h'
  },
  {
    id: '115',
    name: 'API Documentation Clarification',
    agent: 'Dev Support',
    status: 'Resolved',
    priority: 'Medium',
    contact: 'Donna Paulsen',
    classification: 'Documentation',
    channel: 'Email',
    creationDate: '06/08/2025 11:15 am',
    slaStatus: 'Healthy',
    dueIn: 'Resolved'
  }
];

const StatusBadge = ({ status }: { status: Ticket['status'] }) => {
  const styles = {
    'Created': 'bg-blue-50 text-blue-600 border-blue-100',
    'In Progress': 'bg-amber-50 text-amber-600 border-amber-100',
    'Resolved': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Closed': 'bg-slate-50 text-slate-600 border-slate-100',
    'Pending': 'bg-purple-50 text-purple-600 border-purple-100'
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", styles[status])}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: Ticket['priority'] }) => {
  const styles = {
    'Low': 'bg-slate-50 text-slate-500 border-slate-100',
    'Medium': 'bg-sky-50 text-sky-600 border-sky-100',
    'High': 'bg-orange-50 text-orange-600 border-orange-100',
    'Urgent': 'bg-rose-50 text-rose-600 border-rose-100'
  };
  
  const colorClass = styles[priority].split(' ')[1];

  return (
    <div className="flex items-center gap-1.5">
      <Flag className={cn("w-3 h-3", colorClass)} />
      <span className={cn("text-sm", colorClass)}>
        {priority}
      </span>
    </div>
  );
};

const SLABadge = ({ status, dueIn }: { status: Ticket['slaStatus'], dueIn: string }) => {
  const styles = {
    'Healthy': 'text-emerald-600 bg-emerald-50 border-emerald-100',
    'Warning': 'text-amber-600 bg-amber-50 border-amber-100 animate-pulse',
    'Breached': 'text-rose-600 bg-rose-50 border-rose-100'
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] font-bold tracking-tight", styles[status])}>
      {status === 'Breached' ? <AlertTriangle size={12} /> : <Clock size={12} />}
      {dueIn}
    </div>
  );
};

const ChannelIcon = ({ channel }: { channel: Ticket['channel'] }) => {
  switch (channel) {
    case 'Whatsapp':
      return <MessageSquare className="w-4 h-4 text-emerald-500" />;
    case 'Email':
      return <Globe className="w-4 h-4 text-blue-500" />;
    case 'Chat':
      return <MessageSquare className="w-4 h-4 text-indigo-500" />;
    case 'Phone':
      return <User className="w-4 h-4 text-slate-500" />;
    default:
      return null;
  }
};

export const TicketsTable = () => {
  const [tickets, setTickets] = useState<Ticket[]>(DEFAULT_TICKETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ticket;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Ticket) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...tickets].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setTickets(sortedData);
  };

  const filteredTickets = tickets.filter(ticket => 
    Object.values(ticket).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full bg-[#f8f9fa] font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Support Tickets</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track your customer support requests</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          </div>
        </div>

        {/* Toolbar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-transparent rounded-lg hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white cursor-pointer">
              <option>All Status</option>
              <option>Created</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th onClick={() => handleSort('name')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Name
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('agent')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Agent
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('status')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Status
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('priority')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Priority
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('slaStatus')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      SLA Status
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('contact')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Contact
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Channel
                  </th>
                  <th onClick={() => handleSort('creationDate')} className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Creation Date
                      <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {filteredTickets.map(ticket => (
                    <motion.tr 
                      key={ticket.id} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95 }} 
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <a href={`/tickets/${ticket.id}`} className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">
                            {ticket.name}
                          </a>
                          <span className="text-xs text-slate-400 mt-0.5">#{ticket.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-[10px] font-bold">
                            {ticket.agent.charAt(0)}
                          </div>
                          <span className="text-sm text-slate-600 font-medium">{ticket.agent}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4">
                        <PriorityBadge priority={ticket.priority} />
                      </td>
                      <td className="px-6 py-4">
                        <SLABadge status={ticket.slaStatus} dueIn={ticket.dueIn} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-700 font-medium">{ticket.contact}</span>
                          <span className="text-xs text-slate-400">{ticket.classification}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ChannelIcon channel={ticket.channel} />
                          <span className="text-xs text-slate-500">{ticket.channel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-xs whitespace-nowrap">{ticket.creationDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredTickets.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">No tickets found</h3>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters to find what you're looking for.</p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Clear search
              </button>
            </div>
          )}

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{filteredTickets.length}</span> of <span className="font-semibold text-slate-700">{tickets.length}</span> tickets
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
};
