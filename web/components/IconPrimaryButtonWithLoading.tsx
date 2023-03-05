export default function IconButtonWithLoading({
  children,
  className,
  loading,
  onClick,
}: {
  children: any;
  className?: string;
  loading: boolean;
  onClick: any;
}) {
  return (
    <button
      className={`button-primary p-2 ${className} ${
        !loading
          ? "bg-blue-500 hover:bg-blue-700 cursor-pointer"
          : "bg-gray-500 opacity-50"
      }`}
      onClick={(e: any) => onClick(e)}
    >
      {children}
    </button>
  );
}
