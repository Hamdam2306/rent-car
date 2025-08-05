import { useState } from "react";
import { Navbar } from "../../components/common/navbar/navbar";
import { SortMenu } from "./sort-menu";

export default function Home() {
  const [onSort, setOnSort] = useState(false);
  return (
    <div className="flex flex-col min-h-screen items-center h-screen overflow-auto custom-scroll min-w-[375px]">
      <Navbar
        title="High Fidelity Dashboard – Home Rent"
        date="8 Aug 2022"
        onSortProps={onSort}
        setOnSortProps={setOnSort}
      />
      <div className="flex h-[max-content] justify-start w-full ">
        <div className={`${!onSort ? "hidden md:flex" : "hidden"} `}>
          <SortMenu />
        </div>
      </div>
    </div>
  );
}
