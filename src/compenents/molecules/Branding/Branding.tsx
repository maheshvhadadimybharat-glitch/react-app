import React from "react";
import { Image } from "../../atoms/Image";

const Branding = ({
    hasEmblem,
    hasSeperator,
    className = "",
    direction = "horizontal", // horizontal | vertical
    }
) => {

  const layoutClass =
    direction === "vertical"
      ? "flex flex-col items-center gap-2 w-[125px] flex-col-reverse"
      : "flex items-center gap-3 w-[250px]";

  return (
    <div className={`${layoutClass} ${className}`}> 
        {hasEmblem && (
            <span> 
                <Image alt="Emblem" src="https://cdn-beta.mybharats.in/mybharat/assets/img/yuva_landing/YASLogo_opt_2x.png"/>
            </span>
        )}
        {hasSeperator && (
             <div className="w-px self-stretch bg-gray-300"></div>

        )}
        <span>
            <Image alt="Logo" src="https://cdn-beta.mybharats.in/mybharat/assets/img/yuva_landing/mybharatlogo_opt_2x.png"/>
        </span>  
    </div>
  );
};

export default Branding;