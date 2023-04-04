import cn from "classnames"
import { isMobile } from "react-device-detect"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function CardForm(Props) {
	return (
		<>
			{Props?.data
				?.sort((a, b) => {
					return -a?.id + b?.id
				})
				.map((elem, index) => (
					<div
						key={index}
						id={elem.id}
						className={cn(
							"relative  bg-gradient-to-b from-transparent via-gray-50 to-gray-100 rounded-lg shadow hover:shadow-lg cursor-pointer border-t-4 border-gray-400 mb-2 ",
							Props?.selected === elem.id ? "border-" + process.env.color + "-600" : null,
						)}
					>
						{Props?.dropdown || Props?.update || Props?.onDelete ?
							<div className="absolute top-1 right-1">
								<Menu as="div" className="relative inline-block text-right">
									<div>
										<Menu.Button
											className={
												"rounded-full transition ease-in duration-200 p-1 hover:shadow hover:bg-" +
												process.env.color +
												"-100"
											}
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
												></path>
											</svg>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items
											className={
												"absolute z-20 right-0 lg:w-44 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
											}
										>
											{Props?.dropdown ? Props?.dropdown(elem) : null}

											<div>
												{Props.update ? (
													// Props.update
													<button
														type="button"
														className="w-full p-2 flex justify-end lg:justify-between items-center hover:text-opacity-100 text-blue-600 hover:text-blue-400 pt-2 focus:outline-none"
														onClick={async () =>
														{
															await Props.onUpdate(elem)
														}}
													>
														<div className="text-sm hidden lg:block">Modifier</div>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
															/>
														</svg>
													</button>
												) : null}
											</div>

											{Props.onDelete ? (
												// Props.onDelete
												<button
													type="button"
													className="w-full flex justify-end lg:justify-between items-center hover:text-opacity-100 text-red-600 hover:text-red-400 p-2 focus:outline-none"
													onClick={async () =>
													{
														await Props.onDelete(elem)
													}}
												>
													<div className="text-sm hidden lg:block">Supprimer</div>
													<svg
														className="w-5 h-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
														></path>
													</svg>
												</button>
											) : null}
										</Menu.Items>
									</Transition>
								</Menu>
							</div> : null}

						<div
							className="lg:flex w-32 lg:w-auto  p-2 truncate"
							onClick={async () => {
								if (Props.onSelect) {
									await Props.onSelect(elem)
								}
							}}
						>
							<img
								className="h-14 w-14 lg:h-16 lg:w-16 lg:mr-5 mx-auto lg:mx-0 rounded-full border-2 border-white border-opacity-75 shadow-lg"
								src={
									elem[Props.image]
										? process.env.NEXT_PUBLIC_SERVER + elem[Props.image]
										: "/noimage.jpg"
								}
								alt="profil"
							/>
							<div className="lg:w-1/2">
								<div className="font-semibold truncate my-2 text-center lg:text-left pr-2 text-xs  lg:text-sm">
									<span className="capitalize">{elem[Props.title]}</span>
								</div>
								<div className="text-center lg:text-justify ">
									<span className=" inline-block bg-gray-200 rounded-xl px-2 py-0.5 max-w-full lg:text-left text-3xs md:text-2xs lg:text-xs font-semibold text-gray-700 mb-2 shadow-inner">
										<p className="truncate">
											{elem[Props.description] ? elem[Props.description] : " . . . "}
										</p>
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			{/* Load button */}
			{isMobile ? (
				Props?.load ? (
					<button
						type="button"
						onClick={() => Props?.onLoad()}
						className="  cursor-pointer  text-purple-400 animate-pulse"
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
		</>
	)
}
