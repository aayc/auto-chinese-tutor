type SuggestionTagProps = {
  text: string;
  onClick: () => void;
};

export default function SuggestionTag({ text, onClick }: SuggestionTagProps) {
  return (
    <div
      className="transition duration-200 ease-in-out border-2 border-gray-300 rounded-full font-bold px-4 py-2 text-sm text-blue-700 mr-2 mb-2 hover:opacity-50 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
}
