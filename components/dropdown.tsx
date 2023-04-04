import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames"
export default function Dropdown(Props) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div >
      <button
        className={
          "inline-flex justify-center w-full px-3  py-1.5 lg:py-1.5 text-xs lg:text-sm font-medium text-white bg-purple-400 rounded-full hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        }
        onClick={() => setIsOpen(true)}
      >
        <span>Filtres</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 my-auto ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
		  className=" inline-block text-left"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
				as="div"
                  className={cn(
                    "bg-gray-50 md:w-2/3 lg:w-1/3 mt-2 w-11/12 sm:w-2/3 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"

  )}
                >
              
                  <div className="pb-2 py-2">
                    <div>{Props.children}</div>
                    <button
                      type="button"
                      className="text-sm float-right font-medium text-white py-1 px-3 my-4 mr-4 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={() => {
                        Props.onClick();
                      }}
                    >
                      Filtrer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
