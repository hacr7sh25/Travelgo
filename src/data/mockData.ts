export const MOCK_RESTAURANTS = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Sakura Garden',
    description: 'Authentic Japanese cuisine with fresh sushi and traditional dishes in an elegant setting.',
    cuisine_type: 'Japanese',
    address: '123 Cherry Blossom Lane, Downtown',
    latitude: 40.7589,
    longitude: -73.9851,
    phone: '+1 (555) 123-4567',
    website: 'https://sakuragarden.com',
    price_range: 3,
    average_rating: 4.6,
    total_reviews: 342,
    image_urls: [
      'https://images.pexels.com/photos/16743486/pexels-photo-16743486/free-photo-of-traditional-japanese-restaurant-interior.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    opening_hours: {
      monday: '11:00-22:00',
      tuesday: '11:00-22:00',
      wednesday: '11:00-22:00',
      thursday: '11:00-22:00',
      friday: '11:00-23:00',
      saturday: '11:00-23:00',
      sunday: '12:00-21:00'
    },
    features: ['Reservation Required', 'Takeout Available', 'Outdoor Seating', 'Vegetarian Options'],
    menu: {
      featured: [
        {
          id: 'sak-001',
          name: 'Omakase Tasting Menu',
          description: "Chef's selection of 12 premium sushi pieces with seasonal accompaniments",
          price: 85.00,
          category: 'Signature',
          popular: true,
          image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'sak-002',
          name: 'Dragon Roll',
          description: 'Tempura shrimp, avocado, topped with eel and spicy mayo',
          price: 18.50,
          category: 'Specialty Rolls',
          popular: true
        },
        {
          id: 'sak-003',
          name: 'Chirashi Bowl',
          description: 'Assorted fresh sashimi over seasoned sushi rice',
          price: 28.00,
          category: 'Bowls',
          popular: false
        },
        {
          id: 'sak-004',
          name: 'Miso Glazed Black Cod',
          description: 'Premium black cod marinated in sweet miso glaze',
          price: 32.00,
          category: 'Hot Dishes',
          popular: true
        }
      ],
      full: [
        // Appetizers
        {
          id: 'sak-101',
          name: 'Edamame',
          description: 'Steamed young soybeans with sea salt',
          price: 6.00,
          category: 'Appetizers'
        },
        {
          id: 'sak-102',
          name: 'Gyoza (6 pieces)',
          description: 'Pan-fried pork dumplings with ponzu sauce',
          price: 12.00,
          category: 'Appetizers'
        },
        {
          id: 'sak-103',
          name: 'Agedashi Tofu',
          description: 'Lightly fried tofu in savory dashi broth',
          price: 9.50,
          category: 'Appetizers'
        },
        // Sushi & Sashimi
        {
          id: 'sak-201',
          name: 'Tuna Sashimi (5 pieces)',
          description: 'Fresh bluefin tuna',
          price: 16.00,
          category: 'Sashimi'
        },
        {
          id: 'sak-202',
          name: 'Salmon Sashimi (5 pieces)',
          description: 'Norwegian salmon',
          price: 14.00,
          category: 'Sashimi'
        },
        {
          id: 'sak-203',
          name: 'Yellowtail Sashimi (5 pieces)',
          description: 'Japanese hamachi',
          price: 18.00,
          category: 'Sashimi'
        },
        // Specialty Rolls
        {
          id: 'sak-301',
          name: 'Rainbow Roll',
          description: 'California roll topped with assorted fish',
          price: 16.00,
          category: 'Specialty Rolls'
        },
        {
          id: 'sak-302',
          name: 'Spider Roll',
          description: 'Soft shell crab tempura with cucumber and avocado',
          price: 15.50,
          category: 'Specialty Rolls'
        },
        // Hot Dishes
        {
          id: 'sak-401',
          name: 'Chicken Teriyaki',
          description: 'Grilled chicken with house teriyaki sauce',
          price: 22.00,
          category: 'Hot Dishes'
        },
        {
          id: 'sak-402',
          name: 'Beef Sukiyaki',
          description: 'Thinly sliced beef with vegetables in sweet soy broth',
          price: 28.00,
          category: 'Hot Dishes'
        },
        // Desserts
        {
          id: 'sak-501',
          name: 'Mochi Ice Cream (3 pieces)',
          description: 'Green tea, red bean, and mango flavors',
          price: 8.00,
          category: 'Desserts'
        },
        {
          id: 'sak-502',
          name: 'Dorayaki',
          description: 'Pancake sandwich filled with sweet red bean paste',
          price: 7.00,
          category: 'Desserts'
        }
      ]
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'b1ffdc88-8d1c-5fg9-cc7e-7cc8ce491b22',
    name: "Olivia's Bistro",
    description: 'Mediterranean fusion cuisine featuring fresh ingredients and innovative dishes.',
    cuisine_type: 'Mediterranean',
    address: '456 Olive Street, Arts District',
    latitude: 40.7505,
    longitude: -73.9934,
    phone: '+1 (555) 234-5678',
    website: 'https://oliviasbistro.com',
    price_range: 2,
    average_rating: 4.4,
    total_reviews: 197,
    image_urls: [
      'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    opening_hours: {
      monday: 'Closed',
      tuesday: '17:00-22:00',
      wednesday: '17:00-22:00',
      thursday: '17:00-22:00',
      friday: '17:00-23:00',
      saturday: '11:00-23:00',
      sunday: '11:00-21:00'
    },
    features: ['Wine Bar', 'Happy Hour', 'Date Night', 'Group Dining'],
    menu: {
      featured: [
        {
          id: 'oli-001',
          name: 'Mediterranean Mezze Platter',
          description: 'Hummus, baba ganoush, olives, feta, and warm pita bread',
          price: 24.00,
          category: 'Signature',
          popular: true,
          image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'oli-002',
          name: 'Grilled Branzino',
          description: 'Whole Mediterranean sea bass with lemon herb oil',
          price: 32.00,
          category: 'Seafood',
          popular: true
        },
        {
          id: 'oli-003',
          name: 'Lamb Souvlaki',
          description: 'Marinated lamb skewers with tzatziki and Greek salad',
          price: 28.00,
          category: 'Grilled',
          popular: false
        },
        {
          id: 'oli-004',
          name: 'Seafood Paella',
          description: 'Traditional Spanish rice with mussels, shrimp, and saffron',
          price: 34.00,
          category: 'Signature',
          popular: true
        }
      ],
      full: [
        // Appetizers
        {
          id: 'oli-101',
          name: 'Spanakopita',
          description: 'Spinach and feta wrapped in phyllo pastry',
          price: 12.00,
          category: 'Appetizers'
        },
        {
          id: 'oli-102',
          name: 'Calamari Fritti',
          description: 'Crispy squid rings with marinara sauce',
          price: 14.00,
          category: 'Appetizers'
        },
        {
          id: 'oli-103',
          name: 'Burrata Caprese',
          description: 'Fresh burrata with heirloom tomatoes and basil',
          price: 16.00,
          category: 'Appetizers'
        },
        // Salads
        {
          id: 'oli-201',
          name: 'Greek Village Salad',
          description: 'Tomatoes, cucumbers, olives, feta, red onion',
          price: 15.00,
          category: 'Salads'
        },
        {
          id: 'oli-202',
          name: 'Arugula & Pear Salad',
          description: 'Baby arugula, poached pears, goat cheese, walnuts',
          price: 14.00,
          category: 'Salads'
        },
        // Main Courses
        {
          id: 'oli-301',
          name: 'Moussaka',
          description: 'Layered eggplant, meat sauce, and béchamel',
          price: 26.00,
          category: 'Traditional'
        },
        {
          id: 'oli-302',
          name: 'Osso Buco',
          description: 'Braised veal shanks with risotto milanese',
          price: 38.00,
          category: 'Meat'
        },
        // Pasta
        {
          id: 'oli-401',
          name: 'Linguine alle Vongole',
          description: 'Fresh clams in white wine garlic sauce',
          price: 24.00,
          category: 'Pasta'
        },
        {
          id: 'oli-402',
          name: 'Pappardelle Bolognese',
          description: 'Wide ribbon pasta with slow-cooked meat sauce',
          price: 22.00,
          category: 'Pasta'
        },
        // Desserts
        {
          id: 'oli-501',
          name: 'Baklava',
          description: 'Honey-sweetened phyllo with pistachios',
          price: 9.00,
          category: 'Desserts'
        },
        {
          id: 'oli-502',
          name: 'Tiramisu',
          description: 'Classic Italian coffee-flavored dessert',
          price: 10.00,
          category: 'Desserts'
        }
      ]
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'c2ggef77-7e2d-6hh0-dd8f-8dd9df502c33',
    name: 'Urban Plate',
    description: 'Modern American cuisine with a focus on locally sourced ingredients and creative presentations.',
    cuisine_type: 'American',
    address: '789 Modern Ave, Financial District',
    latitude: 40.7614,
    longitude: -73.9776,
    phone: '+1 (555) 345-6789',
    website: 'https://urbanplate.com',
    price_range: 3,
    average_rating: 4.8,
    total_reviews: 423,
    image_urls: [
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    opening_hours: {
      monday: '11:30-21:30',
      tuesday: '11:30-21:30',
      wednesday: '11:30-21:30',
      thursday: '11:30-22:00',
      friday: '11:30-22:30',
      saturday: '10:00-22:30',
      sunday: '10:00-21:00'
    },
    features: ['Brunch', 'Craft Cocktails', 'Live Music', 'Private Events'],
    menu: {
      featured: [
        {
          id: 'urb-001',
          name: 'Wagyu Beef Burger',
          description: 'Premium wagyu patty with truffle aioli and aged cheddar',
          price: 28.00,
          category: 'Signature',
          popular: true,
          image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'urb-002',
          name: 'Pan-Seared Duck Breast',
          description: 'Five-spice duck with cherry gastrique and wild rice',
          price: 36.00,
          category: 'Entrees',
          popular: true
        },
        {
          id: 'urb-003',
          name: 'Lobster Mac & Cheese',
          description: 'Maine lobster with three-cheese blend and herb crust',
          price: 32.00,
          category: 'Comfort',
          popular: false
        },
        {
          id: 'urb-004',
          name: 'Craft Cocktail Flight',
          description: 'Three seasonal cocktails featuring local spirits',
          price: 22.00,
          category: 'Beverages',
          popular: true
        }
      ],
      full: [
        // Brunch (Weekend Only)
        {
          id: 'urb-101',
          name: 'Avocado Toast Deluxe',
          description: 'Smashed avocado, poached egg, everything bagel seasoning',
          price: 16.00,
          category: 'Brunch'
        },
        {
          id: 'urb-102',
          name: 'Brioche French Toast',
          description: 'Thick-cut brioche with maple bourbon syrup',
          price: 18.00,
          category: 'Brunch'
        },
        {
          id: 'urb-103',
          name: 'Short Rib Benedict',
          description: 'Braised short rib, poached eggs, hollandaise',
          price: 24.00,
          category: 'Brunch'
        },
        // Appetizers
        {
          id: 'urb-201',
          name: 'Oysters on Half Shell',
          description: 'Daily selection with mignonette (per piece)',
          price: 3.50,
          category: 'Raw Bar'
        },
        {
          id: 'urb-202',
          name: 'Charcuterie Board',
          description: 'Artisanal meats, cheeses, and accompaniments',
          price: 26.00,
          category: 'Appetizers'
        },
        {
          id: 'urb-203',
          name: 'Tuna Tartare',
          description: 'Yellowfin tuna with avocado and sesame',
          price: 19.00,
          category: 'Appetizers'
        },
        // Entrees
        {
          id: 'urb-301',
          name: 'Dry-Aged Ribeye',
          description: '16oz ribeye with roasted bone marrow butter',
          price: 58.00,
          category: 'Steaks'
        },
        {
          id: 'urb-302',
          name: 'Chilean Sea Bass',
          description: 'Miso-glazed with forbidden rice and bok choy',
          price: 42.00,
          category: 'Seafood'
        },
        {
          id: 'urb-303',
          name: 'Heritage Pork Chop',
          description: 'Double-cut chop with apple mostarda',
          price: 34.00,
          category: 'Meat'
        },
        // Sides
        {
          id: 'urb-401',
          name: 'Truffle Mac & Cheese',
          description: 'Three-cheese blend with black truffle',
          price: 14.00,
          category: 'Sides'
        },
        {
          id: 'urb-402',
          name: 'Roasted Brussels Sprouts',
          description: 'With bacon and balsamic glaze',
          price: 12.00,
          category: 'Sides'
        },
        // Desserts
        {
          id: 'urb-501',
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with vanilla ice cream',
          price: 12.00,
          category: 'Desserts'
        },
        {
          id: 'urb-502',
          name: 'Seasonal Fruit Tart',
          description: 'Pastry cream tart with fresh seasonal fruits',
          price: 11.00,
          category: 'Desserts'
        }
      ]
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const MOCK_PETROL_STATIONS = [
  {
    id: 'd3hhfg66-6f3e-7ii1-ee9g-9ee0eg613d44',
    name: 'Metro Fuels',
    address: '321 Highway Avenue, Downtown',
    latitude: 40.7580,
    longitude: -73.9855,
    brand: 'Shell',
    fuel_types: ['Regular', 'Premium', 'Diesel'],
    amenities: ['Convenience Store', 'Car Wash', 'ATM', 'Coffee'],
    pricing: {
      regular: 3.49,
      premium: 3.99,
      diesel: 3.65
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'e4iigh55-5g4f-8jj2-ff0h-0ff1fh724e55',
    name: 'Express Fuel',
    address: '654 Interstate Road, Eastside',
    latitude: 40.7505,
    longitude: -73.9850,
    brand: 'Exxon',
    fuel_types: ['Regular', 'Premium'],
    amenities: ['Quick Mart', 'Air Pump', 'Restrooms'],
    pricing: {
      regular: 3.45,
      premium: 3.95
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'f5jjhi44-4h5g-9kk3-gg1i-1gg2gi835f66',
    name: 'City Gas & Go',
    address: '987 Urban Drive, Westside',
    latitude: 40.7620,
    longitude: -73.9790,
    brand: 'BP',
    fuel_types: ['Regular', 'Premium', 'Diesel', 'E85'],
    amenities: ['24/7 Store', 'Electric Charging', 'Food Court', 'WiFi'],
    pricing: {
      regular: 3.53,
      premium: 4.05,
      diesel: 3.69,
      e85: 2.99
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'g6kkij33-3i6h-0ll4-hh2j-2hh3hj946g77',
    user_id: 'user1',
    restaurant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    rating: 5,
    title: 'Outstanding Japanese Experience',
    content: 'The sushi was incredibly fresh and the service was impeccable. The atmosphere perfectly captures traditional Japanese dining.',
    images: [],
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'h7lljk22-2j7i-1mm5-ii3k-3ii4ik057h88',
    user_id: 'user2',
    restaurant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    rating: 4,
    title: 'Great Food, Busy Place',
    content: 'Excellent quality food but can get quite crowded during peak hours. Reservation definitely recommended.',
    images: [],
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'i8mmkl11-1k8j-2nn6-jj4l-4jj5jl168i99',
    user_id: 'user3',
    restaurant_id: 'b1ffdc88-8d1c-5fg9-cc7e-7cc8ce491b22',
    rating: 5,
    title: 'Perfect Date Night Spot',
    content: 'Intimate setting with amazing Mediterranean flavors. The wine selection is exceptional.',
    images: [],
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'j9nnlm00-0l9k-3oo7-kk5m-5kk6km279j00',
    user_id: 'user4',
    restaurant_id: 'c2ggef77-7e2d-6hh0-dd8f-8dd9df502c33',
    rating: 5,
    title: 'Exceptional Modern American',
    content: 'Urban Plate delivers on every front - creative dishes, excellent service, and a vibrant atmosphere. The locally sourced ingredients really make a difference.',
    images: [],
    created_at: new Date(Date.now() - 345600000).toISOString(),
    updated_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 'k0oomn99-9m0l-4pp8-ll6n-6ll7ln380k11',
    user_id: 'user5',
    restaurant_id: 'c2ggef77-7e2d-6hh0-dd8f-8dd9df502c33',
    rating: 4,
    title: 'Great Brunch Spot',
    content: 'Had an amazing brunch here. The craft cocktails are top-notch and the live music creates a perfect ambiance.',
    images: [],
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date(Date.now() - 432000000).toISOString(),
  }
];

export const CUISINE_TYPES = [
  'Italian',
  'Japanese',
  'Mexican',
  'Chinese',
  'American',
  'Mediterranean',
  'French',
  'Thai',
  'Indian',
  'Korean',
  'Vietnamese',
  'Greek',
  'Spanish',
  'Turkish',
  'Lebanese'
];

export const PRICE_RANGES = [
  { value: 1, label: '$', description: 'Budget-friendly' },
  { value: 2, label: '$$', description: 'Moderate' },
  { value: 3, label: '$$$', description: 'Upscale' },
  { value: 4, label: '$$$$', description: 'Fine dining' }
];