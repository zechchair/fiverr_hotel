import cn from "classnames"
// return new Promise(resolve => {
//   setTimeout(() => {
//     resolve('resolved');
//   }, 2000);
// });
interface PopUpBtnInterface {
	show: boolean
	type?: "info" | "success" | "danger" | "warning" | any
	onClose: React.MouseEventHandler
	onConfirm: React.MouseEventHandler
	onCancel: React.MouseEventHandler
	children?: JSX.Element | any
}
export type { PopUpBtnInterface }
export default function PopUpBtn(Props: PopUpBtnInterface) {
	if (!Props.show) {
		return null
	}
	return (
		<div
			className="fixed flex justify-center items-center bg-black bg-opacity-70 inset-0 z-50"
			onClick={Props.onClose}
		>
			<div className="w-72 sm:w-96 shadow-md rounded" onClick={e => e.stopPropagation()}>
				<div
					className={cn(
						"relative grid grid-cols-3 rounded-t p-4 ",
						Props.type == "danger" ? "bg-red-50" : null,
						Props.type == "warning" ? "bg-yellow-50" : null,
						Props.type == "info" ? "bg-blue-50" : null,
						Props.type == "success" ? "bg-green-50" : null,
					)}
				>
					<button
						type="button"
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
					<div className="flex justify-center items-center">
						{Props.type == "danger" ? (
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
						{Props.type == "warning" ? (
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
						{Props.type == "info" ? (
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
						{Props.type == "success" ? (
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
					</div>
					<div className="col-span-2 p-1 text-gray-700 font-semibold flex items-center">
						{Props.children}
					</div>
				</div>
				<div className="flex">
					<button
						type="button"
						autoFocus
						onClick={Props.onConfirm}
						className="w-full text-white shadow hover:shadow-lg bg-green-600 hover:bg-green-700 px-3 rounded-bl"
					>
						Confirmer
					</button>
					<button
						type="button"
						onClick={Props.onCancel}
						className="w-full text-white shadow hover:shadow-lg bg-red-600 hover:bg-red-700 px-3 rounded-br"
					>
						Annuler
					</button>
				</div>
			</div>
		</div>
	)
}
