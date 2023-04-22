import { useState, useEffect } from "react";
import { Globe, BarChart3 } from "lucide-react";
import IconButtonWithLoading from "./IconPrimaryButtonWithLoading";
import Prism from "prismjs";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";
import { constructFeedbackPrompt } from "../util/langchain";
import { queryFeedback, queryTranslation } from "../util/client";

type MessageBubbleProps = {
  author: "You" | "Tutor";
  message: string;
};

export default function MessageBubble({ author, message }: MessageBubbleProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState("");
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  const colorBg = author === "You" ? "bg-white" : "bg-gray-100";
  const isAI = author !== "You";

  const handleTranslation = async (e: any) => {
    e.preventDefault();
    try {
      setLoadingTranslation(true);
      const translation = await queryTranslation(message);
      setShowTranslation(!showTranslation);
      setTranslation(translation.response_text);
      setLoadingTranslation(false);
    } catch (e) {
      alert("exception querying translation: " + e);
    }
  };

  const handleFeedback = async (e: any) => {
    e.preventDefault();
    try {
      setLoadingFeedback(true);
      const feedback = await queryFeedback(constructFeedbackPrompt(message));
      setFeedback(feedback.response_text);
      setShowFeedback(true);
      setLoadingFeedback(false);
    } catch (e) {
      alert("exception querying tutor: " + e);
    }
  };

  return (
    <div className={`${colorBg}`}>
      <div className={`flex py-2 -z-10`}>
        <div className="w-16 text-right">
          <p className="text-md font-semibold" style={{ fontSize: "12pt"}}>{author}:</p>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
        <div
          className={`w-full ml-2 mr-4 break-words text-black ${colorBg}`}
        >
          <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
          {showTranslation && "(" + translation + ")"}
          {showFeedback && (
            <div>
              <p className="text-sm text-gray-500">Feedback:</p>
              <p className="text-sm text-gray-500">{feedback}</p>
            </div>
          )}
        </div>
            <div className="flex">
              {!isAI && (
                <IconButtonWithLoading
                  loading={loadingFeedback || showFeedback}
                  onClick={handleFeedback}
                  className="h-9"
                >
                  <BarChart3 size={20} className="text-white"></BarChart3>
                </IconButtonWithLoading>
              )}
              <IconButtonWithLoading
                loading={loadingTranslation || showTranslation}
                onClick={handleTranslation}
                className="mx-2 h-9"
              >
                <Globe size={20} className="text-white"></Globe>
              </IconButtonWithLoading>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
