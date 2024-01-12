import React from "react"

import { Subtitle } from "./Subtitle"

interface TitleCardProps {
  title: string
  children: React.ReactNode
}

export const TitleCard = ({ title, children }: TitleCardProps) => {
  return (
    <div className={"card mt-6 w-full bg-base-100 p-6 shadow-xl shadow-base-300"}>
      < Subtitle styleClass="inline-block" >
        {title}

      </Subtitle >

      <div className="divider mt-2"></div>

      <div className='h-full w-full bg-base-100 pb-6'>
        {children}
      </div>
    </div >
  )
}
