import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  value: number | string;
  title: string;
  textStyles?: string;
  alt: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  value,
  title,
  textStyles,
  isAuthor,
  alt,
  href,
}: Props) => {
  const contentMetric = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`flex items-center gap-1 ${textStyles}`}>
        {value}{" "}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {contentMetric}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1">{contentMetric}</div>;
};

export default Metric;
