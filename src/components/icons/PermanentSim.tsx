import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const PermanentSim = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={390}
    height={205}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <rect width={390} height={205} rx={15} fill="url(#a)" />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 102.5 -195 0 195 102.5)"
      >
        <stop stopColor="#093340" stopOpacity={0.84} />
        <stop offset={1} stopColor="#093340" />
      </radialGradient>
    </defs>
  </svg>
);

const ForwardRef = forwardRef(PermanentSim);
const Memo = memo(ForwardRef);
export default Memo;
