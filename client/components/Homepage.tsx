import React from "react";
import BoxComponent from "./BoxComponent";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="h-screen bg-image">
      {/* navigation bar */}
      <nav className="absolute w-full flex justify-between px-20 pt-10">
        {/* logo */}
        <div>
          <Link href="#" className="text-gradient nav-item">NEUCLIDE</Link>
        </div>
        {/* nav items */}
        <div>
          <Link href="/login" className="nav-item">Login</Link>
          <Link href="#" className="nav-item">Register</Link>
          <Link href="#" className="nav-item">About</Link>
        </div>
      </nav>

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
