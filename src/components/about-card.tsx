"use client";

import { RiFileTextLine } from "react-icons/ri";
import type { AboutCardProps } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";

export const AboutCard = ({ content }: AboutCardProps) => {
  return (
    <Card>
      <CardHeader title="About" icon={<RiFileTextLine size={24} />} />
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
