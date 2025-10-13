import syringe from "../assets/vaccination/syringe.svg";
import global from "../assets/vaccination/global.svg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="">
      <div className="flex justify-between items-center w-full mx-auto min-h-[300px]  relative overflow-hidden">
        {/* Left Column (60%) */}
        <div className="w-[calc(100%-650px)] z-10 flex flex-col px-4 py-10  ">
          <Link to="/" className=" py-2 ">
            <img
              style={{ width: "120px" }}
              src="./ghp-logo.png"
              alt="Logo"
              className="mb-12 ml-72"
            />
          </Link>
          <div className="flex justify-end flex-col">
            <h1 className="text-9xl font-bold leading-tight text-right text-[#635a55]">
              Vacci<span className="text-[#e37a23]">NATION</span>
            </h1>
            <span className="text-3xl block leading-snug -mt-4 text-right">
              Comparing vaccination systems globally
            </span>
            <img
              src={syringe}
              alt="syringe"
              className="w-[300px] h-auto -mt-2 rotate-180 self-end"
            />
          </div>
          <img src={global} alt="global" className="w-[800px] h-auto absolute -top-[45%] -right-28 -z-10 " />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
