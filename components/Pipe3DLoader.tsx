"use client";

import dynamic from "next/dynamic";

const Pipe3DScene = dynamic(
  () => import("./Pipe3DScene"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: "520px", background: "#000000" }}
      >
        <div
          className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(59,130,246,0.25)", borderTopColor: "#3b82f6" }}
        />
      </div>
    ),
  }
);

export default function Pipe3DLoader() {
  return <Pipe3DScene />;
}
