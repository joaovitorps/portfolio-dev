import { cn } from "@/lib/utils";
import type { ProfileData } from "@/types";
import { TextRotator } from "./ui/text-rotator";

interface TextRotatorHeadlineProps {
  profile: ProfileData;
  className?: string;
}

export const TextRotatorHeadline = ({
  profile,
  className = "",
}: TextRotatorHeadlineProps) => {
  const bioData = profile.bio;

  return (
    <p
      className={cn([
        "text-sm",
        "text-muted-foreground",
        "leading-relaxed",
        className,
      ])}
    >
      {bioData.text}
      {bioData.variations && bioData.variations.length > 0 && (
        <>
          {" "}
          <TextRotator
            words={bioData.variations}
            interval={2000}
            duration={0.5}
            className="text-sm"
          />
        </>
      )}
    </p>
  );
};
