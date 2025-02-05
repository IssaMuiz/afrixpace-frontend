import Image from "next/image";
import { Heart, MessageSquare } from "lucide-react";

const AdventureCard = ({ title, image, likes, comments }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Image
        src={image}
        width={600}
        height={300}
        alt={title}
        className="rounded-md"
      />
      <h3 className="font-semibold text-lg mt-2">{title}</h3>
      <div>
        <span>
          <Heart /> {likes}
        </span>{" "}
        <span>
          <MessageSquare /> {comments}
        </span>
      </div>
    </div>
  );
};

export default AdventureCard;
