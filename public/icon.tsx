import * as React from "react"

export const Icon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={170}
      height={332}
      viewBox="0 0 170 332"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M131.189 4.3c13.644 8.389 17.904 26.25 9.515 39.893l-59.83 97.311H140.5a28.999 28.999 0 0124.784 44.058l-80.5 132.5c-8.316 13.688-26.154 18.043-39.842 9.726-13.688-8.316-18.043-26.154-9.726-39.842l53.732-88.442H29a29 29 0 01-24.704-44.189l87-141.5C99.685.171 117.545-4.089 131.189 4.3z"
        fill="url(#paint0_linear_1103_2444)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1103_2444"
          x1={154.5}
          y1={-2.99591}
          x2={65}
          y2={389.504}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.180192} stopColor="#D124D1" />
          <stop offset={1} stopColor="#EA4566" />
        </linearGradient>
      </defs>
    </svg>
  )
}
