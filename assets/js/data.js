// ============================================================
//  B S PROPERTY — Sample Property Data
//  Curated, high-quality images for each property and location
//  Each property uses a DISTINCT photograph
// ============================================================

const PROPERTIES = [
  {
    id: "bandra-sea-view-3bhk",
    name: "The Meridian Residences",
    location: "Bandra West, Mumbai",
    area: "Bandra",
    type: "Apartment",
    rent: 145000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1850,
    furnishing: "Fully Furnished",
    floor: "14th Floor",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ],
    tags: ["Sea View", "Premium", "Pet Friendly"],
    amenities: ["Swimming Pool","Gym","24/7 Security","Concierge","Power Backup","Parking ×2","Club House","CCTV"],
    description: "An exquisite 3BHK in the heart of Bandra West offering panoramic Arabian Sea views. Italian marble floors, modular kitchen, and designer fixtures throughout. Walking distance to Bandstand Promenade and the finest restaurants on Carter Road.",
    available: "Immediately"
  },
  {
    id: "juhu-beachside-penthouse",
    name: "Juhu Shore Penthouse",
    location: "Juhu, Mumbai",
    area: "Juhu",
    type: "Penthouse",
    rent: 320000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3200,
    furnishing: "Fully Furnished",
    floor: "22nd Floor",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80"
    ],
    tags: ["Beach View","Penthouse","Luxury"],
    amenities: ["Private Terrace","Swimming Pool","Home Theatre","Jacuzzi","Gym","Valet Parking","Modular Kitchen","Smart Home"],
    description: "An ultra-premium penthouse steps from Juhu Beach. This sprawling 4BHK features a private rooftop terrace, smart home automation, and breathtaking sunset vistas over the Arabian Sea. One of Mumbai's finest addresses — reserved for the discerning few.",
    available: "15 Nov 2026"
  },
  {
    id: "andheri-modern-2bhk",
    name: "Skyline Nest — Andheri",
    location: "Andheri West, Mumbai",
    area: "Andheri",
    type: "Apartment",
    rent: 65000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    furnishing: "Semi Furnished",
    floor: "7th Floor",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
    ],
    tags: ["Metro Nearby","Corporate","Modern"],
    amenities: ["Gym","Security","Parking","Power Backup","Lift","Fire Safety","Visitor Parking"],
    description: "A contemporary 2BHK in Andheri West, designed for the working professional. Minutes from the metro and premium business hubs, with an open balcony, engineered wood flooring, and a well-appointed modular kitchen.",
    available: "Immediately"
  },
  {
    id: "powai-lakeside-3bhk",
    name: "Hiranandani Lake View",
    location: "Powai, Mumbai",
    area: "Powai",
    type: "Apartment",
    rent: 110000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    furnishing: "Fully Furnished",
    floor: "9th Floor",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],
    tags: ["Lake View","Gated Society","Family"],
    amenities: ["Lake View","Swimming Pool","Gym","Children Play Area","Jogging Track","Parking","Club House","24/7 Security"],
    description: "Nestled in the prestigious Hiranandani township, this elegant 3BHK frames Powai Lake from every principal room. Premium gated community with world-class amenities. An ideal residence for families seeking peaceful, cosmopolitan living.",
    available: "1 Nov 2026"
  },
  {
    id: "thane-spacious-3bhk",
    name: "Lodha Palazzo — Thane",
    location: "Thane West, MMR",
    area: "Thane",
    type: "Apartment",
    rent: 55000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    furnishing: "Semi Furnished",
    floor: "11th Floor",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80"
    ],
    tags: ["Value Pick","Spacious","New Build"],
    amenities: ["Swimming Pool","Gym","Yoga Deck","Kids Zone","Amphitheatre","Parking","Supermarket","Metro Access"],
    description: "A premium 3BHK in Lodha's iconic Palazzo project in Thane West. Generous layouts, wide balconies with forest-facing views, and an exceptional suite of builder amenities — outstanding value in the extended Mumbai market.",
    available: "Immediately"
  },
  {
    id: "bandra-cozy-studio",
    name: "The Enclave Studio",
    location: "Bandra East, Mumbai",
    area: "Bandra",
    type: "Studio",
    rent: 42000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 580,
    furnishing: "Fully Furnished",
    floor: "3rd Floor",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&q=80"
    ],
    tags: ["Studio","Ready to Move","Central Location"],
    amenities: ["Gym","Security","Parking","High-Speed Wi-Fi","Power Backup","Housekeeping"],
    description: "A chic, fully-furnished studio in Bandra East — conceived for young professionals and single occupants. Compact yet meticulously designed: premium appliances, smart storage, and effortless access to BKC and the western suburbs.",
    available: "Immediately"
  }
];

const LOCATIONS = [
  {
    name: "Bandra",
    tagline: "Mumbai's Crown Jewel",
    img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80",
    count: 2
  },
  {
    name: "Andheri",
    tagline: "The Commercial Hub",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    count: 1
  },
  {
    name: "Powai",
    tagline: "Lakeside Serenity",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    count: 1
  },
  {
    name: "Juhu",
    tagline: "Where Sea Meets City",
    img: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    count: 1
  },
  {
    name: "Thane",
    tagline: "Modern Living, Greener Life",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    count: 1
  }
];
