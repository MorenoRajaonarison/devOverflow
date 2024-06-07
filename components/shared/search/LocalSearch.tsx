"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

function LocalSearch({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 max-sm:w-full ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="search icons"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          className="cursor-pointer"
          alt="search icons"
        />
      )}
    </div>
  );
}

export default LocalSearch;
