import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ username }: { username: string }) => {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg/seed=${username}`;
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} alt={username} />
      <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
