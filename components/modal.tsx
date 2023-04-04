import cn from "classnames"

export default function Modal(Props) {
	if (!Props.show) {
		return null
	}
	return (
		<div
			className="fixed flex justify-center items-center bg-black bg-opacity-70 inset-0 z-50"
			// onClick={Props.onClose}
		>
			<div className="py-10 max-h-screen w-full px-2 overflow-y-auto">
			<div
				className={cn(
					"bg-white w-full shadow-lg rounded mx-auto",
					// default value of size is lg
					Props.size != "md" && Props.size != "sm" ? "sm:w-11/12" : null,
					Props.size == "md" ? "sm:w-2/3" : null,
					Props.size == "sm" ? "sm:w-1/2" : null,
					Props?.className,
				)}
				onClick={e => e.stopPropagation()}
			>
				{/* HEADER */}
				<div
					className={
						"flex justify-between p-2 bg-gradient-to-r from-" +
						process.env.secondColor +
						"-600 to-" +
						process.env.secondColor +
						"-200 rounded-t"
					}
				>
					<div className="text-white md:text-2xl text-lg font-semibold">{Props.title}</div>
					<button
						type="button"
						className={
							"bg-" +
							process.env.secondColor +
							"-50 bg-opacity-500 h-6 w-6 rounded-md p-1 inline-flex items-center justify-center text-red-800 hover:text-" +
							process.env.secondColor +
							"-500 hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-900  "
						}
						onClick={Props.onClose}
					>
						<svg
							className="h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				{/* HEADER */}

				{/* BODY */}
				{Props.children}
				{/* BODY */}
			</div>
			</div>
		</div>
	)
}
