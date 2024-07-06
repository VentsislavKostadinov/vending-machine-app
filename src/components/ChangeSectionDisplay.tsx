import React from "react";
import { ChangeSectionDisplayProps } from "../model/ChangeSectionDisplay";

export const ChangeSectionDisplay: React.FC<ChangeSectionDisplayProps> = ({
  change,
}) => {
  return (
    <div>
      <h2>Change</h2>
      {Object.entries(change).map(([coin, amount]) => (
        <p key={coin}>
          {parseFloat(coin).toFixed(2)}: {amount}
        </p>
      ))}
    </div>
  );
};
