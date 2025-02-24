import { Globe, BriefcaseBusinessIcon } from "lucide-react";

export const categories = [
  {
    name: "Entrepreneurship",
    icon: BriefcaseBusinessIcon,
    path: "Entrepreneur",
  },
  {
    name: "Technology",
    icon: Globe,
    path: "Technology",
  },
];

export const categoryImageHeader: Record<string, string> = {
  Entrepreneur: "/entrepreneurship-image.jpg",
  Technology: "/Technology-image.jpg",
};
