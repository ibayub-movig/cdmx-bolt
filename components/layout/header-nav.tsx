'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderNavProps {
  navigation: Array<{
    name: string;
    href: string;
  }>;
}

export function HeaderNav({ navigation }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}