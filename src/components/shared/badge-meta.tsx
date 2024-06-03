import { Badge } from "~/components/ui/badge";

type BadgeMetaProps = {
  children: React.ReactNode;
};

export function BadgeMeta({ children }: BadgeMetaProps) {
  return (
    <Badge variant="secondary" className="text-sm">
      {children}
    </Badge>
  );
}
