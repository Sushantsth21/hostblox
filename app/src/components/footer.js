import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </p>
        <p className="text-xs">
          Follow us on{" "}
          <a href="#" className="underline">
            Twitter
          </a>{" "}
          |{" "}
          <a href="#" className="underline">
            Facebook
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
