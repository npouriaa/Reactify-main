import ScrollElement from "../../components/ScrollElement";

const Advantages = () => {
  const dataArray = [
    {
      title: "real time",
      text: "Dozens of leading utility providers like National Grid are gaining enhanced situational awareness",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#7048C0"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bg_color: "7048c065",
      transition: "translate-y-8",
    },
    {
      title: "secure",
      text: "Dozens of leading utility providers like National Grid are gaining enhanced situational awareness",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#45D6D2"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      bg_color: "45d6d154",

      transition: "translate-y-20",
    },
    {
      title: "Contextual Interface",
      text: "Dozens of leading utility providers like National Grid are gaining enhanced situational awareness",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#F7618B"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      ),
      bg_color: "f7618c5b",
      transition: "translate-y-28",
    },
  ];

  return (
    <section className="w-full max-sm:mt-10 2xl:mt-16">
      <div className="p-4 flex justify-center gap-10 flex-wrap items-center">
        {dataArray.map((item, index) => (
          <ScrollElement key={index} transition={item.transition}>
            <div className="w-[350px] justify-evenly h-[200px] flex flex-col items-start px-4">
              <div
                className={`rounded-full p-4 flex justify-center ites-center bg-[#${item.bg_color}]`}
              >
                {item.icon}
              </div>
              <h2 className="text-2xl">{item.title}</h2>
              <p className="font-thin text-gray-600">{item.text}</p>
            </div>
          </ScrollElement>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
