"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRotatorProps {
  words: string[];
  interval?: number;
  duration?: number;
  className?: string;
}

export const TextRotator = ({
  words,
  interval = 2000,
  duration = 0.5,
  className = "",
}: TextRotatorProps) => {
  const [displayText, setDisplayText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (words.length === 0) return;

    const typeLoop = () => {
      const state = stateRef.current;
      const currentWord = words[state.wordIndex];
      let typeSpeed = duration * 200;

      if (state.isDeleting) {
        state.charIndex--;
        typeSpeed = duration * 100;
      } else {
        state.charIndex++;
      }

      setDisplayText(currentWord.substring(0, state.charIndex));

      if (!state.isDeleting && state.charIndex === currentWord.length) {
        state.isDeleting = true;
        typeSpeed = interval;
      } else if (state.isDeleting && state.charIndex === 0) {
        state.isDeleting = false;
        state.wordIndex = (state.wordIndex + 1) % words.length;
        typeSpeed = 300;
      }

      timeoutRef.current = setTimeout(typeLoop, typeSpeed);
    };

    typeLoop();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words, interval, duration]);

  return (
    <span className={cn("text-secondary font-medium", className)}>
      {displayText}
      <span className="animate-blink inline-block w-0.5 h-[1em] bg-secondary ml-0.5 align-middle" />
    </span>
  );
};
