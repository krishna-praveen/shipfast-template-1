import React from "react"

import { Subtitle } from "./Subtitle"

interface TitleCardProps {
  title: string
  children: React.ReactNode
}

export const TitleCard = ({ title, children }: TitleCardProps) => {
  return (
    <div className={"card bg-base-100 shadow-base-300 mt-6 w-full p-6 shadow-xl"}>
      < Subtitle styleClass="inline-block" >
        {title}

      </Subtitle >

      <div className="divider mt-2"></div>

      <div className='bg-base-100 h-full w-full pb-6'>
        {children}
      </div>
    </div >
  )
}
