'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Restaurant } from '@/types/restaurant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home, MapPin, Link2, ExternalLink, Phone, Navigation } from 'lucide-react';
import RestaurantMap from './restaurant-map';

interface RestaurantContentProps {
  restaurant: Restaurant;
  dict: {
    reviews: string;
    about: string;
    tips: string;
    rating: string;
    hours: string;
    location: string;
    contact: string;
    restaurants: string;
  };
  lang: string;
}

export function RestaurantContent({ restaurant, dict, lang }: RestaurantContentProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const restaurantName = restaurant.restaurant_translations.find(t => t.language === lang)?.name;
  const neighborhood = restaurant.neighborhoods[0]?.neighborhood_translations.find(t => t.language === lang)?.name;
  const categories = restaurant.restaurant_categories.map(rc => 
    rc.category.category_translations.find(t => t.language === lang)?.name
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="container mx-auto p-4 flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href={`/${lang}`} className="hover:text-foreground flex items-center gap-1">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${lang}/restaurants`} className="hover:text-foreground">
          {dict.restaurants}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{restaurantName}</span>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <Image
          src={restaurant.image_url}
          alt={restaurantName || ''}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto space-y-6">
            {/* Title and Badges */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{restaurantName}</h1>
              <div className="flex flex-wrap gap-2">
                {neighborhood && (
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-transparent">
                    {neighborhood}
                  </Badge>
                )}
                {categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-transparent">
                    {category}
                  </Badge>
                ))}
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-transparent">
                  {'$'.repeat(restaurant.price_range)}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-transparent">
                  ★ {restaurant.rating.toFixed(1)} ({restaurant.review_count} {dict.reviews})
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // You might want to add a toast notification here
                }}
              >
                <Link2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              
              {restaurant.website_url && (
                <Button
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  asChild
                >
                  <a href={restaurant.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Website
                  </a>
                </Button>
              )}
              
              {restaurant.phone_number && (
                <Button
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  asChild
                >
                  <a href={`tel:${restaurant.phone_number}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </a>
                </Button>
              )}
              
              {restaurant.place_id && (
                <Button
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  asChild
                >
                  <a 
                    href={`https://www.google.com/maps?q=place_id:${restaurant.place_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto flex gap-4 p-4 overflow-x-auto">
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('about')}>{dict.about}</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('tips')}>{dict.tips}</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('rating')}>{dict.rating}</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('hours')}>{dict.hours}</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('location')}>{dict.location}</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto p-6 space-y-12">
        {/* About Section */}
        <section id="about" className="scroll-mt-16">
          <h2 className="text-2xl font-bold mb-4">{dict.about}</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6 whitespace-pre-wrap">
              {restaurant.restaurant_translations.find(t => t.language === lang)?.description || ''}
            </p>
          </div>

          {/* Local Tips Card */}
          {restaurant.local_tips && (
            <div className="bg-orange-50 rounded-lg p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white text-orange-700">Local Tips</Badge>
              </div>
              <p className="text-orange-800 whitespace-pre-wrap">{restaurant.local_tips}</p>
            </div>
          )}
        </section>

        {/* Rating Section */}
        <section id="rating" className="scroll-mt-16">
          <h2 className="text-2xl font-bold mb-4">{dict.rating}</h2>
          
          {/* Expert Review Card */}
          <div className="bg-[#F4F1FF] rounded-lg p-6 mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-4">
                <div className="text-6xl font-bold text-[#6E56CF]">{restaurant.custom_score.toFixed(1)}</div>
                <div className="text-lg font-medium">Exceptional</div>
              </div>
              <p className="text-gray-600">{restaurant.score_summary}</p>
            </div>
          </div>

          {/* Detailed Ratings Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex items-center justify-between">
              <span>Food</span>
              <span className="text-[#22C55E] font-semibold">{restaurant.food_score.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Service</span>
              <span className="text-[#22C55E] font-semibold">{restaurant.service_score.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Atmosphere</span>
              <span className="text-[#3B82F6] font-semibold">{restaurant.ambience_score.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Value</span>
              <span className="text-[#EAB308] font-semibold">{restaurant.value_score.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Consistency</span>
              <span className="text-[#22C55E] font-semibold">{restaurant.accessibility_score.toFixed(1)}</span>
            </div>
          </div>
        </section>

        {/* Hours Section */}
        <section id="hours" className="scroll-mt-16">
          <h2 className="text-2xl font-bold mb-4">{dict.hours}</h2>
          
          {/* Best Times to Visit */}
          <div className="space-y-3 mb-6">
            {restaurant.smart_visit && (
              <div className="flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-3 rounded-lg">
                <span className="inline-flex items-center gap-1">
                  💡 <span className="font-medium">Smart Visit</span>
                </span>
                <span className="text-blue-800">{restaurant.smart_visit}</span>
              </div>
            )}
            {restaurant.peak_hours && (
              <div className="flex items-center gap-2 bg-pink-50 text-pink-900 px-4 py-3 rounded-lg">
                <span className="inline-flex items-center gap-1">
                  🔥 <span className="font-medium">Buzzing</span>
                </span>
                <span className="text-pink-800">{restaurant.peak_hours}</span>
              </div>
            )}
            {restaurant.quiet_hours && (
              <div className="flex items-center gap-2 bg-green-50 text-green-900 px-4 py-3 rounded-lg">
                <span className="inline-flex items-center gap-1">
                  😌 <span className="font-medium">Relaxed</span>
                </span>
                <span className="text-green-800">{restaurant.quiet_hours}</span>
              </div>
            )}
          </div>

          {/* Opening Hours Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {restaurant.opening_hours.split('\n').filter(Boolean).map((line) => {
                  const [day, hours] = line.split(': ');
                  return (
                    <tr key={day} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {hours}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="scroll-mt-16">
          <h2 className="text-2xl font-bold mb-4">{dict.location}</h2>
          
          {/* Location Header */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Neighborhood</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{restaurant.neighborhoods[0]?.neighborhood_translations.find(t => t.language === lang)?.name}</span>
            </div>
          </div>

          {/* Map */}
          <RestaurantMap
            lat={restaurant.latitude}
            lng={restaurant.longitude}
            name={restaurant.restaurant_translations.find(t => t.language === lang)?.name || ''}
          />
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-16">
          <h2 className="text-2xl font-bold mb-4">{dict.contact}</h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Phone:</span>
              <a href="tel:+34934444444" className="text-blue-600 hover:underline">+34 93 444 44 44</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Website:</span>
              <a href="#" className="text-blue-600 hover:underline">www.website.com</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}