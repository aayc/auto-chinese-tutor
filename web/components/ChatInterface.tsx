import { useState, useEffect } from "react";
import { queryTutor } from "../util/client";
import { constructTutorPrompt, getInitialMessage } from "../util/langchain";
import ChatInterfaceMessageBar from "./ChatInterfaceMessageBar";
import { User } from "firebase/auth";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import {
  database,
  pushMessageToConversation,
  clearConversation,
  createNewConversation,
} from "../util/firebase";
import ChatInterfaceMessageHistory, {
  HistoryItem,
} from "./ChatInterfaceMessageHistory";
import moment from "moment";
import ChatInterfaceConversationHistory from "./ChatInterfaceConversationHistory";
import QuickFlashcardAdder from "./QuickFlashcardAdder";

type ChatInterfaceProps = {
  user: User;
};

export default function ChatInterface(props: ChatInterfaceProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [conversationTitle, setConversationTitle] = useState("");
  const [conversationDate, setConversationDate] = useState<Date | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, loadingConversations, errorConversations] = useList(
    ref(database, `${props.user.uid}/conversations`)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadingConversations && !errorConversations && conversations) {
      if (conversations.length == 0) {
        createNewConversation(props.user);
      } else if (!conversationId) {
        setConversationId(conversations[0].key);
      } else {
        // Conversation ID already set
      }
    }
  }, [conversations]);

  useEffect(() => {
    if (conversationId) {
      const title = conversations
        ?.filter((conversation) => conversation.key == conversationId)[0]
        .val().title;
      const date = conversations
        ?.filter((conversation) => conversation.key == conversationId)[0]
        .val().created;
      setConversationTitle(title);
      setConversationDate(date);
    }
  }, []);

  const handleClear = async (e: any) => {
    if (!loading) {
      e.preventDefault();
      if (conversationId) {
        await clearConversation(props.user, conversationId);
        await pushMessageToConversation(props.user, conversationId, {
          author: "Tutor",
          message: getInitialMessage(),
        });
      }
    }
  };

  const sendMessageToTutor = async (prompt: string) => {
    if (!loading && conversationId) {
      // instead, push to the firebase database conversation
      const selfMessage: HistoryItem = { author: "You", message: prompt };
      const currentHistory = JSON.parse(JSON.stringify(history));
      await pushMessageToConversation(props.user, conversationId, selfMessage);

      setLoading(true);
      try {
        const response = await queryTutor(
          constructTutorPrompt([...history, selfMessage])
        );
        const tutorMessage = {
          author: "Tutor",
          message: response.response_text,
        };
        await pushMessageToConversation(
          props.user,
          conversationId,
          tutorMessage
        );
      } catch (e) {
        alert("exception querying deepprompt service: " + e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex max-w-7xl px-6 m-auto justify-between min-h-screen">
      <div>
        <div>
          <ChatInterfaceConversationHistory
            user={props.user}
            currentConversationId={conversationId || ""}
            conversations={conversations}
            onChangeConversation={setConversationId}
          ></ChatInterfaceConversationHistory>
        </div>
        <div className="mt-8">
        <QuickFlashcardAdder user={props.user} />
        </div>
        
      </div>
      <div className="w-full max-w-3xl mb-24 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-sm">{conversationTitle}</p>
            <p className="text-sm">
              {conversationDate &&
                moment(conversationDate).format("MM-DD-YYYY")}
            </p>
          </div>
          <ChatInterfaceMessageHistory
            user={props.user}
            showLoadingDots={loading || loadingConversations}
            conversationId={conversationId}
            onHistoryChange={setHistory}
          ></ChatInterfaceMessageHistory>
        </div>
        <ChatInterfaceMessageBar
          loading={loading}
          onSubmit={sendMessageToTutor}
          onClear={handleClear}
        ></ChatInterfaceMessageBar>
      </div>
    </div>
  );
}

export type { HistoryItem };
