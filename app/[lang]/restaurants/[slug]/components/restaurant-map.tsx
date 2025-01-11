import React from 'react';
import { Card } from '@/components/ui/card';

interface RestaurantMapProps {
  lat: number;
  lng: number;
  name: string;
  zoom?: number;
}

const RestaurantMap = ({ 
  lat, 
  lng, 
  name, 
  zoom = 15 
}: RestaurantMapProps) => {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <Card className="w-full overflow-hidden rounded-lg">
      <div className="relative w-full h-96">
        <iframe
          title={`Map location of ${name}`}
          src={mapSrc}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </Card>
  );
};

export default RestaurantMap; 