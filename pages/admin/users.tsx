import Title from "../../components/title"
import Dropdown from "../../components/dropdown"
import Input from "../../components/input"
import Modal from "../../components/modal"
import Pagination from "../../components/pagination"
import { useEffect, useState } from "react"
import { fetcher } from "../../utils/fetcher"
import cn from "classnames"
import SearchElem from "../../components/searchElem"
import Card from "../../components/card"
import PopUp from "../../components/popup"
import PopUpBtn from "../../components/popupbtn"
import { isMobile } from "react-device-detect"
import { Prisma } from "@prisma/client"

const database = "user"
const item_per_page: number = 10;

export default function Staff(props) {
	const [count, setCount] = useState(props.Count)
	const [popUp, setPopUp] = useState<any>({
		show: false,
		loader: false,
		type: "info",
		children: null,
		typeButton: false,
		function: async function () {
			return console.log()
		},
	})
	const [uploadedImage, setUploadedImage] = useState(null)
	const [selectedPage, setSelectedPage] = useState<number>(1)
	const [show, setShow] = useState<boolean>(false)
	const [step, setStep] = useState(1)
	const [df, setDf] = useState<any>(undefined)
	const [data, setData] = useState<any[]>(props.initialData)
	// const { data: session ,status} = useSession({required:true})
	const session={user:{name:"zakaria",role:"admin"}}

	const user: any = session?.user
    const status: string = "good";
	var labels_droits = [
		{ name: "admin", value: "admin" },
		{ name: "employee", value: "employee" },
	]

	useEffect(() => {
		if (status !== "loading") {	
			goToPg()
	  }
	}, [status])
	async function goToPg(newPg: number = 1) {
		setSelectedPage(newPg)
		const body = {
			take: item_per_page,
			skip: item_per_page * (newPg - 1),
			where: {
				name: { contains: filter.name ? filter.name : undefined, mode: 'insensitive', },
				address: { contains: filter.address ? filter.address : undefined , mode: 'insensitive',},
				role: filter?.role != "all" ? filter.role : { in: labels_droits.map(item => item.value) },
			},
			orderBy: [
				{
					id: "desc",
				},
			],
			include: {
				hotel: true
			},
		}

		Promise.all([
			setPopUp({
				typeButton: false,
				loader: true,
				show: true,
			}),
			await fetcher("/api/count/" + database, {
				where: body.where,
			}),
			await fetcher("/api/find/" + database, body),
			setPopUp({
				typeButton: false,
				loader: false,
				type: "info",
				show: false,
			}),
		]).then(array => {
			console.log(array[2])
			setCount(array[1])
			if (!array[2].code) {
				if (isMobile && newPg - 1) {
					setData([...data, ...array[2]])
				} else {
					setData(array[2])
				}
			}
		})
	}

	const [filter, setFilter] = useState({
		role: "all",
		name: undefined,
		address: undefined,
	})
	return (
		<>
			<div className="lg:px-4 h-auto pt-4 h-container">
				<div className="flex justify-between mb-4 ">
					<Title>Gestion des comptes</Title>
					<div className="flex items-center space-x-2">
						<button
							type="button"
							className={"text-purple-400"}
							onClick={() => {
								setShow(true)
								setDf(undefined)
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10"
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
						<Dropdown
							onClick={() => {
								goToPg()
							}}
						>
							<form className="space-y-2 p-4">
								<Input
									labels={[{ name: "TOUT", value: "all" }, ...labels_droits]}
									label={["name"]}
									type="select"
									name="list_droits"
									placeholder={filter.role}
									value="value"
									onChange={e => {
										setFilter({ ...filter, role: e.target.value })
									}}
								>
									Droits :
								</Input>

								<Input
									type="text"
									value={filter.name}
									onChange={e => {
										setFilter({ ...filter, name: e.target.value })
									}}
									placeholder="Nom......"
								>
									<div className="text-md font-semibold">Nom :</div>
								</Input>
								<Input
									type="text"
									value={filter.address}
									onChange={e => {
										setFilter({ ...filter, address: e.target.value })
									}}
									placeholder="Addresse......"
								>
									<div className="text-md font-semibold">Addresse :</div>
								</Input>
							</form>
						</Dropdown>
					</div>
				</div>
				<Card
					image="image"
					data={data?.map(item => ({
						...item,
						roleU: labels_droits.find(elem => elem.value == item.role)?.name,
					}))}
					title="name"
					description="roleU"
					labels="beneficiaireU"
					first="Modifier"
					info={elem =>
						elem.hotel?<>
								<div className="text-sm text-gray-700 font-bold mb-1"> Hotel :</div>
								<div className="flex flex-col gap-1 items-start justify-center">
										<span className="bg-purple-200 rounded-full text-xs px-2 py-px">
											{elem.hotel.name}
										</span>
								</div>
							</>:null
						
					}
					onFirst={elem => {
						setShow(true)
						setDf(elem)
					}} //return elem to update
					load={selectedPage < parseInt(((count - 0.1) / item_per_page) as any) + 1 && isMobile}
					onLoad={e => {
						if (selectedPage < parseInt(((count - 0.1) / item_per_page) as any) + 1) {
							goToPg(selectedPage + 1)
						}
					}}
					onDelete={async elem => {
						setPopUp({
							...popUp,
							show: true,
							loader: false,
							children: "Vous allez éffectuer une suppression",
							typeButton: true,
							function: async function () {
								const body: Prisma.userDeleteArgs = {
									where: {
										id: elem.id,
									},
								}
								const res = await fetcher("/api/delete/" + database, body, setPopUp)
								if (!res.code) {
									setData(data.filter(item => item.id != res.id))
									setPopUp({
										show: true,
										loader: false,
										type: "success",
										children: "Votre operation a été bien éffectuée",
									})
								} else {
									setPopUp({
										...popUp,
										show: true,
										loader: false,
										type: "danger",
										children: "Veuillez vérifier vos informations ou réessayer plus tard",
									})
								}
							},
						})
					}}
					delete={data?.filter(item => item.role == "admin").length > 1}
				/>
			</div>
			<Pagination
				selected={selectedPage}
				len={parseInt(((count - 0.1) / item_per_page) as any) + 1}
				onChange={async newPg => {
					goToPg(newPg)
				}}
				// children={undefined}
			/>

			<Modal
				show={show}
				size="sm"
				onClose={() => {
					setShow(false)
					setStep(1)
				}}
			>
				<form
					className="rounded px-8 sm:px-12 py-8"
					onSubmit={async e => {
						e.preventDefault()
						setPopUp({
							...popUp,
							show: true,
							loader: false,
							children: "Etes vous sur d'effectuer cette operation",
							typeButton: true,
							function: async function () {
								setPopUp({
									typeButton: false,
									loader: true,
									show: true,
								})
								

								const body: Prisma.userUpsertArgs = {
									where: {
										id: df?.id ? df?.id : 0,
									},
									create: {
										name: df?.name,
										username: df?.username,
										password: df?.password,
										address: df?.address,
										role: df?.role,
										nas: df?.nas,
										hotel: df?.hotel?.id  ? {
											connect: { id: df?.hotel?.id },
										}:undefined	
									},
									update: {
										name: df?.name,
										username: df?.username,
										password: df?.password,
										address: df?.address,
										role: df?.role,
										nas: df?.nas,
										hotel: df?.hotel?.id  ? {
											connect: { id: df?.hotel?.id },
										}:undefined
										,									},
									include: {
										hotel: true,
									},
								}

								const res = await fetcher("/api/upsert/" + database, body, setPopUp)
								if (!res.code) {
									setData([
										...data
											.filter(item => item.id != res.id)
											.slice(0, isMobile ? undefined : item_per_page - 1),
										res,
									])
									setStep(1)
									setShow(false)
									setPopUp({
										show: true,
										loader: false,
										type: "success",
										children: "Votre operation a été bien éffectuée",
									})
									setShow(false)
									setUploadedImage(null)
								} else {
									setPopUp({
										...popUp,
										show: true,
										loader: false,
										type: "danger",
										children: "Veuillez vérifier vos informations ou réessayer plus tard",
									})
								}
							},
						})
					}}
				>
					<div className="grid md:grid-cols-2 md:gap-5 gap-3 mb-8">
						
							<>
							<Input
									labels={labels_droits}
									label={["name"]}
									type="select"
									name="list_droits"
									required
									placeholder={df?.role}
									value="value"
									onChange={e => {
										setDf({ ...df, role: e.target.value ,hotel:undefined})
									}}
								>
									Droits :
								</Input>
								<Input
									type="text"
									required
									value={df?.name}
									onChange={e => {
										setDf({
											...df,
											name: e.target.value,
											username: e.target.value.replace(" ", "."),
										})
									}}
									placeholder="Nom / prénom......"
								>
									Nom - prénom :
								</Input>
								
								<Input
									required
									type="text"
									placeholder="identifiant......"
									value={df?.username}
									onChange={e => {
										setDf({ ...df, username: e.target.value })
									}}
								>
									Identifiant :
								</Input>

								<Input
									required
									type="text"
									placeholder="Mot de passe......"
									value={df?.password}
									onChange={e => {
										setDf({ ...df, password: e.target.value })
									}}
								>
									Mot de passe :
								</Input>

								<Input
									// required
									type="text"
									placeholder="Addresse ......"
									value={df?.address}
									onChange={e => {
										setDf({ ...df, address: e.target.value })
									}}
								>
									Addresse :
								</Input>
								<Input
									// required
									type="text"
									placeholder="NAS ......"
									value={df?.nas}
									onChange={e => {
										setDf({ ...df, nas: e.target.value })
									}}
								>
									NAS :
								</Input>
								
								{df?.role == "employee" ? (
									<div className="md:col-span-2">
										<SearchElem
										justOne
											list={df?.hotel}
											dataList={df?.hotelList}
											label={ "Hotel :"}
											dataPrint="name"
											listPrint="name"
											placeholder="Ajouter un seul hotel......"
											minCarac={2}
											onSearch={async elem => {
												const body = {
													select: {
														name: true,
														id: true,
													},
													where: {
														name: { contains: elem ? elem : undefined },
													},
												}

												const res = await fetcher("/api/find/" + "hotel", body, setPopUp)
												if (!res.code) {
													setDf({ ...df, hotelList: res })
												}
											}}
											onAdd={elem => {
												setDf({
													...df,
													hotel:elem
												})
											}}
											onDelete={elem => {
												setDf({
													...df,
													hotel:undefined,
												})
											}}
										/>
									</div>
								) : null}
							</>
				
					</div>
					<div className={cn("flex","justify-between")}>
					
							<>
								<button
									type="button"
									className="text-blue-600 animate-pulse"
									onClick={() => setStep(step - 1)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-8 w-8 my-1 mx-0.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
										/>
									</svg>
								</button>
								<button className="text-green-600 animate-pulse" type="submit">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-10 w-10"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</>
					</div>
				</form>
			</Modal>
			<PopUp
				show={popUp.show && !popUp.typeButton}
				loader={popUp.loader}
				onClose={() => {
					setPopUp({ ...popUp, show: false, type: "info" })
				}}
				type={popUp.type}
			>
				{popUp.children}
			</PopUp>
			<PopUpBtn
				show={popUp.show && popUp.typeButton}
				onClose={() => {
					setPopUp({ ...popUp, show: false, type: "info" })
				}}
				onConfirm={async () => await popUp.function()}
				onCancel={() => {
					setPopUp({ ...popUp, show: false, type: "info" })
				}}
				type={popUp.type}
			>
				{popUp.children}
			</PopUpBtn>
		</>
	)
}