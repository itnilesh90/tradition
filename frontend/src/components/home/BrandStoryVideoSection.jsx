const fallbackVideo =
  "https://res.cloudinary.com/demo/video/upload/v1312461204/dog.mp4";

const BrandStoryVideoSection = ({ video, videoUrl }) => {
  const source = video?.videoUrl || videoUrl || "";
  if (!source) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-amber-900 text-white shadow-lg">
        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-200">
              Brand Story
            </p>
            <h3 className="text-2xl font-semibold md:text-3xl">
              Crafted with tradition, styled for today
            </h3>
            <p className="mt-4 text-amber-100">
              Discover the process behind our handmade pieces and modern ethnic
              designs in this short visual story.
            </p>
          </div>
          <video
            controls
            preload="none"
            poster={video?.fallbackImage || undefined}
            className="h-64 w-full rounded-2xl bg-black object-cover"
            aria-label="Brand story video"
          >
            <source src={source || fallbackVideo} type="video/mp4" />
            Your browser does not support embedded videos.
          </video>
        </div>
      </div>
    </section>
  );
};

export default BrandStoryVideoSection;
