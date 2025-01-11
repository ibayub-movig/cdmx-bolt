import { MobileNav } from './mobile-nav';  // Make sure this import exists

import * as React from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { HeaderNav } from './header-nav';

interface HeaderProps {
  dict: {
    home: string;
    restaurants: string;
    guides: string;
    about: string;
    search: string;
    language: string;
  };
  lang: string;
}

export function Header({ dict, lang }: HeaderProps) {

  const navigation = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.restaurants, href: `/${lang}/restaurants` },
    { name: dict.guides, href: `/${lang}/guides` },
    { name: dict.about, href: `/${lang}/about` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={`/${lang}`} className="flex items-center space-x-2">
          <Compass className="h-6 w-6" />
          <span className="font-bold">BestCDMX</span>
        </Link>
        
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu>
            <HeaderNav navigation={navigation} />
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher lang={lang} label={dict.language} />
          <MobileNav navigation={navigation} />
        </div>
      </div>
    </header>
  );
}