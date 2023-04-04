import Title from "../../components/title";
import Input from "../../components/input";
import Modal from "../../components/modal";
import Pagination from "../../components/pagination";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { useState } from "react";
import Table from "../../components/table";
import { fetcher } from "../../utils/fetcher";
import Dropdown from "../../components/dropdown";
import PopUp from "../../components/popup";
import PopUpBtn from "../../components/popupbtn";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import SearchElem from "@/components/searchElem";
import { redirect } from "next/navigation";

const database = "hotel";
const item_per_page: number = 8;

export async function getServerSideProps(context) {
  if (!Number(context.query.id)) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/chainhotels",
      },
    };
  }
  const data = await prisma[database].findMany({
    take: item_per_page,
    where: { hotelChainId: Number(context.query.id) },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      managers: true,
    },
  });
  const Count = await prisma[database].count();
  return {
    props: {
      initialData: data,
      Count: Count,
      hotelChainId: Number(context.query.id),
      hotelChainName: context.query.name,
    },
  };
}
export default function HotelChain(props) {
  const [popUp, setPopUp] = useState<any>({
    show: false,
    loader: false,
    type: "info",
    children: null,
    typeButton: false,
    function: async function () {},
  });
  const router = useRouter();
  const ouiNon = [
    { name: "Oui", value: true },
    { name: "Non", value: false },
  ];
  const [show, setShow] = useState<boolean>(false);

  const [df, setDf] = useState<any>(undefined);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [data, setData] = useState<Prisma.hotelUncheckedCreateInput[]>(
    props.initialData
  );

  const [count, setCount] = useState(props.Count);

  async function goToPg(newPg: number = 1) {
    setSelectedPage(newPg);
    const body = {
      take: item_per_page,
      skip: item_per_page * (newPg - 1),
      where: {
        hotelChainId: Number(props.hotelChainId),
        name: filter?.name
          ? { contains: filter?.name, mode: "insensitive" }
          : undefined,
        // stars:{gte:5},
        // roomsN
        // managers
        address: filter?.address
          ? { contains: filter?.address, mode: "insensitive" }
          : undefined,
        managers: filter?.manager
          ? {
              some: {
                name: filter?.manager
                  ? { contains: filter?.manager, mode: "insensitive" }
                  : undefined,
              },
            }
          : undefined,

        rooms: filter?.room
          ? {
              some: {
                extend: filter?.extend,
                reserved: filter?.reserved,
              },
            }
          : undefined,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        managers: true,
      },
    };
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
      ,
      setPopUp({
        typeButton: false,
        loader: false,
        type: "info",
        show: false,
      }),
    ]).then((array) => {
      setCount(array[1]);
      if (!array[2].code) {
        if (isMobile && newPg - 1) {
          setData([...data, ...array[2]]);
        } else {
          setData(array[2]);
        }
      }
    });
  }

  const [filter, setFilter] = useState<any>(undefined);

  return (
    <>
      <div className="lg:px-4 h-auto pt-4 h-container">
        <div className="flex justify-between mb-4 ">
          <button
            type="button"
            className={"text-purple-400"}
            onClick={(e) => {
              router.back();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-10 animate-pulse"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </button>
          <Title>Hotels de la chain {props.hotelChainName}</Title>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className={"text-purple-400"}
              onClick={(e) => {
                setShow(true);
                setDf(undefined);
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 
                  0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <Dropdown
                onClick={async () => {
                  await goToPg();
                }}
              >
                <form className="space-y-2 p-4">
                  <Input
                    type="text"
                    value={filter?.name}
                    onChange={(e) => {
                      setFilter({ ...filter, name: e.target.value });
                    }}
                    placeholder="Nom......"
                  >
                    <div className="text-md font-semibold">Nom :</div>
                  </Input>
                  <Input
                    type="text"
                    value={filter?.address}
                    onChange={(e) => {
                      setFilter({ ...filter, address: e.target.value });
                    }}
                    placeholder="Adresse....."
                  >
                    <div className="text-md font-semibold">Adresse :</div>
                  </Input>
                  <Input
                    type="text"
                    value={filter?.manager}
                    onChange={(e) => {
                      setFilter({ ...filter, manager: e.target.value });
                    }}
                    placeholder="manager....."
                  >
                    <div className="text-md font-semibold">manager :</div>
                  </Input>
                  <Input
                    labels={ouiNon}
                    label="name"
                    type="radio"
                    value={filter?.reserved}
                    select={filter?.reserved}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        reserved: e.target.value == "true",
                      });
                    }}
                  >
                    <div className="text-md font-semibold">
                      {" "}
                      Chambres reservées :
                    </div>
                  </Input>
                  <Input
                    labels={ouiNon}
                    label="name"
                    type="radio"
                    value={filter?.extend}
                    select={filter?.extend}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        extend: e.target.value == "true",
                      });
                    }}
                  >
                    <div className="text-md font-semibold">
                      {" "}
                      Chambres etendues :
                    </div>
                  </Input>
                </form>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* <h1>Hello {process.env.customKey}</h1> */}

        <Table
          load={
            selectedPage <
              parseInt(((count - 0.1) / item_per_page) as any) + 1 && isMobile
          }
          onLoad={(e) => {
            if (
              selectedPage <
              parseInt(((count - 0.1) / item_per_page) as any) + 1
            ) {
              goToPg(selectedPage + 1);
            }
          }}
          color="purple"
          data={data
            ?.sort((a, b) => {
              return -a.id + b.id;
            })
            ?.map((item) => ({
              ...item,
              starsShow: (
                <div className="inline-flex justify-center items-center ">
                  {[1, 2, 3, 4, 5].map((elem) => (
                    <svg
                      className={
                        "w-5 h-5 " +
                        (item?.stars > elem - 1
                          ? "text-yellow-500"
                          : "text-gray-400")
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={async () => {
                        setDf({ ...df, stars: elem });
                      }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              ),
              update: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500 hover:text-blue-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              ),
              delete: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 hover:text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              ),
              navigate: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              ),
            }))}
          cols={{
            name: { name: "Hotel" },
            address: { name: "Adresse" },

            hotelsN: { name: "Nombre de chambre" },
            starsShow: { name: "Etoiles", center: true, stretched: true },
            update: {
              name: "Modifier",
              center: true,
              stretched: true,
              function: (elem) => {
                setShow(true);
                setDf(elem);
              },
            },
            delete: {
              name: "Supprimer",
              center: true,
              stretched: true,
              function: async (elem) => {
                setPopUp({
                  ...popUp,
                  type: "info",
                  show: true,
                  loader: false,
                  children: "Vous allez éffectuer une suppression",
                  typeButton: true,
                  function: async function () {
                    const body = {
                      where: {
                        id: elem.id,
                      },
                    };
                    const res = await fetcher(
                      "/api/delete/" + database,
                      body,
                      setPopUp
                    );

                    if (!res.code) {
                      setData([...data.filter((item) => item.id != res.id)]);
                      setShow(false);
                      setPopUp({
                        show: true,
                        loader: false,
                        type: "success",
                        children: "Votre operation a été bien éffectuée",
                      });
                    } else {
                      setPopUp({
                        ...popUp,
                        show: true,
                        loader: false,
                        type: "danger",
                        children:
                          "Veuillez vérifier vos informations ou réessayer plus tard",
                      });
                    }
                  },
                });
              },
            },
            navigate: {
              name: "Modifier les hotels",
              center: true,
              functionExist: true,
              function: (elem) => {
                router.push({
                  pathname: "/admin/rooms",
                  query: { id: elem.id, name: elem.name },
                });
              },
            },
          }}
        />
      </div>
      <Pagination
        selected={selectedPage}
        len={parseInt(((count - 0.1) / item_per_page) as any) + 1}
        onChange={async (newPg) => {
          goToPg(newPg);
        }}
      />

      <Modal
        show={show}
        size="sm"
        onClose={() => {
          setShow(false);
        }}
      >
        <form
          className="rounded px-8 sm:px-12 py-8"
          onSubmit={async (e) => {
            e.preventDefault();
            setPopUp({
              ...popUp,
              type: "info",
              show: true,
              loader: false,
              children: "Etes vous sur d'effectuer cette operation",
              typeButton: true,
              function: async function () {
                const body: Prisma.hotelUpsertArgs = {
                  where: {
                    id: df?.id ? df?.id : 0,
                  },
                  update: {
                    name: df?.name,
                    address: df?.address,
                    phoneNumbers: df?.phoneNumbers,
                    emails: df?.emails,
                    stars: df?.stars ? Number(df?.stars) : undefined,
                    managers: {
                      set: df?.managers?.map((person) => ({ id: person.id })),
                    },
                  },
                  create: {
                    name: df?.name,
                    address: df?.address,
                    phoneNumbers: df?.phoneNumbers,
                    emails: df?.emails,
                    stars: df?.stars ? Number(df?.stars) : 0,
                    hotelChain: {
                      connect: { id: props.hotelChainId },
                    },
                    managers: {
                      connect: df?.managers?.map((person) => ({
                        id: person.id,
                      })),
                    },
                  },
                  include: {
                    managers: true,
                  },
                };
                const res = await fetcher(
                  "/api/upsert/" + database,
                  body,
                  setPopUp
                );

                if (!res.code) {
                  setData([
                    ...data
                      .filter((item) => item.id != res.id)
                      .slice(0, isMobile ? undefined : item_per_page - 1),
                    res,
                  ]);
                  setShow(false);
                  setPopUp({
                    show: true,
                    loader: false,
                    type: "success",
                    children: "Votre operation a été bien éffectuée",
                  });
                } else {
                  setPopUp({
                    ...popUp,
                    show: true,
                    loader: false,
                    type: "danger",
                    children:
                      "Veuillez vérifier vos informations ou réessayer plus tard",
                  });
                }
              },
            });
          }}
        >
          <div className="grid md:grid-cols-2 md:gap-5 gap-3 mb-8">
            <Input
              type="text"
              required
              autoFocus
              value={df?.name}
              onChange={(e) => {
                setDf({ ...df, name: e.target.value });
              }}
              placeholder="Chain d'hotels......"
            >
              Hotel :
            </Input>
            <Input
              required
              type="text"
              value={df?.address}
              onChange={(e) => {
                setDf({ ...df, address: e.target.value });
              }}
              placeholder="Adresse....."
            >
              Adresse :
            </Input>

            <div className="md:col-span-1">
              <SearchElem
                list={df?.phoneNumbers?.map((elem) => ({ name: elem }))}
                label={"Numeros de telephones :"}
                // dataList={df?.phoneNumbersList}
                // dataPrint="name"
                listPrint="name"
                placeholder="Ajouter un numero......"
                onNew={(elem) =>
                  setDf({
                    ...df,
                    phoneNumbers: df?.phoneNumbers
                      ? [
                          ...df?.phoneNumbers.filter((item) => elem != item),
                          elem,
                        ]
                      : [elem],
                  })
                }
                onDelete={(elem) => {
                  console.log(df?.phoneNumbers);
                  setDf({
                    ...df,
                    phoneNumbers: df.phoneNumbers.filter(
                      (item) => elem?.name != item
                    ),
                  });
                }}
              />
            </div>
            <div className="inline-flex justify-center items-center ">
              {[1, 2, 3, 4, 5].map((item) => (
                <svg
                  className={
                    "w-10 h-10 " +
                    (df?.stars > item - 1 ? "text-yellow-500" : "text-gray-400")
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={async () => {
                    setDf({ ...df, stars: item });
                  }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="md:col-span-1">
              <SearchElem
                list={df?.emails?.map((elem) => ({ name: elem }))}
                label={"Emails :"}
                // dataList={df?.phoneNumbersList}
                // dataPrint="name"
                listPrint="name"
                placeholder="Ajouter un numero......"
                onNew={(elem) =>
                  setDf({
                    ...df,
                    emails: df?.emails
                      ? [...df?.emails.filter((item) => elem != item), elem]
                      : [elem],
                  })
                }
                onDelete={(elem) => {
                  console.log(df?.emails);
                  setDf({
                    ...df,
                    emails: df.emails.filter((item) => elem?.name != item),
                  });
                }}
              />
            </div>
            <div className="md:col-span-1">
              <SearchElem
                list={df?.managers}
                label={"Managers :"}
                dataList={df?.managersList}
                dataPrint="name"
                listPrint="name"
                placeholder="Ajouter un manager......"
                minCarac={2}
                onSearch={async (elem) => {
                  const body = {
                    select: {
                      name: true,
                      username: true,
                      id: true,
                    },
                    where: {
                      name: {
                        contains: elem ? elem : undefined,
                        mode: "insensitive",
                      },
                    },
                  };

                  const res = await fetcher(
                    "/api/find/" + "user",
                    body,
                    setPopUp
                  );
                  if (!res.code) {
                    setDf({ ...df, managersList: res });
                  }
                }}
                onAdd={(elem) => {
                  setDf({
                    ...df,
                    managers: df?.managers?.length
                      ? [
                          ...df?.managers?.filter((item) => item.id != elem.id),
                          elem,
                        ]
                      : [elem],
                  });
                }}
                onDelete={(elem) => {
                  setDf({
                    ...df,
                    managers: df.managers.filter((item) => elem?.id != item.id),
                  });
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
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
          </div>
        </form>
      </Modal>
      <PopUp
        show={popUp.show && !popUp.typeButton}
        loader={popUp.loader}
        onClose={() => {
          setPopUp({ ...popUp, show: false, type: "info" });
        }}
        type={popUp.type}
      >
        {popUp.children}
      </PopUp>
      <PopUpBtn
        show={popUp.show && popUp.typeButton}
        onClose={() => {
          setPopUp({ ...popUp, show: false, type: "info" });
        }}
        onConfirm={async () => await popUp.function()}
        onCancel={() => {
          setPopUp({ ...popUp, show: false, type: "info" });
        }}
        type={popUp.type}
      >
        {popUp.children}
      </PopUpBtn>
    </>
  );
}
