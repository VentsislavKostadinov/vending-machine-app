import React from "react";
import { ChangeSectionDisplayProps } from "../model/ChangeSectionDisplay";

export const ChangeSectionDisplay: React.FC<ChangeSectionDisplayProps> = ({
  change,
}) => {
  return (
    <div>
      <br />
      <h6>Change</h6>
      {Object.entries(change)
        .filter(([_, amount]) => amount > 0)
        .map(([coin, amount]) => (
          <h6 key={coin}>{`$${parseFloat(coin).toFixed(2)}: ${amount}`}</h6>
        ))}
    </div>
  );
};
