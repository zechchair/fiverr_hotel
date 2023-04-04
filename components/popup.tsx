import cn from "classnames"
interface PopUpInterface {
	show: boolean
	loader?: boolean
	close?: boolean
	type?: "info" | "success" | "danger" | "warning" | any
	onClose: React.MouseEventHandler
	children?: JSX.Element | any
}
export type { PopUpInterface }

export default function PopUp(Props: PopUpInterface) {
	if (!Props.show) {
		return null
	}
	
	// if Props.loader is true affiche only design for Props.loader
	return (
		<div
			className={cn(
				"fixed flex justify-center items-center  bg-opacity-40 inset-0 z-50",
				"bg-black",
			)}
			onClick={!Props.loader ? Props.onClose : null}
		>
			<div
				className={cn("w-72 sm:w-96  rounded", !Props.loader ? "shadow-md" : "")}
				onClick={e => e.stopPropagation()}
			>
				<div
					className={cn(
						"relative grid grid-cols-3 rounded px-4 py-6 ",
						Props.type == "danger" && !Props.loader ? "bg-red-100" : null,
						Props.type == "warning" && !Props.loader ? "bg-yellow-100" : null,
						Props.type == "info" && !Props.loader ? "bg-blue-100" : null,
						Props.type == "success" && !Props.loader ? "bg-green-100" : null,
						Props.loader ? "bg-transparent " : null,
					)}
				>
					{Props.close ? (
						<button
							type="button"
							autoFocus
							className="absolute top-2 right-2 bg-opacity-50 h-6 w-6 rounded-md p-1 inline-flex items-center justify-center text-gray-900 hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-200"
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
					) : null}
					<div className="flex justify-center items-center">
						{Props.type == "danger" && !Props.loader ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10 text-red-700 animate-pulse"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						) : null}
						{Props.type == "warning" && !Props.loader ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10 text-yellow-700 animate-pulse"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : null}
						{Props.type == "info" && !Props.loader ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10 text-blue-700 animate-pulse"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : null}
						{Props.type == "success" && !Props.loader ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10 text-green-700 animate-pulse"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : null}

						{/* {Props.loader ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 animate-spin"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
						) : null} */}
					</div>
					{/* if not laoder */}
					{!Props.loader ? (
						<div className="col-span-2 p-1 text-gray-700 font-semibold flex items-center">
							{Props.children}
						</div>
					) : null}
					{/* if not generic message */}
					{Props.loader ? (
						// <div className="col-span-2 p-1 text-gray-700 font-semibold">Veuillez patienter...</div>
						<div className="inline-flex space-x-4 justify-center items-center ">
							<div
								className="bg-purple-600 p-2  w-4 h-4 rounded-full  green-circle shadow-lg "
								style={{ animation: "bounce 0.45s infinite" }}
							></div>
							<div
								className="bg-white   p-2 w-4 h-4 rounded-full  white-circle shadow-lg "
								style={{ animation: "bounce 0.55s infinite" }}
							></div>
							<div
								className="bg-blue-600 p-2 w-4  h-4 rounded-full  red-circle shadow-lg "
								style={{ animation: "bounce 0.5s infinite" }}
							></div>
							{/* <div className="loading-container ">
								<div className="circle"></div>
								<div className="circle"></div>
							</div> */}
							{/* <svg
								className="polys overflow-hidden"
								width="380px"
								height="500px"
								viewBox="0 0 837 1045"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<path
										d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
										id="Polygon-1"
										stroke="#007FB2"
										strokeWidth="6"
									></path>
									<path
										d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
										id="Polygon-2"
										stroke="#EF4A5B"
										strokeWidth="6"
									></path>
									<path
										d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
										id="Polygon-3"
										stroke="#795D9C"
										strokeWidth="6"
									></path>
									<path
										d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
										id="Polygon-4"
										stroke="#F2773F"
										strokeWidth="6"
									></path>
									<path
										d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
										id="Polygon-5"
										stroke="#36B455"
										strokeWidth="6"
									></path>
								</g>
							</svg> */}
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
