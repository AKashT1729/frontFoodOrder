import React from "react";

const Home = () => {
  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <img
          src="src/assets/coffee-shop.png"
          alt=""
          className="mx-auto w-20"
        />
        <h1 className="text-3xl text-gray-900 text-center mt-2">
          Coffea & The Beanstalk Cafe
        </h1>

        <div className="space-y-4 mt-16 w-full md:w-3xl md:ml-56">
          <p className="text-xl text-gray-700 text-center mt-2">Welcome...</p>
          <p className="text-center text-xl text-gray-700">
            We are happy to serve you.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <button className="py-2.5 px-5 mb-2 text-sm font-semibold rounded-2xl border cursor-pointer text-gray-800 border-gray-600 hover:text-gray-600 hover:bg-gray-200">
              🧾 Request For Bill
            </button>
            <button className="py-2.5 px-5 mb-2 text-sm font-semibold rounded-2xl border cursor-pointer text-gray-800 border-gray-600 hover:text-gray-600 hover:bg-gray-200">
              🍽️ Order food
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
