import { useState, useEffect } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import IconButtonWithLoading from "./IconPrimaryButtonWithLoading";
import Prism from 'prismjs'
import Highlight, { defaultProps } from "prism-react-renderer"
import dracula from 'prism-react-renderer/themes/dracula';

type MessageBubbleProps = {
  author: "You" | "AI";
  message: string;
};

function splitMessageIntoTextAndCode(message: string): string[] {
  const messageParts = message.split(/<code language='(.*)'>|<\/code>/).filter((part) => part && part !== "");
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

export default function MessageBubble({
  author,
  message,
}: MessageBubbleProps) {
  const [providedFeedback, setProvidedFeedback] = useState(false);
  const colorBg = author === "You" ? "bg-white" : "bg-gray-100";
  const messageParts = splitMessageIntoTextAndCode(message);
  console.log(messageParts)

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={`${colorBg}`}>
      <div className={`flex py-2 -z-10`}>
        <div className="w-32 text-right">
          <p className="font-semibold">{author}:</p>
        </div>
        <div>
        {messageParts.map((part, index) => {
          if (index % 2 == 0) {
            return (
              <p key={part}
                style={{ whiteSpace: "pre-wrap" }}
                className={`w-full max-w-4xl ml-2 mr-4 break-words text-black ${colorBg}`}
              >
                {part}
              </p>
            );
          } else {
            const language = part.split(" ")[0];
            const code = part.split(" ").slice(1).join(" ");
            return (<Highlight {...defaultProps} code={code} theme={dracula} language={language as any}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className + " py-2 px-8"} style={{ ...style, backgroundColor: "rgb(45, 45, 45)"}}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
            )}</Highlight>)
          }
        })}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
