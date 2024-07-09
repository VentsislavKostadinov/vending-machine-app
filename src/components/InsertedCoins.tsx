import React from "react";
import { InsertedCoinsProps } from "../model/InsertedCoins";

export const InsertedCoins: React.FC<InsertedCoinsProps> = ({ coins }) => {
  return (
    <div>
      <br />
      <br />
      <h6>Inserted coins</h6>
      <p>${coins.toFixed(2)}</p>
    </div>
  );
};
