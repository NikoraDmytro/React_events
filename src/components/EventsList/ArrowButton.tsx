import React from "react";

interface Props {
  onClick: () => void;
  disabled: boolean;
  direction: "left" | "top" | "right" | "bottom";
}

const degree = {
  left: 180,
  right: 0,
  top: 270,
  bottom: 90,
};

export const ArrowButton = ({ onClick, disabled, direction }: Props) => {
  const ArrowSvg = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg width="200" height="1000" viewBox="0 0 200 1000" {...props}>
        <polyline
          points="10,10 190,500 10,1000"
          fill="none"
          stroke="black"
          stroke-width="10"
          transform={`rotate(${degree[direction]} 100,500)`}
        />
      </svg>
    );
  };

  return (
    <button onClick={onClick} disabled={disabled}>
      <ArrowSvg width={100 + "%"} height={100 + "%"} />
    </button>
  );
};
