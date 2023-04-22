import { Mic, Send, RefreshCcw } from "lucide-react";
import { useState } from "react";
import IconButtonWithLoading from "./IconPrimaryButtonWithLoading";

type ChatInterfaceMessageBarProps = {
  loading: boolean;
  onSubmit: (prompt: string) => void;
  onClear: (e: any) => void;
};

export default function ChatInterfaceMessageBar(
  props: ChatInterfaceMessageBarProps
) {
  const [prompt, setPrompt] = useState("");

  const handleRecord = (e: any) => {
    if (!props.loading) {
      e.preventDefault();
      alert("Not implemented yet");
    }
  };

  const handleSubmit = (e: any) => {
    if (!props.loading) {
      e.preventDefault();
      props.onSubmit(prompt);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-3xl m-auto pb-6">
        <div className="flex w-full">
          <IconButtonWithLoading
            loading={props.loading}
            onClick={handleRecord}
            className="mr-2"
          >
            <Mic size={24} className="text-white"></Mic>
          </IconButtonWithLoading>
          <input
            type="text"
            id="message"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                props.onSubmit(prompt);
              }
            }}
            value={prompt}
            className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <IconButtonWithLoading
            loading={props.loading}
            onClick={handleSubmit}
            className="ml-2"
          >
            <Send size={24} className="text-white"></Send>
          </IconButtonWithLoading>
          <IconButtonWithLoading
            loading={props.loading}
            onClick={props.onClear}
            className="ml-2"
          >
            <RefreshCcw size={24} className="text-white"></RefreshCcw>
          </IconButtonWithLoading>
        </div>
      </div>
    </div>
  );
}
