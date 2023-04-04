import { isMobile } from "react-device-detect"
import { Popover } from "@headlessui/react"

export default function Card(Props) {
	return (
		<div>
			<div className="grid grid-rows-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-0  mx-2 ">
				{/* <!--Card opti--> */}
				{Props?.data
					?.sort((a, b) => {
						return -a?.id + b?.id
					})
					?.map((elem, index) => (
						<Popover
							className="relative flex flex-col justify-between bg-gradient-to-b from-transparent via-gray-50 to-gray-100 rounded shadow-md "
							key={index}
							// onClick={async () => {
							// 	if (Props.onSelect) {
							// 		await Props.onSelect(elem)
							// 	}
							// }}
						>
							<div className="absolute top-0  left-0 flex flex-col m-2 gap-2">
								{Props.danger ? (
									Props.danger(elem) ? (
										<div className="text-red-500 rounded-br-xl ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 animate-pulse"
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
										</div>
									) : null
								) : null}
								{Props.warning ? (
									Props.warning(elem) ? (
										<div className="text-yellow-500 rounded-br-xl ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 animate-pulse"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
												/>
											</svg>
										</div>
									) : null
								) : null}
								{Props.success ? (
									Props.success(elem) ? (
										<div className="text-green-500 rounded-br-xl ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 animate-pulse"
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
										</div>
									) : null
								) : null}
								{Props.info ? (
									Props.info(elem) ? (
										<Popover.Button>
											<div className="text-blue-500  rounded-br-xl">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 animate-pulse"
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
											</div>
										</Popover.Button>
									) : null
								) : null}

								{Props.print ? (
									<button
										type="button"
										className="text-blue-600 hover:text-blue-300"
										onClick={() => {
											Props.onPrint(elem)
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
											/>
										</svg>
									</button>
								) : null}
							</div>
							{Props.onDelete ? (
								<div className="absolute top-0 right-0 md:top-1 md:right-1">
									<button
										type="button"
										className="text-red-600 hover:text-red-500 px-2 pt-2"
										onClick={() => {
											Props.onDelete(elem)
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
							) : null}
							<img
								className={
									"mx-auto mt-2 sm:mt-4 sm:mb-2 h-20 w-20 rounded-full border-2 border-" +
									process.env.secondColor +
									"-600 border-opacity-75 shadow-lg"
								}
								src={
									elem[Props.image]
										? process.env.NEXT_PUBLIC_SERVER + elem[Props.image]
										: "/noimage.jpg"
								}
								alt="profil"
							/>

							<div className="font-semibold sm:text-sm text-2xs text-center py-0.5 sm:mb-2">
								<span className="capitalize">{elem[Props.title]}</span>
							</div>
							<div className="space-x-2">
								<div className="text-center text-2xs sm:text-xs">
									<span className="inline-block bg-gray-200 rounded-xl px-2 py-0.5 font-semibold text-gray-700 mb-2 shadow-inner">
										{elem[Props.description] ? elem[Props.description] : ". . ."}
									</span>
								</div>
							</div>
							<div className="space-x-2 flex-grow text-3xs hidden hover:block">
								{elem[Props.labels]?.map(item => (
									<div key={item} className="text-center px-3 py-1 bg-gray-100">
										<span className="inline-block bg-gray-200 rounded-xl px-2 py-0.5 font-semibold text-gray-700 mb-2 shadow-inner">
											{item}
										</span>
									</div>
								))}
							</div>
							{Props.first ? (
								<div className="flex  flex-row space-x-1 m-1 text-xs md:text-sm">
									<div className={Props.second ? "w-1/2 " : "w-full "}>
										<button
											type="button"
											className="flex rounded-full justify-center items-center w-full bg-gradient-to-b from-indigo-300 to-indigo-500 text-white px-2 py-1 hover:shadow-lg"
											onClick={async () => {
												await Props.onFirst(elem)
											}}
										>
											<span>Modifier</span>
										</button>
									</div>
									{Props.second ? (
										<div className={"w-1/2 "}>
											<button
												type="button"
												className="flex rounded-full justify-center items-center w-full bg-gradient-to-b from-blue-300 to-blue-500 text-white px-2 py-1 hover:shadow-lg"
												onClick={async () => {
													await Props.onSecond(elem)
												}}
											>
												<span>{Props.second}</span>
											</button>
										</div>
									) : null}
								</div>
							) : null}
							{/* info content */}
							<Popover.Panel className="absolute z-10 top-2 left-2">
								<div className="bg-white shadow w-52 space-y-2 rounded">
									<div className="inline-flex space-x-2 font-semibold  p-1 bg-gradient-to-l from-red-gray-50">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
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
										<span>Informations</span>
									</div>
									<div className="px-4 pb-4"> {Props.info ? Props.info(elem) : null}</div>
								</div>
							</Popover.Panel>
							{/* info content */}
						</Popover>
					))}

				{/* <!--Card opti--> */}

				{/* Load button */}
				{isMobile ? (
					Props.load ? (
						<button
							type="button"
							className="flex justify-center items-center col-span-2 text-purple-400 animate-pulse"
							onClick={() => Props.onLoad()}
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
				{/* Load button */}
			</div>
		</div>
	)
}
