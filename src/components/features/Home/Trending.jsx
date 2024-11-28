/* eslint-disable react/no-unknown-property */
import { ServiceData } from "../../../data/TrendingList";
const Trending = () => {
  return (
    <div className="overflow-hidden bg-primary">
      <div className="mx-full max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Trending
        </h2>
        <div className="mt-6 overflow-x-hidden relative">
          <div className="scroll-container flex space-x-4 animate-scroll">
            {[...ServiceData, ...ServiceData].map((item, index) => (
              <div
                key={index}
                className="group relative inline-block w-64 flex-shrink-0"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-90">
                  <img
                    src={item.backgroundImage}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-lg text-white">
                      <a href="/single-event">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-200">{item.date}</p>
                  </div>
                  <p className="text-lg font-medium text-white">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 15s linear infinite;
        }

        .scroll-container:hover {
          animation-play-state: paused; /* Pauses animation on hover */
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Trending;
