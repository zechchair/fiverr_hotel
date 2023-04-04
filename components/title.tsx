export default function Title(Props) {
	return (
		<div className="flex items-center print:hidden">
				<svg className="svgNone" xmlns="http://www.w3.org/2000/svg">
					<filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
						<feGaussianBlur color="red" stdDeviation="100 0"></feGaussianBlur>
					</filter>
				</svg>
			
			<div
				className={
					"title  ml-3 md:text-xl lg:text-2xl align-middle  text-gray-700"
				}
				filter-content={"S"}
			>
				{Props.children}
			</div>
		</div>
	)
}
