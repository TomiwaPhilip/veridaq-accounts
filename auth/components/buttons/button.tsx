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
      className="gradient text-white w-[250px] h-[70px] rounded-md"
    >
      {name}
    </button>
  );
}
