import { useState, useEffect } from "react";
import { queryLanguage, queryPinyin, queryTranslation } from "../util/client";

export default function QuickFlashcardAdder() {
  const [added, setAdded] = useState(false);
  const [definition, setDefinition] = useState<string | undefined>(undefined);
  const [pinyin, setPinyin] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const [selectedText, setSelectedText] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    window.addEventListener("mouseup", checkSelectedText);
    return () => {
      window.removeEventListener("mouseup", checkSelectedText);
    };
  }, []);

  const checkSelectedText = async () => {
    if (window.getSelection) {
      const text = window.getSelection()?.toString();
      if (text && text.length > 0) {
        const languageResponse = await queryLanguage(text.trim());
        if (languageResponse.response_text !== "zh") {
          return;
        }

        const translatedPinyin = await queryPinyin(text.trim());

        if (text.trim() !== selectedText) {
          setAdded(false);
        }
        setSelectedText(text.trim());
        setDefinition("(Translating...)");
        const translation = await queryTranslation(text.trim());
        setDefinition(translation.response_text);
        setPinyin(translatedPinyin.response_text);
        setNotes("");
      }
    }
  };

  const tryAddFlashcard = async () => {
    if (selectedText && selectedText.length > 0 && definition && definition.length > 0) {
      if (!added) {
        //addFlashcard(selectedText.trim(), "zh", definition, { notes, pinyin: translateToPinyin(selectedText) })
        setAdded(true);
      } else {
        alert("This flashcard has already been added.");
      }
    } else {
      alert("Please select some text and write a definition to add a flashcard.");
    }
  };

  return (
    <div className="w-64">
      <div className="text-left">
        <span className="font-bold">Selected text:</span> {selectedText}
      </div>
      <input
        type="text"
        className="w-full h-8 text-sm mt-4 mb-2 px-2 focus:outline-none bg-gray-100 rounded-lg"
        placeholder="Definition"
        readOnly={added}
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
      />
      <input
        type="text"
        className="w-full h-8 text-sm px-2 mb-2 focus:outline-none bg-gray-100 rounded-lg"
        placeholder="Pinyin"
        autoComplete="off"
        readOnly={added}
        value={pinyin}
        onChange={(e) => setPinyin(e.target.value)}
      />
      <input
        type="text"
        className="w-full h-8 text-sm px-2 mb-2 focus:outline-none bg-gray-100 rounded-lg"
        placeholder="Notes"
        contentEditable={!added}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        className="w-full px-6 py-2 bg-blue-500 text-white transition ease-in-out duration-150 hover:opacity-70 rounded-lg"
        onClick={tryAddFlashcard}
      >
        {added ? "Added!" : "Add to flashcards"}
      </button>
    </div>
  );
}
