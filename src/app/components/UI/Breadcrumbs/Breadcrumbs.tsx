'use client'

import { FC, useEffect, useState } from 'react';

import './Breadcrumbs.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ILink {
  label: string;
  href?: string;
  active?: boolean;
}

interface ILinks {
  links: ILink[];
}
const Breadcrumbs:FC<ILinks> = ({ links }) => {
  return (
    <div>
      {links.map((link : any, index:number) => (
        <span key={index}>
          {index > 0 && ' | '}
          {link.active ? (
            <span>{link.label}</span>
          ) : (
            <Link href={link.href}>
              {link.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
