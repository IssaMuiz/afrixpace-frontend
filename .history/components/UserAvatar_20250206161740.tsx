import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({
  username,
  userId,
}: {
  username?: string;
  userId?: string;
}) => {
  const seed = username || userId || "guest";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg/seed=${seed}`;
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} alt={seed} />
      <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
