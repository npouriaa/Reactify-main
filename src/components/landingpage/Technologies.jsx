import newAgeMessagingImage1 from "../../assets/images/01 (2).png";
import newAgeMessagingImage2 from "../../assets/images/02 (2).png";
import ScrollElement from "../../components/ScrollElement";

const Technologies = () => {
  return (
    <section className="w-full mt-20 flex p-2 items-center flex-col">
      <div className="w-full flex p-2 justify-center items-center">
        <div className="max-sm:w-full flex flex-col gap-14 sm:w-3/4 lg:w-full xl:w-3/4 p-3">
          <ScrollElement
            styles={"flex justify-center items-center flex-wrap gap-10"}
          >
            <div className="max-sm:w-full p-1 lg:w-1/2 xl:w-1/3 flex flex-col gap-4 leading-7">
              <h1 className="text-4xl">New-age Messaging</h1>
              <div className="font-thin text-gray-600">
                <p>
                  New-age Messaging refers to the next level of communication
                  technology that moves beyond traditional texting, emailing,
                  and even instant messaging. New-age Messaging is not just
                  reinventing the way we communicate but is also changing the
                  way we interact with the digital world.
                </p>
              </div>
            </div>
            <img
              className="h-96"
              src={newAgeMessagingImage1}
              alt="new-age-messaging-img"
            />
          </ScrollElement>
          <ScrollElement
            styles={"flex mt-12 justify-center items-center flex-wrap gap-10"}
          >
            <img
              className="h-80 object-contain"
              src={newAgeMessagingImage2}
              alt="new-age-messaging-img"
            />
            <div className="max-sm:w-full p-1  lg:w-1/2 xl:w-1/3 flex flex-col gap-4 leading-7">
              <h1 className="text-4xl">Bridging Connections</h1>
              <div className="font-thin text-gray-600">
                <p>
                  Connect with friends, family, and your professional network at
                  your fingertips. Our app brings the world closer to you.
                  Bridging Connections, as envisioned by our platform, signifies
                  a world without boundaries, a place where distance is
                  irrelevant
                </p>
              </div>
            </div>
          </ScrollElement>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
