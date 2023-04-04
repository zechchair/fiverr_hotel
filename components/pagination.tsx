import cn from "classnames"
import { isMobile } from "react-device-detect"

export default function Pagination(Props) {
	if (Props.len == 1) {
		return null
	}
	return (
		<>
			{!isMobile ?
				<div className={cn("h-12 w-full flex justify-center mt-auto ")}>
					<div className="flex text-gray-700 print:hidden">
						<button
							type="button"
							className={
								"h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer transform hover:scale-105 hover:bg-" +
								process.env.color +
								"-100" +
								(Props.selected > 1 ? "" : " invisible")
							}
							onClick={async () =>
							{
								if (Props.selected > 1)
								{
									// Props.setSelected(Props.selected - 1);
									await Props.onChange(Props.selected - 1)
								}
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-chevron-left w-4 h-4"
							>
								<polyline points="15 18 9 12 15 6"></polyline>
							</svg>
						</button>
						<div className="flex h-8 font-medium rounded-full bg-gray-200">
							<div
								className={cn(
									Props.selected == 1
										? "bg-" + process.env.color + "-600 text-white transform hover:scale-105"
										: "transform hover:scale-105 hover:bg-" + process.env.color + "-100",
									"w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full",
								)}
								onClick={async () =>
								{
									// Props.setSelected(1);
									await Props.onChange(1)
								}}
							>
								1
							</div>
							{Props.selected != 2 ? (
								<div
									className={cn(
										Props.selected == 1 ? "" : "md:flex",
										"w-8 justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full",
									)}
								>
									...
								</div>
							) : null}
							<div
								className={cn(
									Props.selected != 1 && Props.selected != Props.len
										? "bg-" + process.env.color + "-600 text-white transform hover:scale-105 md:flex"
										: "",
									"w-8  justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full",
								)}
							>
								{Props.selected}
							</div>
							{Props.selected != Props.len - 1 ? (
								<div
									className={cn(
										Props.selected == Props.len ? "" : "md:flex",
										"w-8 justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full",
									)}
								>
									...
								</div>
							) : null}
							{Props.len != 1 ? (
								<div
									className={cn(
										Props.selected == Props.len
											? "bg-" + process.env.color + "-600 text-white transform hover:scale-105"
											: "transform hover:scale-105 hover:bg-" + process.env.color + "-100",
										"w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full",
									)}
									onClick={async () =>
									{
										// Props.setSelected(Props.len);
										await Props.onChange(Props.len)
									}}
								>
									{Props.len}
								</div>
							) : null}
						</div>
						<button
							type="button"
							className={
								"h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer transform hover:scale-105 hover:bg-" +
								process.env.color +
								"-100" +
								(Props.len > Props.selected ? "" : " invisible")
							}
							onClick={async () =>
							{
								if (Props.len > Props.selected)
								{
									// Props.setSelected(Props.selected + 1);
									await Props.onChange(Props.selected + 1)
								}
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={"feather feather-chevron-right w-4 h-4"}
							>
								<polyline points="9 18 15 12 9 6"></polyline>
							</svg>
						</button>
					</div>
				</div> : null}
		</>
	)
}
