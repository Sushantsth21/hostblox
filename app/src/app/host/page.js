import React from "react";
import Create from "./create";
import Join from "./join";
import Header from "@/components/header";
import Footer from "@/components/footer";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-1">
        <div className="h-1/2">
          <Create />
        </div>
        <div className="h-1/2">
          <Join />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
