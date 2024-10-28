import { Place, PlaceDetail } from "@/models/place.interface";

export const placeData: Place[] = [
  {
    id: 1,
    name: "Green Valley Park Green Valley ParGreen Valley ParGreen Valley Par",
    shortDescription:
      "A peaceful park with beautiful landscapes anpea landscapes anpeaceful park with beautiful landscapes anpeaceful park with beautiful landscapes and walking trails.",
    cover: "", // Placeholder image (300x200 pixels)
    city: "New York",
    dateCreated: "2023-05-15",
    ownerAvatar: "https://picsum.photos/seed/business2/100", // Placeholder avatar (50x50 pixels)
    ownerName: "John Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe",
  },
  {
    id: 2,
    name: "Sunset Beach",
    shortDescription:
      "A scenic beach known for its stunning sunsets and white sands.",
    cover: "https://via.placeholder.com/300x200",
    city: "Los Angeles",
    dateCreated: "2023-06-10",
    ownerAvatar: "https://picsum.photos/seed/business2/100",
    ownerName: "Jane Smith",
  },
  {
    id: 3,
    name: "Mountain View Café",
    shortDescription: "A cozy café with a view of the surrounding mountains.",
    cover: "https://via.placeholder.com/300x200",
    city: "Denver",
    dateCreated: "2023-07-02",
    ownerAvatar: "https://picsum.photos/seed/business2/100",
    ownerName: "Emily Clark",
  },
  {
    id: 4,
    name: "Historic Downtown",
    shortDescription:
      "A charming downtown area with historic buildings and shops.",
    cover: "https://via.placeholder.com/300x200",
    city: "Boston",
    dateCreated: "2023-07-20",
    ownerAvatar: "https://picsum.photos/seed/business2/100",
    ownerName: "Michael Brown",
  },
  {
    id: 5,
    name: "Crystal Lake Resort",
    shortDescription: "A luxury resort located by the pristine Crystal Lake.",
    cover: "https://via.placeholder.com/300x200",
    city: "Orlando",
    dateCreated: "2023-08-01",
    ownerAvatar: "https://picsum.photos/seed/business2/100",
    ownerName: "Sarah Green",
  },
];

export const placeDetailData: PlaceDetail = {
  id: 1,
  name: "Golden Gate Park",
  shortDescription: "A beautiful urban park with gardens, trails, and museums.",
  description:
    "Golden Gate Park is a large urban park with beautiful gardens, scenic walking trails, and several museums, including the de Young Museum and the California Academy of Sciences. It's a perfect place for picnics, walking, and enjoying nature in the heart of San Francisco.",
  images: [
    "https://picsum.photos/800/400?random=1", // Random image of the park
    "https://picsum.photos/800/400?random=2", // Another random image
    "https://picsum.photos/800/400?random=3", // Another random image
  ],
  address: "501 Stanyan St, San Francisco, CA 94117",

  city: "San Francisco",
  ownerId: 101, // Fictional owner ID
  ownerAvatar: "https://i.pravatar.cc/150?img=20", // Random avatar for the owner
  ownerName: "John Smith",
  dateCreated: "2023-04-20",
  categories: [
    {
      id: 1,
      name: "Park",
      icon: "fa-music", // Park icon
    },
    {
      id: 2,
      name: "Nature",
      icon: "fa-star", // Nature icon
    },
  ],
};
