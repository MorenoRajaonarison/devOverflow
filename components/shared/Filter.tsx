"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

function Filter({ filters, otherClasses, containerClasses }: Props) {
  return (
    <div className={`relative ${containerClasses} max-sm:w-full`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_darkgradient text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.name}
                value={filter.value}
                className="text-dark500_light700 background-light800_darkgradient cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
