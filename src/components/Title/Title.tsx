interface TitleProps {
  subTitle: string;
  title: string;
  description: string;
}

function Title({ subTitle, title, description }: TitleProps) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-xs font-medium bg-primary-light py-1.5 px-4 rounded-full">
        {subTitle}
      </p>
      <p className="text-center text-primary text-4xl font-semibold">{title}</p>
      <p className="text-center ">{description}</p>
    </div>
  );
}

export default Title;
