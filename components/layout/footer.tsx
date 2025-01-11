'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';

interface FooterProps {
  dict: {
    about: {
      title: string;
      description: string;
    };
    links: {
      title: string;
      restaurants: string;
      guides: string;
      about: string;
      contact: string;
    };
    legal: {
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6" />
              <span className="font-bold">BestCDMX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {dict.about.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{dict.links.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/restaurants" className="hover:text-foreground">
                  {dict.links.restaurants}
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-foreground">
                  {dict.links.guides}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  {dict.links.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  {dict.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">{dict.about.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  {dict.legal.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  {dict.legal.terms}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-end">
            <p className="text-sm text-muted-foreground">{dict.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}