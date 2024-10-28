import { Business, BusinessDetail } from "@/models/business.interface";

export const businessData: Business[] = [
  {
    id: 1,
    avatar: "", // 100x100 lightweight image
    name: "Sunshine Café",
    shortDescription: "A cozy café offering organic coffee and snacks.",
    operatingHours: "7am - 9pm",
    city: "New York",
    cover: "", // 400x200 lightweight image
    rate: 4,
    totalFeedback: 120,
  },
  {
    id: 2,
    avatar: "https://picsum.photos/seed/business2/100",
    name: "Techie Workspace",
    shortDescription: "A modern coworking space with high-speed internet.",
    operatingHours: "8am - 10pm",
    city: "San Francisco",
    cover: "https://picsum.photos/seed/workspace/400/200",
    rate: 5,
    totalFeedback: 80,
  },
  {
    id: 3,
    avatar: "https://picsum.photos/seed/business3/100",
    name: "Green Grocer",
    shortDescription: "A marketplace for organic fruits and vegetables.",
    operatingHours: "6am - 8pm",
    city: "Austin",
    cover: "https://picsum.photos/seed/grocer/400/200",
    rate: 3,
    totalFeedback: 60,
  },
  {
    id: 4,
    avatar: "https://picsum.photos/seed/business4/100",
    name: "Fitness Plus",
    shortDescription: "A state-of-the-art gym with personal trainers.",
    operatingHours: "5am - 11pm",
    city: "Chicago",
    cover: "https://picsum.photos/seed/fitness/400/200",
    rate: 4,
    totalFeedback: 150,
  },
  {
    id: 5,
    avatar: "https://picsum.photos/seed/business5/100",
    name: "Nature’s Bounty",
    shortDescription: "Fresh farm-to-table meals served all day.",
    operatingHours: "7am - 10pm",
    city: "Seattle",
    cover: "https://picsum.photos/seed/restaurant/400/200",
    rate: 5,
    totalFeedback: 90,
  },
];

export const businessDetailData: BusinessDetail = {
  id: 1,
  cover: "https://picsum.photos/800/300?random=1", // Random cover image
  avatar: "https://i.pravatar.cc/150?img=5", // Random avatar image
  name: "Brewed Awakenings Coffee Shop Awakenings Coffee ShopAwakenings Coffee Shop",
  shortDescription: "Your cozy corner for the best coffee in town.",
  categories: [
    {
      id: 1,
      name: "Coffee Shop",
      icon: "fa-star", // Coffee icon
    },
    {
      id: 2,
      name: "Bakery",
      icon: "fa-music", // Bakery icon
    },
  ],
  city: "San Francisco",
  phone: "(415) 555-0199",
  address: "123 Coffee Lane, San Francisco, CA 94107",
  operatingHours: "Mon-Fri: 7 AM - 7 PM, Sat-Sun: 8 AM - 5 PM",
  description:
    "At Brewed Awakenings, we pride ourselves on serving we pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on servwe pride ourselves on serv the finest coffee, handcrafted pastries, and a welcoming atmosphere. Join us for a cup or take some home!",
  images: [
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
  ],
};
