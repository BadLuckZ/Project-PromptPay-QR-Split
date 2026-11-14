"use client";

import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      position="bottom-center"
      style={
        {
          fontFamily: "var(--font-sans)",
          "--normal-bg": "var(--surface)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border-strong)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "border-2! text-sm! shadow-none!",
          icon: "text-primary",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
