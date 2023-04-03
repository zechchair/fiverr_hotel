// import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
// import { getProviders, signIn } from "next-auth/react"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../api/auth/[...nextauth]"

// export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <>
//       {Object.values(providers).map((provider) => (
//         <div key={provider.name}>
//           <button onClick={() => signIn(provider.id)}>
//             Sign in with {provider.name}
//           </button>
//         </div>
//       ))}
//     </>
//   )
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions);
  
//   // If the user is already logged in, redirect.
//   // Note: Make sure not to redirect to the same page
//   // To avoid an infinite loop!
//   if (session) {
//     return { redirect: { destination: "/" } };
//   }

//   const providers = await getProviders();
  
//   return {
//     props: { providers: providers ?? [] },
//   }
// }


import Image from "next/image"
import { useState } from "react"
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/router"
export default function Login(props) {
	const router = useRouter()
	const [data, setData] = useState(undefined)
	const header = router?.query?.error ? "Vos données de connexion sont incorrectes" : null

	return (
		<div className={"bgAdmin h-screen items-center content-center justify-center flex flex-col "}>

			<form
				method="post"
				action="/api/auth/callback/credentials"
				className=" space-y-4 flex flex-col w-full max-w-sm "
				onKeyDown={e => {
					if (e.keyCode == 13) {
						e.preventDefault()
						document.getElementById("submit").click()
					}
				}}
			>
				<input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />

				<input
					name="username"
					type="text"
					placeholder="Identifiant......"
					value={data?.username}
					onChange={e => setData({ ...data, username: e.target.value })}
					autoFocus
					className={
						" text-sm py-2 text-black pl-4 pr-2 focus:ring-1 focus:outline-none focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md"
					}
				/>

				<input
					name="password"
					value={data?.password}
					onChange={e => setData({ ...data, password: e.target.value })}
					type="password"
					placeholder="Mot de passe......"
					className={
						" text-sm py-2 text-black pl-4 pr-2 focus:ring-1 focus:outline-none focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md"
					}
				/>

				<div className="text-center text-red-500 text-sm center">{header}</div>
				<div className="text-center z-50 pt-0">
					<button
						type="submit"
						id="submit"
						className="text-gray-50 bg-green-600 py-1 px-3 my-2 rounded-full"
					>
						Connexion
					</button>
					{/* <button
							className="text-xs text-gray-900 hover:underline hover:text-gray-400 cursor-pointer"
							onClick={() => setShow(true)}
						>
							mot de passe oublié ?
						</button> */}
				</div>
			</form>
			<div className="fixed z-20  p-4  text-xs text-white text-center bottom-0">
				<div>resto @copyright</div>
				<a>Created by : Zakaria Echchair </a>
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	}
}