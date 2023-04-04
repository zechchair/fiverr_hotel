import { isMobile } from "react-device-detect";

export default function CardHorizontal(props) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 mx-2 pb-10 sm:mx-0">
			{props.data.map(item => (
				<div
					className=" py-4 pl-5 pr-2   shadow-md rounded-lg my-10 bg-gradient-to-b from-white via-gray-50 to-gray-100 "
					key={item}
					onClick={() => {
						if (props.onClick) {
							props.onClick()
						}
					}}
				>
					<div className="flex justify-center md:justify-end -mt-12">
						<img
							className="w-16 h-16 object-cover rounded-full border-2 border-purple-500"
							src={
								item[props.image]
									? process.env.NEXT_PUBLIC_SERVER + item[props.image]
									: "/noimage.jpg"
							}
						/>
					</div>
					<div className="flex flex-col h-full pb-1">
						<div className="flex-grow">
							<h2 className="text-gray-800 md:text-base mt-2 truncate text-sm font-semibold">
								{item[props.title]}
							</h2>
							<p className=" text-gray-600 md:text-sm  truncate text-xs">
								{item[props.description]}
							</p>
						</div>
						{props.children}
						<div className="justify-end	 self-end">
							<span className="md:text-sm text-xs font-semibold pr-2 text-purple-500">
								{item[props.bottom]}
							</span>
						</div>
					</div>
				</div>
			))}
			{isMobile ? (
				props.load ? (
					<button
						type="button"
						className="flex justify-center items-center col-span-2 text-purple-400 -mt-5 animate-pulse"
						onClick={() => props.onLoad()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10 "
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				) : null
			) : null}
		</div>
	)
}
