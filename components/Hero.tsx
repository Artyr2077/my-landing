import React from "react";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#f7faff] to-[#ecf1fc] py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-5 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Разработка сайтов и приложений
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">
          Создаём современные веб-решения, которые помогают бизнесу расти
        </p>
        <a
          href="#contact"
          className="
            px-8 py-4
            rounded-xl
            bg-blue-600
            text-white
            text-base md:text-lg
            font-semibold
            shadow-lg
            transition
            duration-200
            hover:bg-blue-700
            hover:scale-105
            focus:outline-none
            focus:ring-4
            focus:ring-blue-300
            active:bg-blue-800
          "
        >
          Обсудить проект
        </a>
      </div>
    </section>
  );
};

export default Hero;