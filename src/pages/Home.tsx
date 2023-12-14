import BG from "../assets/images/bg-finland.png";
import Canabis from "../assets/images/canabis.png";
import { Button } from "@/components/ui/button.tsx";
import { CheckCircle2, Leaf, Nfc } from "lucide-react";
import footer from "../assets/images/gradient_color_blue_155118_2780x2780.jpg";
const Home = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className={"flex flex-col items-center pt-28 bg-black justify-center"}>
      <div className={"flex items-center"}>
        <img className={"h-96"} src={BG} alt={"background-image"} />
        <div
          className={"px-14 text-6xl font-black flex flex-col items-center "}
        >
          <span className={"block"}>New Canabis project </span>
          <span>
            from <span className={"text-blue-600"}>Finlandia </span> team!
          </span>
          <Button
            onClick={() => scrollDown()}
            className={"mt-10 w-48 h-14 hover:bg-blue-600"}
          >
            Discover
          </Button>
        </div>
      </div>
      <div
        className={
          "mt-80 w-full flex items-around justify-around bg-slate-950 py-36 "
        }
      >
        <div
          className={
            "h-80 w-96 p-4 flex flex-col items-center justify-evenly bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-center"
          }
        >
          <Nfc className={"mb-2"} size={64} />
          <h1 className={"text-2xl font-bold "}>
            Exploring the World of Cannabis
          </h1>
          <p className={"pt-4 text-gray-100"}>
            Embark on a journey through the diverse and fascinating realm of
            cannabis.
          </p>
        </div>
        <div
          className={
            "h-80 w-96 p-4 flex flex-col items-center justify-evenly bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-center"
          }
        >
          <Leaf className={"mb-2"} size={64} />
          <h1 className={"text-2xl font-bold "}>Cultivating Excellence</h1>
          <p className={"pt-4 text-gray-100"}>
            Delve into the art and science of cannabis cultivation
          </p>
        </div>
        <div
          className={
            "h-80 w-96 p-4 flex flex-col items-center justify-evenly bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-center"
          }
        >
          <CheckCircle2 className={"mb-2"} size={64} />
          <h1 className={"text-2xl font-bold "}>
            Innovation in Cannabis Products
          </h1>
          <p className={"pt-4 text-gray-100"}>
            Explore our innovative range of cannabis products designed to cater
            to diverse preferences.
          </p>
        </div>
      </div>
      <div className={"flex items-center justify-evenly w-full pt-36"}>
        <div className={"flex flex-col items-center w-[550px] justify-evenly"}>
          <h1 className={" text-6xl font-black  "}>
            Our canabis is the best in Finland!
          </h1>
          <p className={"pt-4 text-gray-100"}>
            Explore our innovative range of cannabis products designed to cater
            to diverse preferences. Innovation in Cannabis Products brings a lot
            of fun. We promise you. Especially if canabis from Finland
          </p>
        </div>

        <img src={Canabis} className={"h-96"} />
      </div>
      <img className={"h-96 w-full"} src={footer} alt={"footer"} />
    </div>
  );
};

export default Home;
