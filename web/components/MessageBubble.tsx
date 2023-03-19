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

function splitMessageIntoTextAndCode(message: string): string[] {
  const messageParts = message
    .split(/<code language='(.*)'>|<\/code>/)
    .filter((part) => part && part !== "");
  const textParts = messageParts.filter((part, index) => index % 3 == 0);
  const languageParts = messageParts.filter((part, index) => index % 3 == 1);
  const codeParts = messageParts.filter((part, index) => index % 3 == 2);
  const textAndCodeParts = [];
  for (let i = 0; i < textParts.length; i++) {
    textAndCodeParts.push(textParts[i]);
    if (i < codeParts.length) {
      textAndCodeParts.push(`${languageParts[i]} ${codeParts[i]}`);
    }
  }
  return textAndCodeParts;
}

export default function MessageBubble({ author, message }: MessageBubbleProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState("");
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  const colorBg = author === "You" ? "bg-white" : "bg-gray-100";
  const isAI = author !== "You";
  const messageParts = splitMessageIntoTextAndCode(message);
  const fullMessage = messageParts.map((part, index) => {
    if (index % 2 == 0) {
      return (
        <p
          key={part}
          style={{ whiteSpace: "pre-wrap" }}
          className={`w-full max-w-4xl ml-2 mr-4 break-words text-black ${colorBg}`}
        >
          {part} {showTranslation && "(" + translation + ")"}
        </p>
      );
    } else {
      const language = part.split(" ")[0];
      const code = part.split(" ").slice(1).join(" ");
      return (
        <Highlight
          {...defaultProps}
          code={code}
          theme={dracula}
          language={language as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className + " py-2 px-8"}
              style={{ ...style, backgroundColor: "rgb(45, 45, 45)" }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      );
    }
  });

  useEffect(() => {
    Prism.highlightAll();
  }, []);

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
    console.log("Query Feedback");
  };

  return (
    <div className={`${colorBg}`}>
      <div className={`flex py-2 -z-10`}>
        <div className="w-32 text-right">
          <p className="font-semibold">{author}:</p>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div>{fullMessage}</div>
            <div className="">
              {!isAI && (
                <IconButtonWithLoading
                  loading={loadingFeedback || showFeedback}
                  onClick={handleFeedback}
                >
                  <BarChart3 size={20} className="text-white"></BarChart3>
                </IconButtonWithLoading>
              )}
              <IconButtonWithLoading
                loading={loadingTranslation || showTranslation}
                onClick={handleTranslation}
                className="mx-2"
              >
                <Globe size={20} className="text-white"></Globe>
              </IconButtonWithLoading>
            </div>
          </div>

          {showFeedback && (
            <div>
              <p className="text-sm text-gray-500">Feedback:</p>
              <p className="text-sm text-gray-500">{feedback}</p>
            </div>
          )}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
