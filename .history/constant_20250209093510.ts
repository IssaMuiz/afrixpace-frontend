import { Home, Users, Globe, HeartPulseIcon, Briefcase } from "lucide-react";

export const categories = [
  {
    name: "Home",
    icon: Home,
    path: "/",
  },
  {
    name: "Politics",
    icon: Briefcase,
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
