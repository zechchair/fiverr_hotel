import cn from "classnames"
import React from "react"

export default function Button(Props) {
	const [coords, setCoords] = React.useState({ x: -1, y: -1 })
	const [isRippling, setIsRippling] = React.useState(false)

	React.useEffect(() => {
		if (coords.x !== -1 && coords.y !== -1) {
			setIsRippling(true)
			setTimeout(() => setIsRippling(false), 300)
		} else setIsRippling(false)
	}, [coords])

	React.useEffect(() => {
		if (!isRippling) setCoords({ x: -1, y: -1 })
	}, [isRippling])
	return (
		<>
			<button
				className={cn(
					"rippleButton h-full",
					"py-2",
					!Props.disabled ? "hover:shadow-lg" : "",
					Props.className,
					Props.pill ? `rounded-full px-4` : `rounded-xl px-3`,

					!Props.disabled
						? Props.color1 != "white" && Props.color1 != "black"
							? "text-white bg-gradient-to-r from-" + Props.color1 + " to-" + Props.color2
							: ""
						: "bg-gray-200 text-white",
					Props.color1 == "black" ? "text-white bg-black" : "",
					Props.color1 == "white" ? "text-black bg-white" : "",
				)}
				disabled={Props.disabled}
				style={Props.style}
				type={Props.type ? Props.type : "button"}
				id={Props.id}
				onClick={e => {
					const rect = e.currentTarget.getBoundingClientRect()
					setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
					Props.onClick && Props.onClick(e)
				}}
			>
				{isRippling ? (
					<span
						className="ripple"
						style={{
							left: coords.x,
							top: coords.y,
						}}
					/>
				) : (
					""
				)}
				<span className={cn("content", "font-semibold")}>{Props.children}</span>
			</button>
		</>
	)
}
