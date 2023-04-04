import cn from "classnames"
import { useEffect, useRef, useState } from "react"

import imageCompression from "browser-image-compression"
const options = {
	maxSizeMB: 0.1,
	maxWidthOrHeight: 100,
	useWebWorker: true,
}
export default function Input(Props) {
	const focusInput = useRef(null)
	function toDateString(date: any) {
		const mydate = new Date(date)
		return (
			mydate.getFullYear() +
			"-" +
			("0" + (mydate.getMonth() + 1)).slice(-2) +
			"-" +
			("0" + mydate.getDate()).slice(-2)
		).toString()
	}
	useEffect(() => {
		if (focusInput.current) {
			focusInput.current.focus()
		}
	}, [])

	const uploadToClient = async (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0]
			setCreateObjectURL(URL.createObjectURL(i))
			const compressedFile = await imageCompression(i, options)
			Props.setUploadedImage(new File([compressedFile], compressedFile.name))
		}
	}
	const uploadToClientPdf = async (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0]
			Props.setUploadedPdf(i)
		}
	}
	const [createObjectURL, setCreateObjectURL] = useState("/noimage.jpg")
	return (
		<div className={Props.className}>
			<div className="md:text-md text-md ml-px">{Props.children}</div>
			{Props.type == "pdf" ? (
				<div className="mt-2">
					<label className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">
						<input
							type="file"
							style={{ display: "none" }}
							accept="application/pdf"
							onChange={uploadToClientPdf}
						/>
						choisir le fichier
					</label>
					<label className="text-xs">
						&nbsp;
						{Props.uploadedPdf ? (
							Props.uploadedPdf.name
						) : Props.pdf ? (
							<div
								onClick={() => {
									window.open(process.env.NEXT_PUBLIC_SERVER + Props.pdf)
								}}
							>
								Déjà téléchargé
							</div>
						) : (
							"Vide"
						)}
					</label>
				</div>
			) : null}
			{Props.type == "image" ? (
				<div className="flex flex-col justify-center items-center py-8">
					<div className="relative flex items-center justify-center h-20 w-20 mb-6">
						<div
							className={cn(
								"absolute z-0 rounded-full h-20 w-20 top-0 left-0",
								Props.image || createObjectURL != "/noimage.jpg"
									? "ring-2 ring-green-600 border-4"
									: "ring-4 ring-" + process.env.secondColor + "-300 animate-pulse",
							)}
						>
							<span></span>
						</div>
						<div className="z-10">
							<label className="flex">
								<input
									type="file"
									style={{ display: "none" }}
									accept="image/*"
									onChange={uploadToClient}
								/>
								<img
									className="mx-auto h-20 w-20 rounded-full shadow"
									src={
										Props.image && createObjectURL == "/noimage.jpg"
											? process.env.NEXT_PUBLIC_SERVER + Props.image
											: createObjectURL
									}
									alt={Props.image}
								/>
							</label>
						</div>
					</div>
					<div className="text-sm inline-flex space-x-2">
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
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<p>Télécharger une image</p>
					</div>
				</div>
			) : null}
			{Props.type == "radio"
				? Props.labels.map((lbl, i) => (
						<>
							<div
								className={cn(
									"inline-flex  p-1 rounded mr-2 px-1.5 gap-1",
									lbl["value"] == Props.select
										? "ring-2 ring-blue-400 ring-opacity-80 shadow-md"
										: "shadow",
								)}
								key={i}
							>
								<input
									className="h-3 w-3 mr-0.5 self-center"
									id={Props.id + lbl[Props.label]}
									type="radio"
									required={Props.required}
									name={Props.children}
									value={lbl["value"]}
									checked={lbl["value"] == Props.select}
									onChange={e => {
										Props.onChange(e)
									}}
								/>
								<label htmlFor={Props.id + lbl[Props.label]}>{lbl[Props.label]}</label>
							</div>
						</>
				  ))
				: null}
			{Props.type == "textarea" ? (
				<textarea
					className="w-full text-sm text-black py-2 pl-4 pr-2 focus:ring-1 focus:outline-none 
                      focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md inline"
					rows={Props.rows}
					autoFocus={Props.autoFocus}
					value={Props.value}
					onChange={e => {
						Props.onChange(e)
					}}
				>
					{Props.placeholder}
				</textarea>
			) : null}

			{Props.type == "datalist" ? (
				<>
					<input
						autoComplete="off"
						className="w-full text-sm text-black py-2 pl-4 pr-2 focus:ring-1 focus:outline-none 
                      focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md inline"
						list={Props.value ? Props.name + "1" : undefined}
						id={Props.name}
						autoFocus={Props.autoFocus}
						name={Props.name}
						value={Props.value}
						onChange={e => {
							Props.onChange({ target: { value: e.target.value.toUpperCase() } })
						}}
					/>
					<datalist id={Props.name + "1"}>
						{/* only 5 options provided  */}
						{Props?.labels?.map((lbl, indexl) => (
							<option key={indexl} value={lbl[Props.label].toUpperCase()} />
						))}
					</datalist>
				</>
			) : null}
			{Props.type == "select" ? (
				<>
					<select
						className="w-full text-sm text-black py-2 pl-4 pr-2 focus:ring-1 focus:outline-none 
                      focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md inline"
						name={Props.name}
						id={Props.name}
						onChange={e => {
							Props.onChange(e)
						}}
						required={Props.required}
					>
						<option value="" disabled hidden selected={!Props.placeholder}>
							veuillez choisir ...
						</option>
						{Props?.labels?.map((lbl, index) => (
							<option
								key={index}
								value={Props.stringify ? JSON.stringify(lbl) : lbl[Props.value]}
								selected={Props.placeholder == lbl[Props.value]}
							>
								{Props?.label?.map(name => lbl[name].toUpperCase() + " ")}
							</option>
						))}
					</select>
				</>
			) : null}

			{Props.type == "date" ? (
				<>
					<input
						className={cn(
							"w-full text-sm text-black pl-4 pr-2 focus:ring-1 focus:outline-none",
							"py-2",
							"focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md",
						)}
						autoFocus={Props.autoFocus}
						required={Props.required}
						data-date-format="DD MM YYYY"
						autoComplete="off"
						type="date"
						min={Props.min}
						max={Props.max}
						disabled={Props.disabled}
						value={toDateString(Props.value)}
						onChange={e => {
							Props.onChange(e)
						}}
						ref={Props.autoFocus ? focusInput : null}
					/>
				</>
			) : null}
			{Props.type == "email" ? (
				<>
					<input
						className={cn(
							"w-full text-sm text-black pl-4 pr-2 focus:ring-1 focus:outline-none",
							Props.type == "file" ? "py-1" : "py-2",
							"focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md",
						)}
						// pattern="mail"
						type="email"
						is-email
						id={Props.placeholder}
						name={Props.name}
						autoFocus={Props.autoFocus}
						value={Props.value}
						aria-label={Props.placeholder}
						placeholder={Props.placeholder}
						onChange={e => {
							Props.onChange({ target: { value: e.target.value } })
						}}
						ref={Props.autoFocus ? focusInput : null}
						required={Props.required}
					/>
				</>
			) : null}
			{Props.type == "tele" ? (
				<input
					className={cn(
						"w-full text-sm text-black pl-4 pr-2 focus:ring-1 focus:outline-none",
						Props.type == "file" ? "py-1" : "py-2",
						"focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md",
					)}
					autoComplete={Props.autoComplete}
					id={Props.placeholder}
					name={Props.name}
					autoFocus={Props.autoFocus}
					pattern="([+]?([0-9]{3})?[-. ]?([0-9]{4})[-. ]?([0-9]{5}))|(([0-9]{4})[-. ]?([0-9]{6}))"
					type="tel"
					value={Props.value}
					aria-label={Props.placeholder}
					placeholder={Props.placeholder}
					onChange={e => {
						Props.onChange({ target: { value: e.target.value } })
					}}
					ref={Props.autoFocus ? focusInput : null}
					required={Props.required}
				/>
			) : null}
			{![
				"radio",
				"textarea",
				"pdf",
				"datalist",
				"email",
				"date",
				"image",
				"select",
				"tele",
			].includes(Props.type) ? (
				Props.disabled ? (
					<input
						className={cn(
							"w-full text-sm text-black pl-4 pr-2 focus:ring-1 focus:outline-none",
							Props.type == "file" ? "py-1" : "py-2",
							"focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md",
						)}
						min={Props.min}
						max={Props.max}
						autoComplete={Props.autoComplete}
						type={Props.type}
						pattern={Props.pattern}
						value={Props.value}
						aria-label={Props.placeholder}
						placeholder={Props.placeholder}
						onChange={e => {
							Props.onChange({ target: { value: e.target.value.toUpperCase() } })
						}}
						disabled
					/>
				) : (
					<input
						className={cn(
							"w-full text-sm text-black pl-4 pr-2 focus:ring-1 focus:outline-none",
							Props.type == "file" ? "py-1" : "py-2",
							"focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md",
						)}
						min={Props.min}
						max={Props.max}
						autoComplete={Props.autoComplete}
						step="any"
						id={Props.placeholder}
						name={Props.name}
						autoFocus={Props.autoFocus}
						type={Props.type}
						pattern={Props.pattern}
						value={Props.value}
						aria-label={Props.placeholder}
						placeholder={Props.placeholder}
						onChange={e => {
							Props.onChange({ target: { value: e.target.value.toUpperCase() } })
						}}
						ref={Props.autoFocus ? focusInput : null}
						required={Props.required}
					/>
				)
			) : null}
		</div>
	)
}
