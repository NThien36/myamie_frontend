import { Business } from "@/models/business.interface";

export const businessData: Business[] = [
  {
    id: 1,
    avatar: "", // 100x100 lightweight image
    name: "Sunshine Café",
    shortDescription: "A cozy café offering organic coffee and snacks.",
    operatingHours: "7am - 9pm",
    city: "New York",
    cover: "https://picsum.photos/seed/cafe/400/200", // 400x200 lightweight image
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
