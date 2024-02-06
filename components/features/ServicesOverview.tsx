import { FeaturesListicle } from "./FeaturesListicle";

export const ServicesOverview = () => {
  return (
    <section className="bg-neutral container mt-36 flex min-h-screen flex-col items-start">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        Temos tudo que você precisa em um<br />
        <span className="text-primary-600">único lugar</span>
      </h1>

      <FeaturesListicle />
    </section>
  );
};
