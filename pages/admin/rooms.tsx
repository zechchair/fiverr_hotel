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

const database = "room";
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
  const data: Prisma.roomUncheckedCreateInput[] = await prisma[
    database
  ].findMany({
    take: item_per_page,
    where: { hotelId: Number(context.query.id) },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  const Count = await prisma[database].count();
  return {
    props: {
      initialData: data,
      Count: Count,
      hotelId: Number(context.query.id),
      hotelName: context.query.name,
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
  const [data, setData] = useState<Prisma.roomUncheckedCreateInput[]>(
    props.initialData
  );

  const [count, setCount] = useState(props.Count);

  async function goToPg(newPg: number = 1) {
    setSelectedPage(newPg);
    console.log(filter?.vue);
    const body = {
      take: item_per_page,
      skip: item_per_page * (newPg - 1),
      where: {
        hotelId: Number(props.hotelId),
        N: filter?.N ? { contains: filter?.N, mode: "insensitive" } : undefined,
        capacity: filter?.capacity
          ? { contains: filter?.capacity, mode: "insensitive" }
          : undefined,
        // commodities
        vue: filter?.vue
          ? { contains: filter?.vue, mode: "insensitive" }
          : undefined,
        extend: filter?.extend,
        reserved: filter?.reserved,
        price: { lte: filter?.maxPrice, gte: filter?.minPrice },
        // commodities :{hasEvery:["TV","tv"]},
        problems: filter?.problems
          ? { contains: filter?.problems, mode: "insensitive" }
          : undefined,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
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
              router.back()
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
          <Title>Chambres de la l'hotel {props.hotelName}</Title>
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
                <form className="p-4 grid md:grid-cols-2 md:gap-5 gap-3">
                  <Input
                    type="text"
                    value={filter?.N}
                    onChange={(e) => {
                      setFilter({ ...filter, N: e.target.value });
                    }}
                    placeholder="N°......"
                  >
                    <div className="text-md font-semibold">N° :</div>
                  </Input>
                  <Input
                    type="text"
                    value={filter?.vue}
                    onChange={(e) => {
                      setFilter({ ...filter, vue: e.target.value });
                    }}
                    placeholder="Vue....."
                  >
                    <div className="text-md font-semibold">Vue :</div>
                  </Input>
                  <Input
                    type="number"
                    value={Number(filter?.minPrice)}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        minPrice: e.target.value,
                      });
                    }}
                  >
                    <div className="text-md font-semibold">Prix min :</div>
                  </Input>
                  <Input
                    type="number"
                    value={Number(filter?.maxPrice)}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        maxPrice: e.target.value,
                      });
                    }}
                  >
                    <div className="text-md font-semibold">Prix max :</div>
                  </Input>{" "}
                  <SearchElem
                    list={filter?.commodities?.map((elem) => ({ name: elem }))}
                    label={"commodities :"}
                    // dataList={df?.phoneNumbersList}
                    // dataPrint="name"
                    listPrint="name"
                    placeholder="Ajouter une commoditie......"
                    onNew={(elem) =>
                      setFilter({
                        ...filter,
                        commodities: filter?.commodities
                          ? [
                              ...filter?.commodities.filter(
                                (item) => elem != item
                              ),
                              elem,
                            ]
                          : [elem],
                      })
                    }
                    onDelete={(elem) => {
                      setFilter({
                        ...filter,
                        commodities: filter.commodities.filter(
                          (item) => elem?.name != item
                        ),
                      });
                    }}
                  />
                  <Input
                    type="text"
                    value={filter?.problems}
                    onChange={(e) => {
                      setFilter({ ...filter, problems: e.target.value });
                    }}
                    placeholder="Problemes....."
                  >
                    <div className="text-md font-semibold">Problemes :</div>
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
              reservedShow: (
                <>
                  {item.reserved ? (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded">
                      Oui
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded">
                      Non
                    </span>
                  )}
                </>
              ),
              extendShow: (
                <>
                  {item.extend ? (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded">
                      Oui
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded">
                      Non
                    </span>
                  )}
                </>
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
              commoditiesShow: item?.commodities?.map((elem) => " - " + elem),
            }))}
          cols={{
            N: { name: "N° " },
            capacity: { name: "La capacité" },
            price: { name: "Prix" },
            commoditiesShow: { name: "Les commodités ", overflowHidden: true },
            vue: { name: "La vue" },
            problems: { name: "Les problemes", overflowHidden: true },
            extendShow: { name: "Etendue", center: true },
            reservedShow: { name: "Reservée", center: true },

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
                const body: Prisma.roomUpsertArgs = {
                  where: {
                    id: df?.id ? df?.id : 0,
                  },
                  update: {
                    N: df?.N,
                    price: Number(df?.price),
                    capacity: df?.capacity,
                    commodities: df?.commodities,
                    vue: df?.vue,
                    extend: df?.extend,
                    problems: df?.problems,
                    reserved: df?.reserved,
                  },
                  create: {
                    N: df?.N,

                    price: Number(df?.price),
                    capacity: df?.capacity,
                    commodities: df?.commodities,
                    vue: df?.vue,
                    extend: df?.extend,
                    problems: df?.problems,
                    reserved: df?.reserved,
                    hotel: {
                      connect: { id: props.hotelId },
                    },
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
              value={df?.N}
              onChange={(e) => {
                setDf({ ...df, N: e.target.value });
              }}
              placeholder="N°......"
            >
              N :
            </Input>
            <Input
              type="number"
              required
              autoFocus
              value={df?.price}
              onChange={(e) => {
                setDf({ ...df, price: e.target.value });
              }}
              placeholder="Prix......"
            >
              Prix :
            </Input>
            <Input
              required
              type="text"
              value={df?.capacity}
              onChange={(e) => {
                setDf({ ...df, capacity: e.target.value });
              }}
              placeholder="Capacity....."
            >
              Capacity :
            </Input>
            <Input
              type="text"
              value={df?.vue}
              onChange={(e) => {
                setDf({ ...df, vue: e.target.value });
              }}
              placeholder="Vue....."
            >
              vue :
            </Input>
            <Input
              type="text"
              value={df?.problems}
              onChange={(e) => {
                setDf({ ...df, problems: e.target.value });
              }}
              placeholder="Problems....."
            >
              Problems :
            </Input>
            <div className="md:col-span-1">
              <SearchElem
                list={df?.commodities?.map((elem) => ({ name: elem }))}
                label={"commodities :"}
                // dataList={df?.phoneNumbersList}
                // dataPrint="name"
                listPrint="name"
                placeholder="Ajouter une commoditie......"
                onNew={(elem) =>
                  setDf({
                    ...df,
                    commodities: df?.commodities
                      ? [
                          ...df?.commodities.filter((item) => elem != item),
                          elem,
                        ]
                      : [elem],
                  })
                }
                onDelete={(elem) => {
                  setDf({
                    ...df,
                    commodities: df.commodities.filter(
                      (item) => elem?.name != item
                    ),
                  });
                }}
              />
            </div>
            <Input
              labels={ouiNon}
              label="name"
              type="radio"
              id={10}
              value={df?.reserved}
              select={df?.reserved}
              onChange={(e) => {
                setDf({
                  ...df,
                  reserved: e.target.value == "true",
                });
              }}
            >
              <div className="text-md font-semibold">Chambre reservée :</div>
            </Input>
            <Input
              labels={ouiNon}
              label="name"
              id={2}
              type="radio"
              value={df?.extend}
              select={df?.extend}
              onChange={(e) => {
                setDf({
                  ...df,
                  extend: e.target.value == "true",
                });
              }}
            >
              <div className="text-md font-semibold">Chambre étendue :</div>
            </Input>
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
