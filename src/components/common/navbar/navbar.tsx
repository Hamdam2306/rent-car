import { SlidersHorizontal } from "lucide-react";
import { FaHeart, FaBell, FaCog } from "react-icons/fa";
import { FiSearch, FiFilter } from "react-icons/fi";

interface navbarProps {
  title: string;
  date: string;
  onSortProps: Boolean;
  setOnSortProps: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({
  title,
  date,
  setOnSortProps,
  onSortProps,
}: navbarProps) {
  return (
    <>
      <div className="md:py-8 gap-4 py-6 md:px-8 px-5 flex md:items-center items-start justify-between w-full md:flex-row flex-col  max-w-[1440px]">
        <div className="flex items-center gap-4 ">
          <svg
            className="w-[32px]"
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3334 11.1666H10.6667V21.8333H21.3334V11.1666Z"
              fill="#7C5CFC"
            />
            <path
              opacity="0.4"
              d="M6.66675 29.8334C8.86675 29.8334 10.6667 28.0334 10.6667 25.8334V21.8334H6.66675C4.46675 21.8334 2.66675 23.6334 2.66675 25.8334C2.66675 28.0334 4.46675 29.8334 6.66675 29.8334Z"
              fill="#7C5CFC"
            />
            <path
              opacity="0.4"
              d="M6.66675 11.1666H10.6667V7.16663C10.6667 4.96663 8.86675 3.16663 6.66675 3.16663C4.46675 3.16663 2.66675 4.96663 2.66675 7.16663C2.66675 9.36663 4.46675 11.1666 6.66675 11.1666Z"
              fill="#7C5CFC"
            />
            <path
              opacity="0.4"
              d="M21.3333 11.1666H25.3333C27.5333 11.1666 29.3333 9.36663 29.3333 7.16663C29.3333 4.96663 27.5333 3.16663 25.3333 3.16663C23.1333 3.16663 21.3333 4.96663 21.3333 7.16663V11.1666Z"
              fill="#7C5CFC"
            />
            <path
              opacity="0.4"
              d="M25.3333 29.8334C27.5333 29.8334 29.3333 28.0334 29.3333 25.8334C29.3333 23.6334 27.5333 21.8334 25.3333 21.8334H21.3333V25.8334C21.3333 28.0334 23.1333 29.8334 25.3333 29.8334Z"
              fill="#7C5CFC"
            />
          </svg>

          <span className="font-semibold md:text-[32px] text-[20px] text-gray-900">
            {title}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Last Updated:
          <span className="font-semibold text-black"> {date}</span>
        </div>
      </div>
      <div className="w-full shadow-2xs bg-white flex justify-center">
        <div className="max-w-[1440px] w-full  md:px-15 md:py-10 px-6 py-8">
          <div className="flex items-center justify-between">
            <div
              onClick={() => setOnSortProps(false)}
              className="text-blue-600 font-bold text-[24px] md:text-[32px]"
            >
              MORRENT
            </div>

            <div className="hidden md:flex flex-1 mx-10 max-w-xl">
              <div className="flex items-center w-full border rounded-full px-4 py-2 gap-2 border-gray-400">
                <FiSearch className="text-gray-400" />
                <input
                  onClick={() => setOnSortProps(!onSortProps)}
                  type="text"
                  placeholder="Search something here"
                  className="flex-1 outline-none "
                />
                <SlidersHorizontal color="#596780" size="24px" />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="size-11 hidden md:flex items-center justify-center border border-gray-200 rounded-[50%] ">
                <FaHeart className="text-gray-600 cursor-pointer" />
              </div>

              <div className="relative size-11 hidden md:flex items-center justify-center border border-gray-200 rounded-[50%]">
                <FaBell className="text-gray-600 cursor-pointer" />
                <span className="absolute -top-0 -right-0 w-3 h-3 bg-red-500 rounded-full" />
              </div>

              <div className="size-11 hidden md:flex items-center justify-center border border-gray-200 rounded-[50%]">
                <FaCog className="text-gray-600 cursor-pointer" />
              </div>
              <img
                src="src\assets\icons\Profil.png"
                className="size-7 md:size-11 "
                alt=""
              />
            </div>
          </div>
          <div className=" flex md:hidden mt-8 gap-2">
            <div className="flex items-center gap-2 w-full border rounded-[10px] px-4 py-2 border-gray-400">
              <FiSearch className="text-gray-400 " />
              <input
                type="text"
                placeholder="Search something here"
                className="flex-1 outline-none "
              />
            </div>
            <div className="flex items-center size-12  border rounded-[10px] px-4 py-2 border-gray-400">
              <SlidersHorizontal color="#596780" size="24px" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
