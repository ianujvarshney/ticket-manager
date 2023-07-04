import { UserProps } from "../../contexts/UserContext/actions-builder";
import { SignOut } from "phosphor-react";

type Props = {
  user: UserProps;
};

export function UserProfile({ user }: Props) {
  return (
    <div className="flex select-none items-center gap-4">
      <img
        src={user.avatarUrl}
        alt=""
        className="h-8 w-8 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <span className="text-sm">{user.name}</span>
        <span className="text-xs">{user.email}</span>
      </div>

      <button className="" title="SignOut">
        <SignOut
          size={22}
          className="text-red-200 transition-colors hover:text-red-500"
        />
      </button>
    </div>
  );
}
