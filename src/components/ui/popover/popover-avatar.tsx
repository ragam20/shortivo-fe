import type { User } from "@/types/api";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { UserAvatar } from "../avatar/user-avatar";
import { Separator } from "../separator";
import { LogOut as LogoutIcon } from "lucide-react";

type AvatarPopOverProps = {
  user: User;
  logout: () => void;
  children: React.ReactNode;
};

export const AvatarPopOver = ({
  user,
  children,
  logout,
}: AvatarPopOverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent align="end" className="overflow-hidden p-0 mt-2">
        <div>
          <div className="flex gap-2 px-2 py-4">
            <UserAvatar size="lg" user={user}></UserAvatar>
            <div>
              <p className="text-[16px]">{user.username}</p>
              <p className="text-[12px]">{user.email}</p>
            </div>
          </div>

          <div
            onClick={() => {}}
            className="cursor-pointer w-fit mx-2 px-2 py-1 bg-primary text-[12px] rounded text-white"
          >
            Upgrade
          </div>
          <Separator className="my-4" />
          <div className="px-2 pb-4">
            <div
              onClick={() => {
                logout();
              }}
              className="cursor-pointer flex items-center gap-1 justify-end w-full"
            >
              <LogoutIcon className="size-4" />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
