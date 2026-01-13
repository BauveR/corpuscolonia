import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export const L1 = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70 267"
    {...props} // ← esto aplica className y cualquier otro prop que le pases
  >
    <path
      fill="#f17313"
      d="M42.9,249.6v-92.3c0-4.2-0.4-7.1-1.3-8.8c-0.9-1.7-2.5-2.5-5-2.5h-10v103.5H3.4V17.3h33.2
          c10.6,0,18.3,2.3,22.9,7c4.6,4.6,7,13.7,7,27.2v44.5c0,21.7-5.3,34.4-15.9,38.2c10.6,3.5,15.9,15.8,15.9,36.8v78.6H42.9z
          M36.6,120.8c2.4,0,4.1-0.8,5-2.5c0.9-1.7,1.3-4.7,1.3-9.1V48.5c0-4.2-0.4-7.1-1.3-8.8c-0.9-1.7-2.5-2.5-5-2.5h-10v83.6H36.6z"
    />
  </svg>
);
