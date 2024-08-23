import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Our Hosting / Trading Site
        </h1>
        <p className="text-xl mb-8">
          Reliable and secure hosting for your Roblox games.
        </p>
        <Link href="/host">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
            Start Hosting
          </button>
        </Link>
      </div>

      {/* Trade Section */}
      <div className="bg-gray-800 text-white text-center flex-grow flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Trade with Confidence</h2>
        <p className="text-lg mb-8">
          Join our trading platform for seamless and secure trades.
        </p>
        <Link href="/trade">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700">
            Start Trading
          </button>
        </Link>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gray-800 text-white text-center flex-grow flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">Have any questions? We’re here to help.</p>
        <Link href="/contact">
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-700">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
