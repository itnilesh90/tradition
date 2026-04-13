import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const defaultVideo =
  "https://res.cloudinary.com/demo/video/upload/v1698912346/samples/elephants.mp4";

const HeroVideoSection = ({ videoUrl }) => {
  const [videoError, setVideoError] = useState(false);
  const source = useMemo(() => (videoError ? defaultVideo : videoUrl || defaultVideo), [videoError, videoUrl]);

  return (
    <section className="relative overflow-hidden rounded-3xl">
      <video
        className="h-[380px] w-full object-cover md:h-[520px]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        onError={() => setVideoError(true)}
      >
        <source src={source} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 px-6 text-white md:px-16">
        <p className="text-sm uppercase tracking-[0.3em]">New Collection</p>
        <h1 className="max-w-2xl text-3xl font-bold md:text-6xl">
          Handcrafted Ethnic Pieces for Every Season
        </h1>
        <Link
          to="/products"
          className="rounded-md bg-rose-600 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-rose-700"
        >
          Shop The Launch
        </Link>
      </div>
    </section>
  );
};

export default HeroVideoSection;
