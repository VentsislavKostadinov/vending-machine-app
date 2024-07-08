import React from "react";
import { ChangeSectionDisplayProps } from "../model/ChangeSectionDisplay";

export const ChangeSectionDisplay: React.FC<ChangeSectionDisplayProps> = ({
  change,
}) => {
  return (
    <div>
      {Object.entries(change)
        .filter(([_, amount]) => amount > 0)
        .map(([coin, amount]) => (
          <h3
            key={coin}
          >{`Change: $${parseFloat(coin).toFixed(2)}: ${amount}`}</h3>
        ))}
    </div>
  );
};
