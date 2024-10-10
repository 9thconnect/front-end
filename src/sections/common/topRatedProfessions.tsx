import TalentCard, { ITalent } from "@/components/cards/talentCard";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { generateRandomAlphanumeric } from "@/utils/generateAlphanumeric";
import React from "react";
// import { talentsData } from "./categoryTalentListSection";

const TopRatedProfessions = () => {
  return (
    <ScrollableContainer>
      <div className="flex space-x-4 cursor-pointer">
        {/* {talentsData.map((talent, index) => (
          <div className="w-80 flex-none self-stretch" key={index}>
            <TalentCard talent={talent} />
          </div>
        ))} */}
      </div>
    </ScrollableContainer>
  );
};

export default TopRatedProfessions;
