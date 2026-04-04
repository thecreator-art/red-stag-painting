'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StickyHeader from '@/components/layout/StickyHeader';

export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <>
        <Navbar />
        <StickyHeader />
      </>
    );
  }

  return <Navbar sticky />;
}
