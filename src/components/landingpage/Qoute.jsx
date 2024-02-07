import ScrollElement from "../ScrollElement";

const Qoute = () => {
  return (
    <section className="w-full p-4 mt-20 max-sm:h-[450px] sm:h-[400px] md:h-[300px] bg-cover bg-[url(assets/images/bg-02.png)]">
      <ScrollElement
        styles={
          "w-full h-full flex flex-wrap gap-4 justify-center items-center"
        }
      >
        <div className="w-28 h-28 rounded-full relative overflow-hidden flex justify-center items-center">
          <div className="w-full h-full absolute opacity-30 bg-gray-100"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            className="w-14 h-14 scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </div>
        <div className="flex flex-col p-6 gap-4 font-extralight md:w-2/3 lg:w-1/2 xl:w-1/2 2xl:w-2/5 text-white">
          <p className="text-[18px]">
            The Internet is becoming the town square for the global village of
            tomorrow. Social media are the windows into those interactions,
            shaping our humanity one post and connect at a time.
          </p>
          <p className="font-extralight">
            Adapted from quotes by
            <span className="font-bold text-[18px]"> Bill Gates </span>
            and
            <span className="font-bold text-[18px]"> Neil Patel</span>
          </p>
        </div>
      </ScrollElement>
    </section>
  );
};

export default Qoute;
