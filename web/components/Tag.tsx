type TagProps = {
  name: string;
  className?: string;
  selected: boolean;
  onClick: () => void;
};

export default function Tag(props: TagProps) {
  const lighterShade = "200";
  const darkerShade = "500";
  return (
    <span
      className={`transition ease-in-out duration-200 hover:opacity-70 rounded-lg px-4 py-2 text-xs font-bold mr-2 mb-2 cursor-pointer ${
        props.selected
          ? "bg-blue-200 text-blue-600 "
          : `bg-gray-200 text-gray-600`
      } ${props.className}`}
      onClick={props.onClick}
    >
      {props.name}
    </span>
  );
}
