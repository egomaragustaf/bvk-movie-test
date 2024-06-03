import { Movie } from "~/types";
import CastMovie from "~/components/shared/cast-movie";

export function TopCast({ credits }: { credits: Movie["credits"] }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-5">Top Cast</h3>
      <div className="grid grid-cols-2">
        {credits?.cast
          .filter((_credit, key) => key < 18)
          .map((cast, key) => {
            return (
              <div key={key} className="py-2">
                <CastMovie
                  name={cast.name}
                  avatar={cast.profile_path}
                  character={cast.character!}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
