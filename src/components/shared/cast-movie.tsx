import { IconUser } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type CastProps = {
  avatar: string | null;
  name: string;
  character: string;
};

const Cast = ({ avatar, name, character }: CastProps) => {
  return (
    <div className="flex items-center">
      <Avatar className="w-20 h-24 overflow-hidden mr-5">
        {avatar ? (
          <AvatarImage
            src={`https://media.themoviedb.org/t/p/w138_and_h175_face${avatar}`}
            alt={name}
          />
        ) : (
          <AvatarFallback>
            <IconUser className="text-5xl text-slate-400" />
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <h3 className="font-bold">{name}</h3>
        <span>{character}</span>
      </div>
    </div>
  );
};

export default Cast;
