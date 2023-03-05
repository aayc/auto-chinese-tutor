import { useState, useRef } from "react";
import { Send, Mic, RefreshCcw } from "lucide-react";
import LoadingDots from "../components/LoadingDots";
import IconButtonWithLoading from "../components/IconPrimaryButtonWithLoading";
import MessageBubble from "../components/MessageBubble";
import SuggestionTag from "./SuggestionTag";
import { queryTutor } from "../util/client";
import { constructTutorPrompt, getInitialMessage } from "../util/langchain";

type HistoryItem = {
  author: "You" | "AI";
  message: string;
};

type ChatInterfaceProps = {
  userToken: string;
  sessionId: string;
  version: string;
};

// TODO add "show translation button", "get feedback button"
export default function ChatInterface() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([{ author: "AI", message: getInitialMessage()}]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef: any = useRef(null);
  const suggestionTemplates = [
    "你好！",
    "我最近很忙",
    "我有一個問題： ..."
  ];

  const queryChineseTutor = async (
    conversationSoFar: HistoryItem[]
  ) => {
    try {
      const response = await queryTutor(constructTutorPrompt(conversationSoFar));
      handleReply(response.response_text.trim(), conversationSoFar);
    } catch (e) {
      alert("exception querying deepprompt service: " + e);
    }
  };

  const handleReply = (reply: string, historyWithUser: HistoryItem[]) => {
    const historyWithBot: HistoryItem[] = [
      ...historyWithUser,
      { author: "AI", message: reply },
    ];
    setHistory(historyWithBot);
    setLoading(false);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClear = (e: any) => {
    if (!loading) {
      e.preventDefault();
      setHistory([]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRecord = (e: any) => {
    if (!loading) {
      e.preventDefault();
      alert("Not implemented yet");
    }
  };

  const handleSubmit = (e: any) => {
    if (!loading) {
      e.preventDefault();
      const historyWithUser = [
        ...history,
        { author: "You", message: prompt } as HistoryItem,
      ];
      setHistory(historyWithUser);
      setPrompt("");
      setLoading(true);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      queryChineseTutor(historyWithUser);
    }
  };

  const useSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="max-w-5xl m-auto mb-48">
      <div className="w-full">
        {history.map(({ author, message }, index) => (
          <MessageBubble
            key={`${author}-${index}`}
            author={author}
            message={message}
          ></MessageBubble>
        ))}
        <div className="flex justify-center">
          <LoadingDots loading={loading}></LoadingDots>
        </div>
      </div>
      <div ref={messagesEndRef} />

      <div className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full bg-white">
        <div className="max-w-3xl m-auto pb-6">
          <div className="flex flex-wrap">
            {suggestionTemplates.map((text) => (
              <SuggestionTag
                key={text}
                text={text}
                onClick={() => useSuggestion(text)}
              ></SuggestionTag>
            ))}
          </div>
          <div className="flex w-full">
            <IconButtonWithLoading loading={loading} onClick={handleRecord} className="mr-2">
              <Mic size={24} className="text-white"></Mic>
            </IconButtonWithLoading>
            <input
              type="text"
              id="message"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              value={prompt}
              className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            <IconButtonWithLoading loading={loading} onClick={handleSubmit} className="ml-2">
              <Send size={24} className="text-white"></Send>
            </IconButtonWithLoading>
            <IconButtonWithLoading loading={loading} onClick={handleClear} className="ml-2">
              <RefreshCcw size={24} className="text-white"></RefreshCcw>
            </IconButtonWithLoading>
          </div>
          <div className="text-gray-400 text-xs text-center mt-2">
            <p>Copyright 2023 Aaron Chan</p>
            <p className="mt-1">
              My goal is to make this a useful tool for learning Chinese.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { HistoryItem }
