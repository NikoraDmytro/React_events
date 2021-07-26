import { useLayoutEffect, useState } from "react";

const BORDER = 2;
const MARGIN = 32;

export const useListPadding = (element: HTMLUListElement | undefined) => {
  const [style, setStyle] = useState({
    paddingLeft: 0,
    paddingRight: 0,
  });

  useLayoutEffect(() => {
    const getPadding = () => {
      if (element && element.firstElementChild) {
        const listWidth = element.offsetWidth;
        const childWidth =
          element.firstElementChild.clientWidth + BORDER + MARGIN;

        const capacity = Math.floor(listWidth / childWidth);
        if (capacity === 0) return;
        const remaining = listWidth - childWidth * capacity;
        const padding = Math.floor(remaining / 2) - 2;

        setStyle({
          paddingLeft: padding,
          paddingRight: padding,
        });
      }
    };

    getPadding();
    window.addEventListener("resize", getPadding);
    return () => {
      window.removeEventListener("resize", getPadding);
    };
  }, [element]);

  return style;
};
