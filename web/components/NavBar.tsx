import React from "react";
import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between mt-8 m-auto max-w-7xl px-4">
      <div className="w-56">
        <NavLink href="/">AI Tutor</NavLink>
      </div>
      <div>
        <NavLink href="/chat">chat</NavLink>
        <NavLink href="/study">study</NavLink>
        <NavLink href="/support">support</NavLink>
      </div>
    </div>
  );
}
