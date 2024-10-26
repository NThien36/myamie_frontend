import { User } from "@/models/user.interface";

export const userData: User[] = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/50", // Low-quality avatar image
    name: "John Doe",
    shortDescription:
      "Avid traveler and food enthusiast.Avid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiast",
    distance: 5.2, // in kilometers
    city: "New York",
    characteristics: ["Friendly", "Adventurous", "Outgoing"],
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/50",
    name: "Jane Smith",
    shortDescription: "Tech geek and coffee lover.",
    distance: 10.1,
    city: "Los Angeles",
    characteristics: ["Creative", "Tech-savvy", "Ambitious"],
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/50",
    name: "Emily Clark",
    shortDescription: "Nature lover and mountain hiker.",
    distance: 8.3,
    city: "Denver",
    characteristics: ["Outdoor enthusiast", "Calm", "Inquisitive"],
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/50",
    name: "Michael Brown",
    shortDescription: "Historian and amateur photographer.",
    distance: 12.7,
    city: "Boston",
    characteristics: ["Curious", "Analytical", "Creative"],
  },
  {
    id: 5,
    avatar: "https://via.placeholder.com/50",
    name: "Sarah Green",
    shortDescription: "Entrepreneur and fitness coach.",
    distance: 4.9,
    city: "Orlando",
    characteristics: ["Driven", "Energetic", "Inspirational"],
  },
];
