import { memo } from "react";
const SvgComponent = (props: any) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10 18v-2h4v2h-4Zm-4-5v-2h12v2H6ZM3 8V6h18v2H3Z" fill="#5D888F" />
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
