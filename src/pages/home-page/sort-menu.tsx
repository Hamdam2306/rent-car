import { Radius } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export const SortMenu = () => {
  const [maxPrice, setMaxPrice] = useState(100);

  const types = [
    { label: "Sport", count: 10 },
    { label: "SUV", count: 12 },
    { label: "MPV", count: 16 },
    { label: "Sedan", count: 20 },
    { label: "Coupe", count: 14 },
    { label: "Hatchback", count: 14 },
  ];

  const capacities = [
    { label: "2 Person", count: 10 },
    { label: "4 Person", count: 14 },
    { label: "6 Person", count: 12 },
    { label: "8 or More", count: 16 },
  ];

  return (
    <menu className="flex flex-col max-w-[360px] gap-14  p-8 bg-white shadow-sm h-[100%] ">
      <div className="flex flex-col gap-8 w-[176px]">
        <h3 className="text-gray-300 text-3">Type</h3>
        {types.map((item) => (
          <label
            key={item.label}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox />
            <p className="text-gray-600 font-[700] text-5">
              {item.label} <span className="text-gray-300">({item.count})</span>
            </p>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-8 w-[176px]">
        <h3 className="text-gray-300 text-3">Capacity</h3>
        {capacities.map((item) => (
          <label
            key={item.label}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox />
            <p className="text-gray-600 font-[700] text-5">
              {item.label} <span className="text-gray-300">({item.count})</span>
            </p>
          </label>
        ))}
      </div>
      <div>
        <h3 className="text-gray-300 text-3 mb-7">Price</h3>
        <Slider
          onValueChange={(value) => setMaxPrice(value[0])}
          defaultValue={[100]}
          max={150}
          step={1}
          className="w-[296px]
   "
        />
        <div className="text-gray-600 font-[700] text-5">
          Max: ${maxPrice}.00
        </div>
      </div>
    </menu>
  );
};
