import { Lang } from '@/lib/utils';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedRestaurants } from '@/components/sections/featured-restaurants';
import { Newsletter } from '@/components/sections/newsletter';
import { getDictionary } from '@/lib/dictionary';
import { notFound } from 'next/navigation';
import { i18n } from '@/config/i18n.config';

interface HomePageProps {
  params: { lang: Lang };
}

export default async function Home({
  params: { lang },
}: HomePageProps) {
  // Validate language parameter
  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <>
      <HeroSection dict={dict.home.hero} />
      <FeaturedRestaurants dict={dict.home.featured} />
      <Newsletter dict={dict.home.newsletter} />
    </>
  );
}