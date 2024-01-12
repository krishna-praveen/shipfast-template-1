"use client"

import React from "react"

interface CardStatsProps {
	title: string
	icon: React.ReactNode
	value: string
	description: string
	colorIndex: number
}

export const CardStats = ({ title, icon, value, description, colorIndex }: CardStatsProps) => {
	const COLORS = ["secondary", "secondary"]

	const getDescStyle = () => {
		if (description.includes("↗︎")) return "font-bold text-green-700 text-green-300"
		else if (description.includes("↙")) return "font-bold text-rose-500 text-red-400"
		else return ""
	}

	return (
		<div className="stats stats-horizontal shadow-xl">
			<div className="stat">
				<div className={`text- stat-figure text-slate-300${COLORS[colorIndex % 2]}`}>{icon}</div>
				<div className="stat-title text-slate-300">{title}</div>
				<div className={`text- stat-value text-slate-300${COLORS[colorIndex % 2]}`}>{value}</div>
				<div className={"stat-desc  " + getDescStyle()}>{description}</div>
			</div>
		</div>
	)
}
