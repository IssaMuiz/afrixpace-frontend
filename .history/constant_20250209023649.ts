import { Home, Users, Globe, HeartPulseIcon } from "lucide-react";

export const categories = [
  {
    name: "Home",
    icon: Home,
    path: "/",
  },
  {
    name: "Politics",
    icon: Users,
    path: "category/Politics",
  },
  {
    name: "Technology",
    icon: Globe,
    path: "category/Technology",
  },
  {
    name: "Health",
    icon: HeartPulseIcon,
    path: "category/Health",
  },
];

export const categoryImageHeader: Record<string, string> = {
  Politics: "/politics-image.jpg",
  Technology: "/Technology-image.jpg",
  Health: "/Health-image.jpg",
};
