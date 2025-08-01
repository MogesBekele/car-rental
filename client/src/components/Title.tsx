const Title = ({
  title,
  subTitle,
  align,
}: {
  title: string;
  subTitle: string;
  align?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center
      ${align === "left" && "md:items-start md:text-left"}
    `}
    >
      <h1 className="font-semibold text-4xl md:text-[40px]">{title}</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-90 font-light">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
