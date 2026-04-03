"use client";

import type { AboutCardProps } from "@/lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";

export const AboutCard = ({ content }: AboutCardProps) => {
  return (
    <Card>
      <CardHeader title="About" />
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
