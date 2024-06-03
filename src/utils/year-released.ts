export function yearReleased(releaseDate: string | undefined) {
  return releaseDate?.split("-")[0];
}
