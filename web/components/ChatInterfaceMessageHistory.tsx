import { useEffect, useState } from "react";
import { getInitialMessage } from "../util/langchain";
import { User } from "firebase/auth";
import { ref } from "firebase/database";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { database, pushMessageToConversation } from "../util/firebase";
import LoadingDots from "./LoadingDots";
import MessageBubble from "./MessageBubble";

type ChatInterfaceHistoryProps = {
  user: User;
  conversationId: string | null;
  showLoadingDots: boolean;
  onHistoryChange: (history: HistoryItem[]) => void;
};

type HistoryItem = {
  author: "You" | "Tutor";
  message: string;
};

export default function ChatInterfaceHistory(props: ChatInterfaceHistoryProps) {
  const [conversation, loading, error] = useListVals<HistoryItem>(
    ref(
      database,
      `${props.user.uid}/conversation_messages/${props.conversationId}`
    )
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (loading || error) {
      // Still loading...
    } else if (conversation && conversation.length > 0) {
      setHistory(conversation);
    } else if (props.conversationId) {
      const tutorMessage: HistoryItem = { author: "Tutor", message: getInitialMessage() }
      setHistory([tutorMessage]);
      pushMessageToConversation(props.user, props.conversationId, tutorMessage)
    } else {
      //console.log("can't initialize, conversationId is null")
    }
  }, [conversation]);

  useEffect(() => {
    props.onHistoryChange(history);
  }, [history]);

  return (
    <div className="w-full">
      {props.conversationId &&
        !loading &&
        !error &&
        history.map(({ author, message }, index) => (
          <MessageBubble
            key={`${author}-${index}`}
            author={author}
            message={message}
          ></MessageBubble>
        ))}
      <div className="flex justify-center">
        <LoadingDots loading={loading || props.showLoadingDots}></LoadingDots>
      </div>
    </div>
  );
}

export type { HistoryItem };
