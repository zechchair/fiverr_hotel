// ! docs
{
	/* 
props:{
  label:string(label of the input),
  children:HTML(if input value changes)
  dataList: array to show as dataList
  dataprint : key of elem to show in dataList
  list: array of labels to show under the input
  listPrint: which key to show in those labels
  onAdd: function ( if button add clicked and elem exists in datalist)
    onNew: function ( if button add clicked and elem doesn't exist in datalist)
  onSearch : function (what happens if button search clicked)
  onUpdate: function what happens if label is clicked (give the clicked elem)
  onDelete: function what happens if icon X is clicked
}
*/
}
import { Transition, Combobox } from "@headlessui/react"
import { useState, Fragment } from "react"

export default function SearchElem(Props) {
	const [query, setQuery] = useState(undefined)
	const [old, setOld] = useState(undefined)
	return (
		<div className={"w-full " + Props.className}>
			{Props.label ? <div className="md:text-base text-sm ml-px">{Props.label} :</div> : null}
			<div className="flex flex-row items-center mb-1 ">
				<div className="flex-grow  ">
					<Combobox
						value={
							Props.justOne ? (Props?.list ? Props?.list[Props.dataPrint] : undefined) : undefined
						}
						// className="rounded-full"
						onChange={async e => {
							const matchFromData = Props?.dataList?.find((a: any) => a[Props.dataPrint] == e)
							if (matchFromData) {
								Props?.onAdd(matchFromData)
							}
							setQuery(undefined)
						}}
					>
						<div className="  relative">
							<div className="focus:outline-none   focus:ring-1 focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md  w-full cursor-default overflow-hidden  text-left  sm:text-sm">
								<Combobox.Input
									className="w-full p-1.5 pl-3 pr-10 text-sm leading-5 text-gray-900   outline-none "
									onChange={event => {
										setQuery(event.target.value)
										const queryProv = event.target.value
										const minCarac = Props?.minCarac ? Props?.minCarac : 1
										if (queryProv?.length == minCarac && queryProv != old) {
											setOld(queryProv)
											Props.onSearch(queryProv)
										}
									}}
								/>
								<Combobox.Button className="absolute z-0 inset-y-0 right-0 flex items-center pr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-purple-800  animate-bounce"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
										/>
									</svg>
								</Combobox.Button>
							</div>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								afterLeave={() => setQuery(undefined)}
							>
								<Combobox.Options className="focus:outline-none mx-auto md:mx-3   border-b border-l border-r shadow-md border-gray-300  absolute z-10 bg-white text-black font-bold  max-h-36 w-full overflow-y-auto rounded-b-xl   py-1 text-2xs xs:text-xs sm:text-xs md:text-sm ">
									{!Props?.dataList?.filter(item =>
										item[Props.dataPrint]
											?.toUpperCase()
											.includes(query ? query?.toUpperCase() : ""),
									).length ? (
										Props.onNew && query ? (
											<button
												type="button"
												className={"w-full flex justify-center text-" + process.env.color + "-500"}
												onClick={e => {
													// if (Props.onNew) {
													Props.onNew(query)
													// }
													setQuery(undefined)
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-8 w-8"
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
										) : (
											<div className=" flex items-center gap-2 cursor-default select-none py-2 px-4 ">
												<span className="text-red-900">Ooops, aucun resultat trouvé</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 text-red-500 font-bold"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													stroke-width="2"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
										)
									) : (
										Props?.dataList
											?.filter(item =>
												item[Props.dataPrint]
													?.toUpperCase()
													.includes(query ? query?.toUpperCase() : ""),
											)
											?.map(lbl => (
												<Combobox.Option
													key={lbl}
													value={lbl[Props.dataPrint]}
													className={
														" my-0.5  px-3 font-semibold  hover:bg-purple-600 hover:text-gray-50 "
													}
												>
													{({ selected, active }) => (
														<div
															className={"inline-flex py-1.5 items-center relative gap-2 w-full "+(
																selected
																	? "font-extra  text-purple-800 hover:text-white"
																	: "font-semibold"
															)}
														>
															{selected ? (
																<span
																	className={` ${active ? "text-purple-800 " : "text-gray-600"}`}
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		className="h-4 w-4 text-purple-900"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor"
																		stroke-width="2"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			d="M5 13l4 4L19 7"
																		/>
																	</svg>
																</span>
															) : null}
															<span>{lbl[Props.listPrint]}</span>
														</div>
													)}
												</Combobox.Option>
											))
									)}
								</Combobox.Options>
							</Transition>
						</div>
					</Combobox>
				</div>

				<div className="flex-shrink pr-2">{Props.children}</div>
			</div>
			{!Props.justOne ? (
				<div>
					{Props?.list?.map((element, index) => (
						<span
							key={index}
							className="inline-flex items-center  justify-center leading-none text-indigo-100 bg-blue-600 rounded mx-2 mt-1.5"
						>
							<span
								className="px-2 py-0.5 text-sm font-semibold"
								onClick={() => {
									if (Props.onUpdate) {
										Props.onUpdate(element)
									}
								}}
							>
								{element[Props.listPrint]}
							</span>
							{Props.onDelete ? (
								<button
									type="button"
									className="relative text-white font-semibold"
									onClick={() => {
										Props.onDelete(element)
									}}
								>
									<span className="absolute top-0 right-0 inline-flex items-center justify-center text-xs font-semibold leading-none text-white transform translate-x-1/2 -translate-y-2 bg-red-500 rounded-full">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</button>
							) : null}
						</span>
					))}
				</div>
			) : null}
		</div>
	)
}
