"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function WelcomeToast() {
  const hasToasted = useRef(false);

  useEffect(() => {
    if (!hasToasted.current) {
      toast("Welcome to PlantCare! 🌱", {
        description: "Create a household to get started, it's totally free and no account needed.",
        duration: 5000,
      });
      hasToasted.current = true;
    }
  }, []);

  return null;
}
