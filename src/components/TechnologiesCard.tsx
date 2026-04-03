"use client";

import type { TechnologiesCardProps } from "@/lib/types";
import { Badge } from "./ui/Badge";
import { Card, CardContent, CardHeader } from "./ui/Card";

export const TechnologiesCard = ({ technologies }: TechnologiesCardProps) => {
  return (
    <Card>
      <CardHeader title="Technologies" />
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" size="md">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
