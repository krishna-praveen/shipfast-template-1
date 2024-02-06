import * as React from "react"

export const HighlightBackground = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={399}
      height={65}
      viewBox="0 0 399 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 63.5L1 15 398 1l-10 51L7.5 63.5z"
        fill="#E53F7D"
        stroke="#000"
      />
    </svg>
  )
}
