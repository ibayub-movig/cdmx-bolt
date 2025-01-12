export interface Dictionary {
  default: {
    metadata: {
      title: string;
      description: string;
    };
    navigation: {
      home: string;
      restaurants: string;
      guides: string;
      about: string;
      search: string;
      language: string;
    };
    home: {
      hero: {
        title: string;
        subtitle: string;
        cta: string;
      };
      featured: {
        title: string;
        subtitle: string;
      };
      newsletter: {
        title: string;
        subtitle: string;
        cta: string;
      };
    };
    restaurant: {
      reviews: string;
      count: string;
      information: string;
      reservation: string;
      bookTable: string;
      neighborhood: string;
      cuisine: string;
      address: string;
      phone: string;
      website: string;
      hours: string;
      priceRange: string;
      viewDetails: string;
    };
    lists: {
      title: string;
      description: string;
      viewAll: string;
      readMore: string;
    };
    cuisine: {
      title: string;
      description: string;
      viewAll: string;
      restaurants: string;
    };
    footer: {
      rights: string;
      contact: string;
    };
  }
} 