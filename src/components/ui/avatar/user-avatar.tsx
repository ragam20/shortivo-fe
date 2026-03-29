import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/api";

type AppAvatarProps = {
  user: User;
  size?: "default" | "sm" | "lg";
  className?: string;
};

export function UserAvatar({ user, size: sz, className }: AppAvatarProps) {
  const initials = getInitials(user.username);
  const bgColor = stringToColor(user.username || "user");

  return (
    <Avatar className={className} size={sz}>
      <AvatarImage
        src={user.imgURL ? user.imgURL : ""}
        alt="user avatar"
        className="grayscale"
      />
      <AvatarFallback
        style={{ backgroundColor: bgColor }}
        className="text-white font-medium"
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

function getInitials(name?: string) {
  if (!name) return "??";

  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}

function stringToColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "#F87171", // red
    "#60A5FA", // blue
    "#34D399", // green
    "#FBBF24", // yellow
    "#A78BFA", // purple
    "#FB923C", // orange
    "#2DD4BF", // teal
  ];

  return colors[Math.abs(hash) % colors.length];
}
