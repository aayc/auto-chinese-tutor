import React, { useState } from "react";
import { DataSnapshot } from "firebase/database";
import { Edit, Trash, PlusCircle } from "lucide-react";
import moment from "moment";
import GenericModal from "./modals/GenericModal";
import {
  createNewConversation,
  deleteConversation,
  editConversationTitle,
} from "../util/firebase";
import { User } from "firebase/auth";

type ChatInterfaceConversationHistoryProps = {
  user: User;
  currentConversationId: string;
  conversations: DataSnapshot[] | undefined;
  onChangeConversation: (conversationId: string) => void;
};

export default function ChatInterfaceConversationHistory(
  props: ChatInterfaceConversationHistoryProps
) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editedConversationTitle, setEditedConversationTitle] =
    useState<string>("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const tryDeleteConversation = (conversationId: string | null) => {
    if (conversationId) {
      deleteConversation(props.user, conversationId);
      setShowDeleteModal(false);
    }
  };

  const tryEditConversationTitle = (
    conversationId: string | null,
    newTitle: string
  ) => {
    if (conversationId) {
      editConversationTitle(props.user, conversationId, newTitle);
      setEditedConversationTitle("");
      setShowEditModal(false);
    } else {
      alert(
        "Error: no conversation selected when attempting to edit conversation title."
      );
    }
  };

  const changeConversation = (conversationId: string | null) => {
    if (conversationId) {
      props.onChangeConversation(conversationId);
    }
  };

  const newConversation = () => {
    createNewConversation(props.user);
  };

  const setupModal = (conversationId: string | null, showModalFn: any) => {
    setSelectedConversation(conversationId);
    showModalFn(true);
  };

  return (
    <div>
      <GenericModal
        title="Are you sure you want to delete this conversation?"
        showModal={showDeleteModal}
        onHideModal={() => setShowDeleteModal(false)}
      >
        <button
          className="w-full px-6 py-2 bg-black text-white transition ease-in-out duration-150 hover:opacity-70 rounded-lg"
          onClick={(e) => tryDeleteConversation(selectedConversation)}
        >
          Yes
        </button>
      </GenericModal>

      <GenericModal
        title="Edit Conversation Title"
        showModal={showEditModal}
        onHideModal={() => setShowEditModal(false)}
      >
        <div className="flex">
          <input
            type="text"
            className="w-72 h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
            value={editedConversationTitle}
            onChange={(e) => setEditedConversationTitle(e.target.value)}
          />
          <button
            className="w-32 ml-2 px-6 py-2 bg-black text-white transition ease-in-out duration-150 hover:opacity-70 rounded-lg"
            onClick={(e) =>
              tryEditConversationTitle(
                selectedConversation,
                editedConversationTitle
              )
            }
          >
            Confirm
          </button>
        </div>
      </GenericModal>

      <div className="text-left font-bold mb-4">Conversation History</div>
      {props.conversations?.map((snapshot, i) => {
        return (
          <div className="flex" key={`snapshot${i}`}>
            <div
              className={`transition ease-in-out duration-200 hover:opacity-50 hover:cursor-pointer rounded-l-lg mt-2 p-4 bg-gray-50 w-72 flex justify-between text-sm ${
                props.currentConversationId === snapshot?.key
                  ? "bg-black text-white"
                  : ""
              }`}
              key={snapshot.val()["title"]}
              onClick={() => changeConversation(snapshot?.key)}
            >
              <div>
                {snapshot.val()["title"]}
                <p className="text-gray-600 mt-1 text-xs">
                  {moment(snapshot.val()["created"]).format("MM-DD-YYYY")}
                </p>
              </div>
            </div>
            <div className="flex text-black mt-2 p-4 rounded-r-lg bg-gray-50 w-20">
              <Edit
                size={16}
                onClick={() => setupModal(snapshot?.key, setShowEditModal)}
                className="mt-1 hover:opacity-50 hover:cursor-pointer"
              />
              <Trash
                size={16}
                onClick={() => setupModal(snapshot?.key, setShowDeleteModal)}
                className="mt-1 ml-3 hover:opacity-50 hover:cursor-pointer"
              />
            </div>
          </div>
        );
      })}
      <div
        className="transition ease-in-out duration-200 hover:opacity-50 hover:cursor-pointer rounded-l-lg mt-2 p-4 bg-gray-50 w-92 flex justify-center text-sm"
        onClick={newConversation}
      >
        <PlusCircle
          size={20}
          className="hover:opacity-50 hover:cursor-pointer"
        ></PlusCircle>
      </div>
    </div>
  );
}
