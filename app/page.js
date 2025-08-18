import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-100">
  <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[91vh]">
    {/* Left Section (Text) */}
    <div className="flex flex-col gap-4 items-center justify-center p-6">
      <p className="text-2xl md:text-3xl font-bold text-center md:text-left">
        The best URL shortener in the Market.
      </p>
      <p className="px-4 md:px-32 text-center md:text-left">
        We are the most straightforward URL shortener in the world. Most of the
        url shorteners will track you or ask you to give your details for login.
        We understand your needs and hence we have created this URL shortener.
      </p>
      <div className="flex gap-3">
        <Link href="/shorten">
          <button className="bg-purple-500 text-white rounded-lg shadow-lg px-4 py-2 font-bold">
            Try Now
          </button>
        </Link>
        <Link href="/github">
          <button className="bg-purple-500 text-white rounded-lg shadow-lg px-4 py-2 font-bold">
            Github
          </button>
        </Link>
      </div>
    </div>

    {/* Right Section (Image) */}
    <div className="flex justify-center items-center relative w-full h-[250px] md:h-auto">
      <Image
        src="/vector.jpg"
        alt="Image of a vector"
        width={800}
        height={700}
        className="object-contain mix-blend-multiply filter brightness-110 contrast-125"
      />
    </div>
  </section>
</main>

  );
}
