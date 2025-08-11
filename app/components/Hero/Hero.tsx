export default function Hero() {
  return (
    <div className="relative h-[80dvh] max-h-200 max-w-7xl mx-auto">
      <img
        src="/lines_of_code.jpg"
        alt="Hero Image"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 h-full w-full p-6 bg-gray-900/30 flex flex-col justify-center">
        <p className="text-center text-white text-4xl md:text-5xl mb-5">
          Welcome to my personal blog!
        </p>
        <p className="text-center text-white text-base md:text-xl">
          Exploring the world of web development, one line of code at a time.
        </p>
      </div>
      <p className="text-xs text-white absolute bottom-1 left-1">
        Photo by{' '}
        <a
          href="https://www.pexels.com/@harold-vasquez-853421/"
          target="_blank"
          className="underline"
        >
          Harold Vasquez{' '}
        </a>
        from{' '}
        <a
          href="https://www.pexels.com/photo/lines-of-code-2653362/"
          target="_blank"
          className="underline"
        >
          Pexels
        </a>
      </p>
    </div>
  );
}
