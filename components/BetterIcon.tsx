import React from "react";

// A better way to illustrate with icons
// Pass any SVG icon as children (recommended width/height : w-6 h-6)
// By default, it's using your primary color for styling
const BetterIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
      {children}
    </div>
  );
};

export default BetterIcon;
