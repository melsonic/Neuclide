import React, { ReactElement } from "react";
import BoxComponent from "./BoxComponent";
// import Link from "next/link";
import Navbar from "./Navbar";

export default function Homepage(): ReactElement {
  return (
    <div className="min-h-screen bg-image">
      {/* navigation bar */}
      <Navbar />

      {/* main items */}
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold text-gradient pt-40">NEUCLIDE</h1>
        <h3 className="text-4xl font-medium pt-4">Next Generation Attendance Manager</h3>
        <div className="flex pt-24">
          <BoxComponent image="/../public/left_box.png" />
          <BoxComponent image="/../public/right_box.png" />
        </div>
      </div>
    </div>
  );
}
