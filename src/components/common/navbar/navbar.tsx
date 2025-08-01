import { CalendarDays } from "lucide-react";

interface navbarProps {
  title: string;
  date: string;
  subtitle?: string;
}

export function Navbar({ title, date, subtitle }: navbarProps) {
  return (
    <div className="sm:py-8 gap-4 py-6 sm:px-8 px-5 flex sm:items-center items-start justify-between w-full sm:flex-row flex-col  max-w-[1440px]">
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

        <span className="font-semibold sm:text-[32px] text-[20px] text-gray-900">
          {title}
        </span>
      </div>
      <div className="text-xs text-gray-500">
        Last Updated:
        <span className="font-semibold text-black"> {date}</span>
      </div>
    </div>
  );
}
