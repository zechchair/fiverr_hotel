import React from "react"

export default function CardForForm(props) {
	return (
		<div className={"relative  " + props?.className}>
			<div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-200 shadow-lg rounded-3xl"></div>
			<div className="relative  bg-white dark:bg-black shadow rounded-3xl ">
				{props.children}
			</div>
		</div>
	)
}
