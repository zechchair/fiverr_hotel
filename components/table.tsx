// ! docs

// props:{cols,color,checkBox:Boolean,checkedAll:Boolean,onCheckAll,data:array,isChecked:function,onCheck:function}
// cols={nameInData:{name:"nameToShow",action:function, center:boolean}}
//data array of objects contains cols keys with value as functions or html or string or numbers
//color : the color of the table
// checkBox : if we want checkBoxes or not ==> if yes we should use isCheked and onCheck and onCheckAll functions
//onCheckAll function runs when select check all
// onCheck function runs when check one row
// isChecked is a function takes the element and return either the row is checked or not
import cn from "classnames";
export default function Table(props) {
  return (
		<>
			{props?.data?.length && !props.hide ? (
				<div className={"flex justify-center " + props.className}>
					<div className="flex items-center flex-col overflow-auto shadow-md w-full print:overflow-hidden  rounded-xl">
						<div className="inline-block w-full align-middle">
							<div className="overflow-auto ">
								<table
									className={
										"table-fixed border-collapse min-w-full text-xs print:text-3xs divide-y divide-" +
										props.color +
										"-200 "
									}
								>
									<thead className={"bg-" + props.color + "-200"}>
										<tr>
											{props.checkBox ? (
												<th scope="col" className="p-4">
													<div className="flex items-center">
														<input
															type="checkbox"
															checked={props.checkedAll}
															onChange={e => {
																props.onCheckAll(e)
															}}
															className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
														/>
														<label htmlFor="checkbox-all" className="sr-only">
															checkbox
														</label>
													</div>
												</th>
											) : null}
											{Object.keys(props.cols).map(col =>
												props.cols[col]?(
													<th
														key={col}
														scope="col"
														className={cn(
															" py-3 px-3  tracking-wider  text-gray-700 text-left ",
															props.cols[col]?.center ? "text-center " : "",
														)}
													>
														{props?.cols[col]?.name}
													</th>
												):null
											)}
										</tr>
									</thead>
									<tbody className={"bg-white divide-y divide-" + props.color + "-200 "}>
										{props?.data?.map((element, index) => (
											<tr
												className={
													"bg-" +
													(props?.rowColor ? props?.rowColor(element) : "gray") +
													"-50" +
													" hover:bg-" +
													(props?.rowColor ? props?.rowColor(element) : "gray") +
													"-100  "
												}
												key={index}
											>
												{props.checkBox ? (
													<td className="p-4 w-4">
														<div className="flex items-center">
															<input
																checked={props.isChecked(element)}
																onChange={e => {
																	props.onCheck(element, e)
																}}
																type="checkbox"
																className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
															/>
															<label htmlFor="checkbox-table-1" className="sr-only">
																checkbox
															</label>
														</div>
													</td>
												) : null}
												{Object.keys(props.cols).map(col =>
													props.cols[col] ? (
														<td
															key={col}
															scope="col"
															className={cn(
																" py-2 px-3 text-left tracking-wider  text-gray-700 uppercase  ",
																props.cols[col]?.center ? "text-center" : "",
															)}
														>
															{props.cols[col]?.function ? (
																<button
																	type="button"
																	onClick={() => {
																		props.cols[col]?.function(element)
																	}}
																>
																	{element[col]}
																</button>
															) : (
																<div
																	className={props.cols[col]?.center ? "flex justify-center" : ""}
																>
																	{element[col] ? (
																		element[col]
																	) : (
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-6 w-6 text-purple-600"
																			fill="none"
																			viewBox="0 0 24 24"
																			stroke="currentColor"
																		>
																			<path
																				stroke-linecap="round"
																				stroke-linejoin="round"
																				stroke-width="1"
																				d="M20 12H4"
																			/>
																		</svg>
																	)}
																</div>
															)}
														</td>
													) : null,
												)}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						{props.load ? (
							<div className="w-screen  bg-gray-50">
								<button
									type="button"
									className=" w-full  text-purple-400 animate-pulse"
									onClick={() => props.onLoad()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-10 w-10 mx-auto"
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
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</>
	)
}
