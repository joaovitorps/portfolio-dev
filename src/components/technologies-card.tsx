"use client";

import { RiToolsLine } from "react-icons/ri";
import type { TechnologiesCardProps } from "@/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

export const TechnologiesCard = ({ technologies }: TechnologiesCardProps) => {
  return (
    <Card>
      <CardHeader title="Technologies" icon={<RiToolsLine size={24} />} />
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
