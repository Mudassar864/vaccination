import syringe from "../assets/vaccination/syringe.svg";
import global from "../assets/vaccination/global.svg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-5  min-h-[300px] gap-10 overflow-hidden">
        
        {/* Left Column (60%) */}
        <div className="w-[50%] z-10 flex flex-col ">
          <Link to="/">
          <img
            style={{ width: "120px" }}
            src="./ghp-logo.png"
            alt="Logo"
            className="mb-12"
          />
          </Link>
          <h1 className="text-6xl font-bold leading-tight relative text-right text-[#635a55]">
            Vacci<span className="text-[#e37a23]">NATION</span>
          </h1>
          <span className="text-[clamp(1.2rem,3vw,1.8rem)] block leading-snug mt-4 text-right">
            Comparing vaccination systems globally
          </span>
          <img
            src={syringe}
            alt="syringe"
            className="w-[300px] h-auto -mt-2 rotate-180 self-end"
          />
        </div>
        
        {/* Right Column (40%) */}
        <div className="w-[50%] flex justify-center">
          <img
            src={global}
            alt="Hero"
            className="w-full h-auto -mt-40 -ml-20 "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
