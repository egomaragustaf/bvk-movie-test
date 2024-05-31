export type Credit = {
  adult?: boolean;
  gender: number;
  id: number;
  known_for_department:
    | "Acting"
    | "Directing"
    | "Production"
    | "Visual Effects"
    | "Art"
    | "Editing"
    | "Writing";
  name: string;
  profile_path: string | null;
  credit_id: string;
  character?: string;
  cast_id?: number;
  order?: number;
  department?: string;
  job?: string;
};
