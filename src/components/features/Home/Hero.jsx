import { MagicButton } from "./MagicButton";
import "../../../styles/global.css";
import { useState, useEffect } from "react";

const Hero = () => {
  const words = ["Events", "Sports", "StandUp Shows", "DJ Shows"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div>
        <div className="relative overflow-hidden bg-primary">
          <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  FIND MORE <br />
                  <span className="animated-gradient-text">
                    {words[currentWordIndex]}
                  </span>{" "}
                  <br /> OF YOUR LIKE!
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                  Incredible live shows. Upfront pricing. Relevant
                  recommendations. We make going out easy.
                </p>
              </div>
              <div>
                <div className="mt-10">
                  {/* Decorative image grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 animate-zoomInOut">
                          <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                            <img
                              alt=""
                              src="https://img.freepik.com/premium-photo/champagne-toast-celebration-party_663277-40416.jpg?semt=ais_hybrid"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://dont-tell-comedy.mo.cloudinary.net/private/funny_face_comedian2_6HcKpZ2.webp"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>

                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 animate-zoomOutIn">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://www.format.com/wp-content/uploads/Soccer_-_sports_photography_guide.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://cdn.prod.website-files.com/63e4dc1f07aedf1e6c5e8f01/642d34adfa7530435d9cb09f_MoulinRouge6_1920x1280_Piccadilly.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://images.pexels.com/photos/6518865/pexels-photo-6518865.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 animate-zoomInOut">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://cdn.digitaldjtips.com/app/uploads/2017/10/19130622/Memorable.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE="
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-10">
                    <a href="/events" className="hidden md:inline-block">
                      <MagicButton
                        title={"Explore Events"}
                        color={"gray-600"}
                        textColor={"#080808"}
                      />
                    </a>
                    {/* <a href="/launch-event" className="hidden md:inline-block">
                      <MagicButton
                        title={"Launch Events"}
                        color={"secondary"}
                        textColor={"white"}
                      />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
