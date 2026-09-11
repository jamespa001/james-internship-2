// book colors
export const bookColorMap: Record<string, string> = {};
bookColorMap["6ncszvwbl4e"] = "#A5C8E3";
bookColorMap["hyqzkhdyq7h"] = "#6C4273";
bookColorMap["vt4i7lvosz"] = "#FBD662";
bookColorMap["g80xtszllo9"] = "#E0C355";
bookColorMap["6ctat6ynzqp"] = "#ACA49B";
bookColorMap["5bxl50cz4bt"] = "#CD1A1F";
bookColorMap["2l0idxm1rvw"] = "#B48B31";
bookColorMap["4t0amyb4upc"] = "#BFAC42";
bookColorMap["g2tdej27d23"] = "#EAC394";
bookColorMap["18tro3gle2p"] = "#F9C933";

export const DEFAULT_ARCH_COLOR = "#e3b873";

// Function: getBookArchColor
export function getBookArchColor(id: string): string {
  return bookColorMap[id] || DEFAULT_ARCH_COLOR;
}
