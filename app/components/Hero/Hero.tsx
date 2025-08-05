export default function Hero() {
  return (
    <div className="h-[75dvh] relative">
      <img
        src="public/pexels-joyston-judah-snowy-mountains.jpg"
        alt="Hero Image"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 h-full w-full p-6 bg-gray-900/40 flex flex-col justify-center">
        <p className="text-center text-white text-4xl md:text-5xl mb-5">
          Welcome to my personal blog!
        </p>
        <p className="text-center text-white text-sm md:text-base">
          A subtitle or placeholder message about the blog's content.
        </p>
      </div>
    </div>
  );
}
