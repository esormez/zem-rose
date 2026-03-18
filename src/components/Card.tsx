'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  href?: string;
  isActive?: boolean;
  className?: string;
  isOutlineMode?: boolean;
  dark?: boolean;
}

export default function Card({ children, href, isActive = true, className = '', isOutlineMode = false, dark = false }: CardProps) {
  const cardClasses = `
    relative
    w-[875px] min-w-[875px]
    h-[525px]
    transition-[opacity,transform,box-shadow] duration-150
    ${isActive ? 'opacity-100' : 'opacity-70'}
    ${className}
  `;

  const cardStyle = {
    padding: '60px',
    backgroundColor: isOutlineMode ? 'transparent' : dark ? 'var(--dark)' : 'var(--bg-mid)',
    border: isOutlineMode
      ? '1px solid var(--text-secondary)'
      : '1px solid var(--border-subtle)',
    overflow: 'hidden' as const,
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
