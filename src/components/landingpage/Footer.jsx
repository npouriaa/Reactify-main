import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/Reactify-black.png";

const Footer = () => {
  return (
    <footer className="w-full max-sm:mt-10 flex gap-4 px-8 py-2 flex-col items-center">
      <div className="w-full h-full max-sm:gap-6 sm:gap-8 md:gap-14 xl:gap-28 flex max-sm:justify-start lg:justify-center flex-wrap items-start">
        <div className="h-full flex flex-col gap-4">
          <Link to="/">
            <img
              className="max-sm:h-10 lg:h-12 md:h-10"
              src={logo}
              alt="logo"
            />
          </Link>
          <p className="font-thin text-gray-400">follow me on :</p>
          <div className="flex gap-2 items-center">
            <Link to="https://www.linkedin.com/in/pouria-navipour-7b52b0272/">
              <svg
                className="fill-gray-400 transition-all hover:fill-[#162167]"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            <Link to="https://t.me/npouriaa">
              <svg
                className="fill-gray-400 transition-all hover:fill-[#162167]"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 50 50"
              >
                <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
              </svg>
            </Link>
            <Link>
              <svg
                className="fill-gray-400 transition-all hover:fill-[#162167]"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 50 50"
              >
                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div
          className="flex flex-wrap items-center max-sm:gap-10 sm:gap-16"
        >
          <div className="flex flex-col gap-5">
            <h4 className="text-blue-900 text-lg">Company</h4>
            <ul className="flex text-xs flex-col gap-3">
              <Link>
                <li className="text-gray-400">About us</li>
              </Link>
              <Link>
                <li className="text-gray-400">features</li>
              </Link>
              <Link>
                <li className="text-gray-400">pricing</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-blue-900 text-lg">resources</h4>
            <ul className="flex text-xs flex-col gap-3">
              <Link>
                <li className="text-gray-400">FAQs</li>
              </Link>
              <Link>
                <li className="text-gray-400">testimonial</li>
              </Link>
              <Link>
                <li className="text-gray-400">terms & condition</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-blue-900 text-lg">products</h4>
            <ul className="flex text-xs flex-col gap-3">
              <Link>
                <li className="text-gray-400">blog</li>
              </Link>
              <Link>
                <li className="text-gray-400">help center</li>
              </Link>
              <Link>
                <li className="text-gray-400">contact</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-blue-900 text-lg">relevent</h4>
            <ul className="flex text-xs flex-col gap-3">
              <Link>
                <li className="text-gray-400">why</li>
              </Link>
              <Link>
                <li className="text-gray-400">products</li>
              </Link>
              <Link>
                <li className="text-gray-400">customers</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center py-4 justify-center border-t-2 border-t-gray-200">
        <p className="text-gray-400">
          made by{" "}
          <Link className="text-blue-500" to="https://github.com/npouriaa">
            Npouriaa
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
