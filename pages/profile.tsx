import { useSession, signIn, signOut } from "next-auth/react"
import Head from 'next/head';

export default function Profile({ user }:any) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Profile Page</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" />
      </Head>
      <nav className="bg-gray-800 p-2 mt-0 w-full">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
            <a className="text-white no-underline hover:text-white hover:no-underline" href="/">
              <i className="fas fa-home fa-lg"></i> Website Title
            </a>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <div className="hidden md:flex items-center">
              <a className="inline-block text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/api/auth/signout">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container w-full flex flex-wrap mx-auto pt-20">
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <div className="p-8 text-3xl font-bold text-center border-b-4">
              Profile
            </div>
            <div className="mx-auto p-8">
              <p className="mb-4">Your account details are below:</p>
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Username:</td>
                    <td className="border px-4 py-2">{user.email}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Password:</td>
                    <td className="border px-4 py-2">{user.role}</td>
                  </tr>
            
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

export async function getServerSideProps({ req, res }:any) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
console.log(session)

  return {
    props: {
      user:session.user
    },
  };
}

