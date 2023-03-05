export default function LoadingDots({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div>
        <div className="ml-8 loader-dots block relative w-20 h-5 mt-4 text-center">
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
