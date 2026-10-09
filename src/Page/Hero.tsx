import { Infinity } from "lucide-react";
function Hero() {
  return (
    <section className="card lg:card-side overflow-hidden bg-base-100 p-5 w-[95%] flex mx-auto">
      <div className="card-body justify-center p-8 lg:w-1/2 relative" >
        <p className="text-xs font-semibold tracking-[0.25em] text-[#1d4362]">
          250 COUNTRIES. ONE WORLD.
        </p>
        <div className=" flex-col mb-70 flex gap-2">
          <h1 className="text-4xl font-bold leading-tight text-[#1d4362] md:text-5xl  flex gap-2">
            Collect
            <br />
            Moments,
            <br />
            Not Things.
          </h1>
        <p className="max-w-150 text-sm  text-base-content/60 ">
          Explore countries, save your favorites, and build your dream travel
          list.
        </p>
        </div>
        <div className="flex flex-row absolute bottom-30 gap-1 md:gap-10 text-[#1d4362]  lg:w-110 ">
          <p className="flex flex-col border-r-2 pr-4">
            <span className="font-bold">250</span> Countries
          </p>
          <p className="flex flex-col border-r-2 pr-4">
            <span className="font-bold">5</span> Continents
          </p>
          <p className="flex flex-col border-r-2 pr-4">
            <span className="font-bold">
              <Infinity />
            </span>
            Possibilities
          </p>
        </div>
      </div>


      <div className="hidden lg:flex h-full w-full items-center justify-center ">
        <svg viewBox="0 0 200 200" className="h-220 w-220 -mt-10">
          <defs>
            <clipPath id="blob">
              <path
                d="M41.4,-66.9C54.9,-63.8,68.1,-55.4,73.4,-43.3C78.7,-31.3,76.1,-15.6,76.8,0.4C77.4,16.4,81.2,32.7,76.2,45.2C71.1,57.7,57.2,66.4,43.1,70.8C28.9,75.2,14.4,75.3,1.7,72.4C-11.1,69.5,-22.2,63.6,-30.9,56C-39.6,48.5,-46,39.4,-53.3,29.8C-60.5,20.2,-68.7,10.1,-71.1,-1.4C-73.5,-12.8,-70.1,-25.7,-62.6,-34.8C-55,-44,-43.4,-49.5,-32.3,-54C-21.2,-58.5,-10.6,-61.9,1.7,-64.8C13.9,-67.7,27.8,-70,41.4,-66.9Z"
                transform="translate(120 100)"
              />
            </clipPath>
          </defs>

          <image
            href="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff"
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#blob)"
          />
        </svg>
      </div>
    </section>
  );
}
export default Hero;
