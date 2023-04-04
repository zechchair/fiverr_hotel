// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// import { SessionProvider } from "next-auth/react"
// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }:AppProps) {
//   return (
//     // <SessionProvider session={session}>
//       <Component {...pageProps} />
//   )
// }

import '@/styles/globals.css'

import Head from "next/head"
import Layout from "../components/layout"
import { useEffect, useState } from "react"
import cn from "classnames"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Router from "next/router"
import PopUp from "../components/popup"
import Header from "../components/header"


const Sidebar = dynamic(() => import("../components/sidebar"), {
	ssr: false,
})

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {

	const [sidebar, setSidebar] = useState(false)
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		const start = () => {
			setLoading(true)
		}
		const end = () => {
			setLoading(false)
		}
		Router.events.on("routeChangeStart", start)
		Router.events.on("routeChangeComplete", end)
		Router.events.on("routeChangeError", end)
		return () => {
			Router.events.off("routeChangeStart", start)
			Router.events.off("routeChangeComplete", end)
			Router.events.off("routeChangeError", end)
		}
	}, [])
	return (
		<>
			<Head>
				<title>E hotels</title>
				<meta name="Description" content="SEO" />
				<link rel="icon" href="/tabLogo.png" />
			</Head>
				<div className="flex  flex-col min-h-screen ">
					<Header />
					<Layout>
						<div className={sidebar ? "md:grid md:grid-cols-6" : ""}>
							{sidebar ? <div className="md:block hidden"></div> : ""}
							{!(router.pathname == "/auth/login" || router.pathname == "/error") ? (
								<Sidebar sidebar={sidebar} setSidebar={setSidebar} />
							) : null}
							<div
								className={cn(
									sidebar ? "col-span-5 w-full md:px-8 print:px-0" : "md:ml-16 md:px-8",
									"min-h-screen min-w-screen pt-24 overflow-x-hidden print:m-0 print:p-0",
								)}
							>
								{loading ? <PopUp show loader type="info"></PopUp> : <Component {...pageProps} />}
							</div>
						</div>
					</Layout>
				</div>
		</>
	)
}
