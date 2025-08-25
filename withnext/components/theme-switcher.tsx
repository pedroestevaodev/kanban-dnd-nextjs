"use client";

import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from "./icons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = theme === "light";

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      aria-label="Toggle theme"
      variant="flat"
      onPress={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
    </Button>
  );
};

export { ThemeSwitcher };
