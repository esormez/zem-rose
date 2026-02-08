'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  href?: string;
  isActive?: boolean;
  className?: string;
  isOutlineMode?: boolean;
}

export default function Card({ children, href, isActive = true, className = '', isOutlineMode = false }: CardProps) {
  const cardClasses = `
    relative
    w-[800px] min-w-[800px]
    h-[400px]
    p-12
    transition-all duration-300
    ${isActive ? 'opacity-100' : 'opacity-70'}
    ${className}
  `;

  const cardStyle = {
    backgroundColor: isOutlineMode ? 'transparent' : 'var(--bg-mid)',
    border: isOutlineMode ? '1px solid var(--text-secondary)' : 'none',
  };

  const hoverClasses = href ? 'hover:-translate-y-1 hover:shadow-[0_0_30px_var(--hover-glow)] cursor-pointer' : '';

  const content = (
    <div
      className={`${cardClasses} ${hoverClasses}`}
      style={cardStyle}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
