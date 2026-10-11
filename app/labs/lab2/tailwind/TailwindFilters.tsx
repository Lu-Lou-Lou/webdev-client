export default function TailwindFilters() {
  // reactjs.jpg is used here so the lab runs out of the box.
  const src = "/images/reactjs.jpg";
  return (
    <div>
      <h2>Blurs</h2>
      <div className="flex">
        <img className="blur-none w-1/4" src={src} alt="blur none" />
        <img className="blur-sm w-1/4" src={src} alt="blur sm" />
        <img className="blur-lg w-1/4" src={src} alt="blur lg" />
        <img className="blur-2xl w-1/4" src={src} alt="blur 2xl" />
      </div>
      <h3 className="mt-4 text-xl font-bold">Grayscale and brightness</h3>
      <div id="wd-ai-filters" className="flex">
        <img className="grayscale w-1/4" src={src} alt="grayscale" />
        <img className="grayscale-0 w-1/4" src={src} alt="grayscale 0" />
        <img className="brightness-50 w-1/4" src={src} alt="brightness 50" />
        <img className="brightness-150 w-1/4" src={src} alt="brightness 150" />
      </div>
      <h3 className="mt-4 text-xl font-bold">Saturation</h3>
      <div className="flex">
        <img className="saturate-100 w-1/4" src={src} alt="saturation 100" />
        <img className="saturate-50 w-1/4" src={src} alt="saturation 50" />
        <img className="saturate-150 w-1/4" src={src} alt="saturation 150" />
        <img className="saturate-200 w-1/4" src={src} alt="saturation 200" />
      </div>
    </div>
  );
}