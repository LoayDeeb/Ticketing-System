import React from 'react';
import { Home } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

type PageHeaderBreadcrumbProps = {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
};

const DEFAULT_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Tickets', href: '#' },
  { label: 'TicketsHistory', active: true }
];

export const PageHeaderBreadcrumb = ({
  title = 'Ticket Histories',
  breadcrumbs = DEFAULT_BREADCRUMBS
}: PageHeaderBreadcrumbProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 w-full bg-white border-b border-gray-100 mb-6">
      <h4 className="mb-4 sm:mb-0 text-base font-semibold uppercase tracking-tight" style={{ color: '#495057', lineHeight: '1.2' }}>
        {title}
      </h4>

      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center list-none p-0 m-0">
          {breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center text-sm font-normal">
              {index > 0 && (
                <span className="px-2 text-gray-400 select-none">
                  <span className="text-xs opacity-60">/</span>
                </span>
              )}
              
              {item.active ? (
                <span className="cursor-default" style={{ color: '#74788d', fontFamily: 'Poppins, sans-serif' }}>
                  {item.label}
                </span>
              ) : (
                <a 
                  href={item.href || '#'} 
                  className="transition-colors hover:text-blue-600 flex items-center" 
                  style={{ color: '#495057' }}
                  onClick={e => e.preventDefault()}
                >
                  {item.label === 'Home' && <Home size={14} className="mr-1 inline-block" />}
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

