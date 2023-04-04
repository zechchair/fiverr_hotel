import React from "react"

export default function CardBgGrad(props) {
	return (
		<div className={"relative " + props.className}>
			<div
				className={
					"absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-200 shadow-lg dark:shadow-lg-dark transform -skew-y-0 " +
					(props?.rotate ? props?.rotate : "-rotate-6") +
					"  rounded-3xl"
				}
			></div>
			<div className="relative  dark:bg-black shadow-lg rounded-3xl px-4 bg-white">
				{props.children}
			</div>
		</div>
	)
}
