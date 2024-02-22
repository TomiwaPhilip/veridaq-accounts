import React from "react";

export default function Button({
  name,
  type,
}: {
  name: string;
  type: "submit" | "button";
}) {
  return (
    <button
      type={type}
      className="gradient text-white font-medium text-[20px] w-[200px] h-[70px] rounded-md"
    >
      {name}
    </button>
  );
}
