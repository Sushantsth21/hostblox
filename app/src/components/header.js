import React from "react";
import Link from "next/link"; // If using Next.js, use Link for routing

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold">
          <Link href="/">HostBlox</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/host" className="hover:text-gray-300">
              Host
            </Link>
          </li>
          <li>
            <Link href="/trade" className="hover:text-gray-300">
              Trade
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
