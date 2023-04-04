import toDateString from "../variables/formatDate"

export default function Sheet(Props) {
	return (
		<>
			{Props.show ? (
				<div className=" relative overflow-x-hidden pb-4">
					{/* Button right */}
					{Props.btnRight ? (
						<button
							type="button"
							className="absolute top-32 right-0 text-blue-900 text-opacity-80 hover:text-opacity-100 transform hover:scale-105"
							onClick={Props.onClickRight}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					) : null}
					{/* Button right */}

					{/* Button left */}
					{Props.btnLeft ? (
						<button
							type="button"
							className="absolute top-32 left-0 text-blue-900 text-opacity-80 hover:text-opacity-100 transform hover:scale-105"
							onClick={Props.onClickLeft}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					) : null}
					{/* Button left */}

					{/* Dash */}
					<div className="bg-white sm:mx-2 lg:mx-5 shadow-md border md:rounded-xl">
						<div className="px-4 py-5 sm:px-6">
							<div className="flex justify-between">
								<h3
									className="text-lg leading-6 font-medium text-gray-900"
									// onClick={() => console.log(Props.data)}
								>
									{Props.title ? Props.title : "Informations"}
								</h3>
								<div className=" flex justify-center flex-row gap-4">
									{Object.keys(Props.cols)
										?.filter(item => Props.cols[item]?.function)
										?.map((col, index) => (
											<button key={index} onClick={() => Props.cols[col]?.function(Props.data)}>
												<div className="">{Props?.data[col]}</div>
											</button>
										))}
									{Props.onClose ? (
										<button
											type="button"
											className="bg-opacity-50 h-6 w-6 rounded-md p-1 inline-flex items-center justify-center text-gray-900 hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-200"
											onClick={Props.onClose}
										>
											<svg
												className="h-4 w-4 "
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
								</div>
							</div>
						</div>

						<div className="border-t border-purple-200 pb-5 md:rounded-b-xl">
							<dl>
								{Object.keys(Props.cols)
									?.filter(
										item => !Props.cols[item]?.function && !!Props.cols[item] && Props?.data[item],
									)
									?.map((col, index) => (
										<div
											className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
											key={index}
										>
											<dt className="text-sm font-medium text-gray-500">{Props.cols[col]?.name}</dt>
											{!Props?.cols[col]?.type ? (
												<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
													{Props?.data[col]}
												</dd>
											) : Props?.cols[col]?.type == "boolean" ? (
												Props?.data[col] ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-green-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M5 13l4 4L19 7"
														/>
													</svg>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-red-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												)
											) : Props?.cols[col]?.type == "date" ? (
												toDateString(Props?.data[col])
											) : Props?.cols[col]?.type == "loc" && !!Props?.data[col]?.lat ? (
												<button
													className="inline-flex max-w-min py-2 px-4 items-center rounded-lg font-semibold text-gray-700 gap-2 shadow-md bg-white  hover:bg-purple-100"
													onClick={e => {
														window.open(
															"https://www.google.com/maps/search/?api=1&query=" +
																Props?.data[col]?.lat +
																"," +
																Props?.data[col]?.log,
														)
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 animate-bounce text-green-600"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
														/>
													</svg>
													Itineraire
												</button>
											) : null}
										</div>
									))}
								{Props?.attachments?.filter(item => !!item.path).length ? (
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-sm font-medium text-gray-500">Pièces jointes</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
											<ul
												role="list"
												className="border border-gray-200 rounded-md divide-y divide-gray-200"
											>
												{Props?.attachments
													?.filter(item => !!item.path)
													.map((attachment, ind) => (
														<li
															className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
															key={ind}
														>
															<div className="w-0 flex-1 flex items-center">
																{/* <!-- Heroicon name: solid/paper-clip --> */}
																<svg
																	className="flex-shrink-0 h-5 w-5 text-gray-400"
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																	aria-hidden="true"
																>
																	<path
																		fillRule="evenodd"
																		d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
																		clipRule="evenodd"
																	/>
																</svg>
																<span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
															</div>

															<button
																type="button"
																className="ml-4 flex-shrink-0"
																onClick={() => {
																	window.open(process.env.NEXT_PUBLIC_SERVER + attachment.path)
																}}
															>
																<a
																	// href="#"
																	className="font-medium text-purple-600 hover:text-purple-500"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		className="h-6 w-6"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor"
																		strokeWidth="2"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
																		/>
																	</svg>
																</a>
															</button>
														</li>
													))}
											</ul>
										</dd>
									</div>
								) : null}
							</dl>
						</div>
					</div>
					{/* Dash */}
				</div>
			) : null}
		</>
	)
}
