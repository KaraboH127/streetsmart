// Mock data for NeighbourHub
export type Listing = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  distance: string;
  seller: string;
  sellerAvatar: string;
  location: string;
  description: string;
};

export type Service = {
  id: string;
  name: string;
  service: string;
  avatar: string;
  rating: number;
  reviews: number;
  distance: string;
  description: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  description: string;
};

export type Post = {
  id: string;
  type: "announcement" | "request" | "recommendation" | "alert";
  title: string;
  body: string;
  author: string;
  authorAvatar: string;
  time: string;
  comments: number;
  likes: number;
};

const img = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
const avatar = (seed: string) =>
  `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;

const categories = ["Electronics", "Furniture", "Clothing", "Vehicles", "Home", "Sports", "Other"];
const itemNames: Record<string, string[]> = {
  Electronics: ["iPhone 13", "Sony Headphones", "Gaming Monitor", "Nintendo Switch", "MacBook Air", "Bluetooth Speaker", "Kindle Paperwhite"],
  Furniture: ["Oak Dining Table", "Vintage Armchair", "Bookshelf", "Mid-century Sofa", "Office Desk", "Bedside Table"],
  Clothing: ["Leather Jacket", "Vintage Denim", "Wool Coat", "Designer Sneakers", "Silk Scarf"],
  Vehicles: ["Mountain Bike", "Honda Civic 2018", "Vespa Scooter", "Kids Bicycle", "Electric Skateboard"],
  Home: ["Kitchen Mixer", "Indoor Plants", "Wall Art Set", "Ceramic Vase", "Coffee Machine"],
  Sports: ["Tennis Racket", "Yoga Mat", "Surfboard", "Climbing Shoes", "Golf Clubs"],
  Other: ["Board Games", "Vinyl Records", "Camera Lens", "Acoustic Guitar"],
};
const sellers = ["Amara K.", "Liam O.", "Priya S.", "Noah B.", "Sofia M.", "Ethan W.", "Zara N.", "Lucas D.", "Mia R.", "Kai T."];
const areas = ["Greenpoint", "Maple Heights", "Riverside", "Oak Park", "Sunset Hills", "Bayview"];

function rand<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

export const listings: Listing[] = Array.from({ length: 50 }, (_, i) => {
  const cat = categories[i % categories.length];
  const names = itemNames[cat];
  const title = `${names[i % names.length]}${i > names.length ? ` #${Math.floor(i / names.length) + 1}` : ""}`;
  const seller = rand(sellers, i);
  return {
    id: `l${i + 1}`,
    title,
    price: [25, 50, 80, 120, 250, 400, 650, 900, 1500][i % 9],
    category: cat,
    image: img(`listing-${i}`, 600, 600),
    distance: `${(0.3 + (i % 30) * 0.15).toFixed(1)} km`,
    seller,
    sellerAvatar: avatar(seller + i),
    location: rand(areas, i),
    description:
      "Lovingly used and in great condition. Pickup from my place or I can deliver locally for a small fee. Message me with any questions — happy to share more photos.",
  };
});

const serviceTypes = [
  { service: "Plumber", desc: "Licensed plumber, same-day callouts." },
  { service: "Electrician", desc: "Certified, residential & commercial work." },
  { service: "Maths Tutor", desc: "High school & first-year university." },
  { service: "Web Developer", desc: "Small business websites & shops." },
  { service: "Cleaner", desc: "Weekly home cleaning, eco-friendly products." },
  { service: "Gardener", desc: "Lawn care, hedge trimming, garden design." },
  { service: "Dog Walker", desc: "Daily walks & weekend pet sitting." },
  { service: "Handyman", desc: "Furniture assembly, repairs, mounting." },
  { service: "Photographer", desc: "Events, portraits, real estate." },
  { service: "Yoga Instructor", desc: "Private & small group classes." },
];

export const services: Service[] = Array.from({ length: 30 }, (_, i) => {
  const t = serviceTypes[i % serviceTypes.length];
  const name = rand(sellers, i + 3);
  return {
    id: `s${i + 1}`,
    name,
    service: t.service,
    avatar: avatar(name + "svc" + i),
    rating: Number((4 + (i % 10) * 0.1).toFixed(1)),
    reviews: 8 + (i * 7) % 120,
    distance: `${(0.4 + (i % 20) * 0.2).toFixed(1)} km`,
    description: t.desc,
  };
});

const eventTypes = ["Market", "Workshop", "Sports", "Community", "Music", "Kids"];
const eventTitles = [
  "Saturday Farmers Market", "Beginner Pottery Workshop", "5-a-side Soccer Tournament",
  "Neighbourhood BBQ", "Live Jazz in the Park", "Kids Art Day", "Yoga in the Park",
  "Book Swap Sunday", "Community Litter Pick", "Outdoor Movie Night", "Coding for Kids",
  "Bake Sale Fundraiser", "Sunset Run Club", "Church Fete", "School Concert",
  "Garage Sale Day", "Wine Tasting Evening", "Sourdough Workshop", "Tennis Open Day",
  "Hiking Meetup",
];

export const events: Event[] = Array.from({ length: 20 }, (_, i) => ({
  id: `e${i + 1}`,
  title: eventTitles[i],
  date: ["Sat 14 Jun", "Sun 15 Jun", "Wed 18 Jun", "Fri 20 Jun", "Sat 21 Jun"][i % 5],
  time: ["9:00 AM", "10:30 AM", "1:00 PM", "4:00 PM", "6:30 PM"][i % 5],
  location: rand(areas, i) + " Park",
  category: rand(eventTypes, i),
  image: img(`event-${i}`, 800, 500),
  attendees: 12 + (i * 9) % 180,
  description: "Open to everyone in the neighbourhood — bring friends, family, and a smile. Free to attend.",
}));

const postSeeds: { type: Post["type"]; title: string; body: string }[] = [
  { type: "alert", title: "Lost cat on Maple Avenue", body: "Grey tabby named Pixel, very friendly. Last seen near the playground. Please DM if spotted." },
  { type: "announcement", title: "Street tree planting Saturday", body: "Join us at 9am — coffee & pastries provided. Bring gloves if you have them." },
  { type: "recommendation", title: "Best coffee on the block?", body: "Just moved in — where do locals get their morning flat white?" },
  { type: "request", title: "Need a ladder for an hour", body: "Borrowing, not buying — happy to swap a six-pack for the favour." },
  { type: "alert", title: "Suspicious car on Oak Street", body: "White sedan circling slowly around 11pm last night. Just a heads up." },
  { type: "announcement", title: "Library extending Sunday hours", body: "From next month the local library opens 10–4 on Sundays." },
  { type: "recommendation", title: "Great plumber — quick and fair", body: "Used Liam from the services board, fixed our leak in 30 mins." },
  { type: "request", title: "Looking for a babysitter Friday", body: "Two kids, 6 & 8. 7–10pm. References appreciated." },
  { type: "announcement", title: "New bakery opening on 5th", body: "Soft launch this weekend — first 50 customers get free croissants." },
  { type: "alert", title: "Power outage scheduled Tuesday", body: "9am–1pm on the north side, planned maintenance." },
  { type: "recommendation", title: "Loving the new pizza place", body: "The wood-fired one near the school — truly excellent." },
  { type: "request", title: "Free moving boxes?", body: "Moving across town next weekend, would gratefully take any spares." },
  { type: "announcement", title: "Community garden plots open", body: "Two plots free at the allotment — first come first served." },
  { type: "alert", title: "Footpath closed near bridge", body: "Construction until end of month, use the upper path." },
  { type: "recommendation", title: "Amazing local tutor", body: "Priya helped my son go from C to A in maths. Cannot recommend enough." },
  { type: "request", title: "Need help moving a couch", body: "Saturday morning, 15 mins of muscle needed. Pizza on me." },
  { type: "announcement", title: "Block party — save the date", body: "July 6th, 2pm onwards. Sign-up sheet at the corner shop." },
  { type: "alert", title: "Found set of keys on bench", body: "Outside the bakery on 3rd. Brought them to the bakery counter." },
  { type: "recommendation", title: "Best park for toddlers?", body: "Looking for a fenced-in playground, ideally with shade." },
  { type: "request", title: "Volunteer drivers needed", body: "For the food bank, weekend mornings. Even one trip helps." },
];

export const posts: Post[] = postSeeds.map((p, i) => {
  const author = rand(sellers, i + 5);
  return {
    id: `p${i + 1}`,
    type: p.type,
    title: p.title,
    body: p.body,
    author,
    authorAvatar: avatar(author + "post" + i),
    time: ["2h", "5h", "Yesterday", "2d ago", "3d ago"][i % 5],
    comments: (i * 3) % 24,
    likes: 4 + (i * 5) % 40,
  };
});

export function getListing(id: string) {
  return listings.find((l) => l.id === id);
}
export function getSimilar(id: string) {
  const l = getListing(id);
  if (!l) return [];
  return listings.filter((x) => x.category === l.category && x.id !== id).slice(0, 4);
}
