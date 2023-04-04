import cn from "classnames";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

export default function sidebar(Props) {
  const router = useRouter();
  // const { data: session } = useSession()
  const session = { user: { name: "zakaria", role: "admin" } };

  const user: any = session?.user;
  return (
    <>
      {session ? (
        <>
          {!Props.sidebar ? (
            <button
              type="button"
              className={cn(
                "bg-gray-700 fixed top-16 left-0 z-20 text-white bg-opacity-40 hover:bg-opacity-80 p-2 w-9 ml-4 rounded-full md:hidden print:hidden"
              )}
              onClick={() => {
                Props.setSidebar(!Props.sidebar);
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
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </button>
          ) : null}

          <div
            className={cn(
              "text-sm  text-bold z-20 fixed pt-16 flex flex-col md:bg-gradient-to-r print:hidden md:from-white md:to-purple-50 md:border-r h-full",
              Props.sidebar ? "w-screen md:w-1/6 bg-purple-50" : "md:w-16",
              "print:hidden"
            )}
          >
            {Props.sidebar ? (
              <button
                type="button"
                className={cn(
                  "bg-gray-700 text-white bg-opacity-40 hover:bg-opacity-80 p-2 w-9 ml-4 rounded-full md:hidden"
                )}
                onClick={() => {
                  Props.setSidebar(!Props.sidebar);
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
                  "bg-gray-700 bg-opacity-40 hover:bg-opacity-80 rounded p-1 ml-4 mt-4 md:block hidden"
                )}
                onClick={() => {
                  Props.setSidebar(!Props.sidebar);
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
                  Props.sidebar ? "" : "md:block hidden z-40"
                )}
              >
                <li>
                  <button
                    type="button"
                    className={cn(
                      "w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-purple-50",
                      "text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
                      window.location.pathname == "/"
                        ? "bg-purple-50 text-red-800 border-red-500"
                        : null
                    )}
                    onClick={() => {
                      router.push("/");
                      // SOLUTION
                      if (isMobile) {
                        Props.setSidebar(false);
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
                      className={cn(
                        "ml-2  tracking-wide truncate",
                        Props.sidebar ? "" : "hidden"
                      )}
                    >
                      Accueil
                    </span>
                  </button>
                  {/* </Link> */}
                </li>

                <li>
                  {/* <Link href={linkDash}> */}
                  <button
                    type="button"
                    className={cn(
                      "w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-purple-50",
                      "text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
                      window.location.pathname == "/admin/chainhotels"
                        ? "bg-purple-50 text-red-800 border-red-500"
                        : null
                    )}
                    onClick={() => {
                      router.push("/admin/chainhotels");
                      if (isMobile) {
                        Props.setSidebar(false);
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
                        Props.sidebar ? "" : "hidden"
                      )}
                    >
                      Hotels
                    </span>
                  </button>
                  {/* </Link> */}
                </li>

                <li>
                  {/* <Link href={linkDash}> */}
                  <button
                    type="button"
                    className={cn(
                      "w-full shadow relative flex flex-row items-center h-11 focus:outline-none hover:bg-purple-50",
                      "text-gray-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-500 pr-6",
                      window.location.pathname == "/admin/users"
                        ? "bg-purple-50 text-red-800 border-red-500"
                        : null
                    )}
                    onClick={() => {
                      router.push("/admin/users");
                      if (isMobile) {
                        Props.setSidebar(false);
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
                        Props.sidebar ? "" : "hidden"
                      )}
                    >
                      Staff
                    </span>
                  </button>
                  {/* </Link> */}
                </li>

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
                        Props.sidebar ? null : "hidden"
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
  );
}
