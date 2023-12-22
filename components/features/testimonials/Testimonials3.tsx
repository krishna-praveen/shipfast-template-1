import Image from "next/image";
import { StaticImageData } from "next/image";

import config from "@/config";

// The list of your testimonials. It needs 3 items to fill the row.
const list: {
  username?: string;
  name: string;
  text: string;
  img?: string | StaticImageData;
}[] = [
    {
      // Optional, use for social media like Twitter. Does not link anywhere but cool to display
      username: "marclou",
      // REQUIRED
      name: "Marc Lou",
      // REQUIRED
      text: "Really easy to use. The tutorials are really useful and explains how everything works. Hope to ship my next project really fast!",
      // Optional, a statically imported image (usually from your public folder—recommended) or a link to the person's avatar. Shows a fallback letter if not provided
      img: "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
    },
    {
      username: "the_mcnaveen",
      name: "Naveen",
      text: "Setting up everything from the ground up is a really hard, and time consuming process. What you pay for will save your time for sure.",
    },
    {
      username: "wahab",
      name: "Wahab Shaikh",
      text: "Easily saves 15+ hrs for me setting up trivial stuff. Now, I can directly focus on shipping features rather than hours of setting up the same technologies from scratch. Feels like a super power! :D",
    },
  ];

// A single testimonial, to be rendered in  a list
const Testimonial = ({ i }: { i: number }) => {
  const testimonial = list[i];

  if (!testimonial) return null;

  return (
    <li key={i}>
      <figure className="relative flex h-full max-w-lg flex-col rounded-2xl bg-base-200 p-6 max-md:text-sm md:p-10">
        <blockquote className="relative flex-1">
          <p className="leading-relaxed text-base-content/80">
            {testimonial.text}
          </p>
        </blockquote>
        <figcaption className="relative mt-4 flex items-center justify-start gap-4 border-t border-base-content/5 pt-4 md:mt-8 md:gap-8 md:pt-8">
          <div className="flex w-full items-center justify-between gap-2">
            <div>
              <div className="font-medium text-base-content md:mb-0.5">
                {testimonial.name}
              </div>
              {testimonial.username && (
                <div className="mt-0.5 text-sm text-base-content/80">
                  @{testimonial.username}
                </div>
              )}
            </div>

            <div className="shrink-0 overflow-hidden rounded-full bg-base-300">
              {testimonial.img ? (
                <Image
                  className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                  src={list[i].img}
                  alt={`${list[i].name}'s testimonial for ${config.appName}`}
                  width={48}
                  height={48}
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-base-300 text-lg font-medium md:h-12 md:w-12">
                  {testimonial.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

const Testimonials3 = () => {
  return (
    <section id="testimonials">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-20 flex w-full flex-col text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-base-content sm:text-5xl">
              212 makers are already shipping faster!
            </h2>
          </div>
          <p className="mx-auto text-base leading-relaxed text-base-content/80 lg:w-2/3">
            Don&apos;t take our word for it. Here&apos;s what they have to say
            about ShipFast.
          </p>
        </div>

        <ul
          role="list"
          className="flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:gap-8"
        >
          {[...Array(3)].map((e, i) => (
            <Testimonial key={i} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials3;
