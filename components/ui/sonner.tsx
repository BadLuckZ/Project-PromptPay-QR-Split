"use client";

import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      position="bottom-center"
      theme="light"
      richColors
      toastOptions={{
        style: { maxWidth: "28rem" },
        classNames: {
          toast: "rounded-xl! border! border-border! shadow-lg!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
