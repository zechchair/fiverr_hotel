import Image from "next/image"
import cn from "classnames"
import { useRouter } from "next/router"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Header() {
	const router = useRouter()
	const { data: session } = useSession()
	const user: any = session?.user
	return (
		<>
			<header
				className={cn(
					"z-30 w-full print:hidden fixed",
					router.pathname == "/auth/login" || router.pathname == "/error" ? "hidden" : "",
				)}
			>
				<nav
					className={cn(
						"py-1 sm:py-0 ",
						session
							? "bg-gradient-to-r from-" +
									process.env.color +
									"-400 to-" +
									process.env.color +
									"-200"
							: "bg-gradient-to-r from-" +
									process.env.color +
									"-600 to-" +
									process.env.color +
									"-400",
					)}
				>
					<div
						className={cn(
							"flex flex-wrap justify-between items-center",
							session ? " px-2 " : " px-2",
						)}
					>
						<button className="h-full flex justify-center items-center hidden sm:block">
							<Image
								src="/logoWhite.svg"
								width={90}
								height={50}
								priority
								alt="FMBD"
								onClick={() => {
									window.location.replace("/")
								}}
							/>
						</button>
						<button className="h-full flex justify-center items-center sm:hidden">
							<Image
								src="/logoWhite.svg"
								width={75}
								height={30}
								priority
								alt="FMBD"
								onClick={() => {
									window.location.replace("/")
								}}
							/>
						</button>
						{session ? (
							<div className="flex items-center md:order-2">
								<button
									type="button"
									className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
									id="user-menu-button"
									aria-expanded="false"
									data-dropdown-toggle="dropdown"
								>
									<img
										className="inline-block object-cover sm:w-10 sm:h-12 w-10 h-12 rounded-full"
										src={user.image ? process.env.NEXT_PUBLIC_SERVER + user.image : "/noimage.jpg"}
										alt={user.image ? process.env.NEXT_PUBLIC_SERVER + user.image : "/noimage.jpg"}
									/>
								</button>
							</div>
						) : (
							<button
								className="py-1 inline-flex text-sm md:text-base font-semibold  bg-white rounded-full  gap-1 px-3 items-center text-white bg-opacity-20 hover:bg-opacity-30 animate-pulse"
								onClick={() => signIn()}
							>
								<span>Se</span>
								<span>connecter</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-4 md:w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						)}
					</div>
				</nav>
				{session ? (
					<div className="flex justify-end">
						<div className="px-4 sm:py-1 bg-blue-100 rounded-bl-2xl shadow">
							<span className="inline-block transform -translate-y-0.5 w-2 h-2 mr-2 bg-green-600 rounded-full animate-pulse"></span>
							<span className="font-semibold sm:mr-4 mr-2">{user?.name}</span>
							<span className="inline-flex transform -translate-y-0.5 items-center justify-center px-2 sm:py-1 py-0.5 text-xs font-bold leading-none text-indigo-100 bg-blue-600 rounded uppercase shadow">
								{user?.role}
							</span>
						</div>
					</div>
				) : null}
			</header>
		</>
	)
}
