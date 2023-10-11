import React from "react";

function PercentageBadge({ percentageDiff }: { percentageDiff: number }) {
  const className = getPercentageColor(percentageDiff)
  return (
    <span className={`badge text-xs text-white ${className}`}>
      {percentageDiff}%
    </span>
  );
}

const getPercentageColor = (value: number): string => {
  let color = "bg-gray-200";

  switch (true) {
    case value <= -5:
      color = "bg-red-600";
      break;
    case value <= -3:
      color = "bg-red-400";
      break;
    case value < 0:
      color = "bg-red-300";
      break;
    case value > 5:
      color = "bg-green-600";
      break;
    case value > 3:
      color = "bg-green-400";
      break;
    case value > 0:
      color = "bg-green-300";
      break;
    default:
      color = "bg-gray-200";
  }

  return color;
};
export default PercentageBadge;
