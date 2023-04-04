import cn from "classnames"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { isMobile } from "react-device-detect"

export default function sidebar(Props) {
	const router = useRouter()
	const { data: session } = useSession()
	const user: any = session?.user
	return (
		<>
			{session ? (
				<>
					{!Props.sidebar ? (
						<button
							type="button"
							className={cn(
								"bg-gray-700 fixed top-16 left-0 z-20 text-white bg-opacity-40 hover:bg-opacity-80 p-2 w-9 ml-4 rounded-full md:hidden print:hidden",
							)}
							onClick={() => {
								Props.setSidebar(!Props.sidebar)
							}}
						>
							<div className="relative">
								<span className="absolute border border-gray-100 rounded-full h-5 w-5 top-0 left-0 animate-ping">
									<span></span>
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</div>
						</button>
					) : null}

					<div
						className={cn(
							"text-sm  text-bold z-20 fixed pt-16 flex flex-col md:bg-gradient-to-r print:hidden md:from-white md:to-",
							process.env.color,
							"-50 md:border-r h-full",
							Props.sidebar ? "w-screen md:w-1/6 bg-" + process.env.color + "-50" : "md:w-16",
							"print:hidden",
						)}
					>
						{Props.sidebar ? (
							<button
								type="button"
								className={cn(
									"bg-gray-700 text-white bg-opacity-40 hover:bg-opacity-80 p-2 w-9 ml-4 rounded-full md:hidden",
								)}
								onClick={() => {
									Props.setSidebar(!Props.sidebar)
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
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						) : null}
						<div className="overflow-y-auto overflow-x-hidden">
							<button
								type="button"
								className={cn(
									"bg-gray-700 bg-opacity-40 hover:bg-opacity-80 rounded p-1 ml-4 mt-4 md:block hidden",
								)}
								onClick={() => {
									Props.setSidebar(!Props.sidebar)
								}}
							>
								{Props.sidebar ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-gray-100"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 17l-5-5m0 0l5-5m-5 5h12"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-gray-100"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								)}
							</button>

							<ul
								className={cn(
									"flex flex-col py-4 space-y-1 ",
									Props.sidebar ? "" : "md:block hidden z-40",
								)}
							>
								<li>
									<button
										type="button"
										className={cn(
											"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
											process.env.color +
											"-50",
											"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
											window.location.pathname == "/"
												? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
												: null,
										)}
										onClick={() => {
											router.push("/")
											// SOLUTION
											if (isMobile) {
												Props.setSidebar(false)
											}
											// SOLUTION
										}}
									>
										<span className="inline-flex justify-center items-center ml-4">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
												/>
											</svg>
										</span>
										<span
											className={cn("ml-2  tracking-wide truncate", Props.sidebar ? "" : "hidden")}
										>
											Accueil
										</span>
									</button>
									{/* </Link> */}
								</li>

								{/* pharmacie */}

								{["appareil", "pharmacie", "paraMedical"].includes(user?.role) ? (
									<>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/medicApp/medicAppQr"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/medicApp/medicAppQr")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-5 h-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Scanner Qr code
												</span>
											</button>
											{/* </Link> */}
										</li>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/medicApp/invoices" ||
														window.location.pathname == "/medicApp/upsertInvoice"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/medicApp/invoices")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Factures
												</span>
											</button>
											{/* </Link> */}
										</li>
									</>
								) : null}

								{/* labo */}

								{["labo", "radiology"].includes(user?.role) ? (
									<>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/labo/laboQr"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/labo/laboQr")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-5 h-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Scanner Qr code
												</span>
											</button>
											{/* </Link> */}
										</li>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/labo/laboDash"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/labo/laboDash")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Suivi
												</span>
											</button>
											{/* </Link> */}
										</li>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/labo/invoices" ||
														window.location.pathname == "/labo/upsertInvoice"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/labo/invoices")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Factures
												</span>
											</button>
											{/* </Link> */}
										</li>
									</>
								) : null}

								{/* medecin doctor */}

								{user?.role == "medecin" ? (
									<li>
										{/* <Link href={linkDash}> */}
										<button
											type="button"
											className={cn(
												"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
												process.env.color +
												"-50",
												"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
												window.location.pathname == "/doctor/doctor"
													? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
													: null,
											)}
											onClick={() => {
												router.push("/doctor/doctor")
												if (isMobile) {
													Props.setSidebar(false)
												}
											}}
										>
											<span className="inline-flex justify-center items-center ml-4">
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
														d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</span>
											<span
												className={cn(
													"ml-2  tracking-wide truncate",
													Props.sidebar ? "" : "hidden",
												)}
											>
												Rendez-vous
											</span>
										</button>
										{/* </Link> */}
									</li>
								) : null}

								{/* aux 2 */}

								{user?.role == "aux2" ? (
									<>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/aux2/aux2RV"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/aux2/aux2RV")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Rendez-vous
												</span>
											</button>
											{/* </Link> */}
										</li>

										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/aux2/visiteJ"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/aux2/visiteJ")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Visites quotidiennes
												</span>
											</button>
											{/* </Link> */}
										</li>

										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/aux2/demandeProvince"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/aux2/demandeProvince")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Demandes province
												</span>
											</button>
											{/* </Link> */}
										</li>

										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/doctor/doctor"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/doctor/doctor")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Medecin
												</span>
											</button>
											{/* </Link> */}
										</li>
									</>
								) : null}

								{/* AUX2 & ADMIN ONLY */}

								{["admin", "aux2"].includes(user?.role) ? (
									<>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/invoices" ||
														window.location.pathname == "/initialData/upsertInvoice"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/invoices")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Factures
												</span>
											</button>

											{/* </Link> */}
										</li>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/staff"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/staff")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Partenaires
												</span>
											</button>
											{/* </Link> */}
										</li>

										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/beneficiaire"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/beneficiaire")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														className="w-5 h-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
														></path>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Bénéficaires
												</span>
											</button>
										</li>

										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/analyse"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/analyse")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? null : "hidden",
													)}
												>
													Analyses
												</span>
											</button>
										</li>

										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/medicApp"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/medicApp")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Medicaments / appareils
												</span>
											</button>
										</li>
										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/account"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/account")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														stroke-width="2"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Comptes bancaires
												</span>
											</button>
										</li>
										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/commune"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/commune")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Commune
												</span>
											</button>
										</li>
										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/initialData/association"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/initialData/association")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Associations
												</span>
											</button>
										</li>
									</>
								) : null}

								{/* aux2  */}

								{/* aux1 */}

								{["aux1", "addicted"].includes(user?.role) ? (
									<>
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/aux1/aux1RV"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/aux1/aux1RV")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Rendez-Vous
												</span>
											</button>

											{/* </Link> */}
										</li>

										{user?.role == "aux1" ? (
											<>
												<li>
													{/* <Link href={linkDash}> */}
													<button
														type="button"
														className={cn(
															"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
															process.env.color +
															"-50",
															"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
															window.location.pathname == "/aux1/visiteJ"
																? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
																: null,
														)}
														onClick={() => {
															router.push("/aux1/visiteJ")
															if (isMobile) {
																Props.setSidebar(false)
															}
														}}
													>
														<span className="inline-flex justify-center items-center ml-4">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
																/>
															</svg>
														</span>
														<span
															className={cn(
																"ml-2  tracking-wide truncate",
																Props.sidebar ? "" : "hidden",
															)}
														>
															visites quotidiennes
														</span>
													</button>

													{/* </Link> */}
												</li>

												<li>
													{/* <Link href={linkDash}> */}
													<button
														type="button"
														className={cn(
															"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
															process.env.color +
															"-50",
															"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
															window.location.pathname == "/aux1/peopleDetails"
																? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
																: null,
														)}
														onClick={() => {
															router.push("/aux1/peopleDetails")
															if (isMobile) {
																Props.setSidebar(false)
															}
														}}
													>
														<span className="inline-flex justify-center items-center ml-4">
															<svg
																className="w-5 h-5"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
																></path>
															</svg>
														</span>
														<span
															className={cn(
																"ml-2  tracking-wide truncate",
																Props.sidebar ? "" : "hidden",
															)}
														>
															Bénéficaires
														</span>
													</button>

													{/* </Link> */}
												</li>
											</>
										) : null}
										<li>
											{/* <Link href={linkDash}> */}
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/aux1/partenaires"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/aux1/partenaires")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
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
															d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
														></path>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Partenaires
												</span>
											</button>

											{/* </Link> */}
										</li>
									</>
								) : null}

								{user?.role == "das" ? (
									<>
										<li>
											<button
												type="button"
												className={cn(
													"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
													process.env.color +
													"-50",
													"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
													window.location.pathname == "/das/beneficiaire"
														? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
														: null,
												)}
												onClick={() => {
													router.push("/das/beneficiaire")
													if (isMobile) {
														Props.setSidebar(false)
													}
												}}
											>
												<span className="inline-flex justify-center items-center ml-4">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
														/>
													</svg>
												</span>
												<span
													className={cn(
														"ml-2  tracking-wide truncate",
														Props.sidebar ? "" : "hidden",
													)}
												>
													Prise en charge
												</span>
											</button>
										</li>
									</>
								) : null}

								{["admin", "aux1", "aux2", "aux3", "medecin", "das"].includes(user?.role) ? (
									<li>
										{/* <Link href={linkDash}> */}
										<button
											type="button"
											className={cn(
												"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
												process.env.color +
												"-50",
												"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
												window.location.pathname == "/payment"
													? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
													: null,
											)}
											onClick={() => {
												router.push("/payment")
												if (isMobile) {
													Props.setSidebar(false)
												}
											}}
										>
											<span className="inline-flex justify-center items-center ml-4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													stroke-width="2"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</span>
											<span
												className={cn(
													"ml-2  tracking-wide truncate",
													Props.sidebar ? "" : "hidden",
												)}
											>
												Paiement
											</span>
										</button>
										{/* </Link> */}
									</li>
								) : null}

								{["admin"].includes(user?.role) ? (
									<li>
										{/* <Link href={linkDash}> */}
										<button
											type="button"
											className={cn(
												"w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-" +
												process.env.color +
												"-50",
												"text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
												window.location.pathname == "/payment"
													? "bg-" + process.env.color + "-50 text-red-800 border-red-500"
													: null,
											)}
											onClick={() => {
												router.push("/payment")
												if (isMobile) {
													Props.setSidebar(false)
												}
											}}
										>
											<span className="inline-flex justify-center items-center ml-4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													stroke-width="2"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</span>
											<span
												className={cn(
													"ml-2  tracking-wide truncate",
													Props.sidebar ? "" : "hidden",
												)}
											>
												Paiement
											</span>
										</button>
										{/* </Link> */}
									</li>
								) : null}

								<li>
									<button
										className="mt-8 relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-red-300 border-l-4 border-transparent pr-6"
										onClick={() => signOut({ callbackUrl: "/" })}
									>
										<span className="inline-flex justify-center items-center ml-4 text-red-900">
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
												></path>
											</svg>
										</span>
										<span
											className={cn(
												"ml-2  tracking-wide truncate",
												Props.sidebar ? null : "hidden",
											)}
										>
											Déconnexion
										</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</>
			) : null}
		</>
	)
}
