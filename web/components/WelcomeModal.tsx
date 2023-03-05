import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../util/cookie";
export default function WelcomeModal() {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
    setCookie("showWelcomeModal", "false", 7)
  };

  useEffect(() => {
    const showWelcomeModal = getCookie("showWelcomeModal");
    if (showWelcomeModal !== "false") {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {showModal && (
        <div
          className="fixed top-0  bg-gray-200 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          id="modal"
        >
          <div className="flex justify-center bg-white shadow-md p-8 max-w-xl m-auto rounded-lg mt-16">
            <div>
              <div className="text-center py-6 font-bold text-md">
                Welcome to your online Chinese tutor AI!
              </div>
              <div className="text-center py-6 text-md text-gray-800 max-w-sm">
                Feel free to practice speaking or writing about any topic of your choice.
              </div>
              <div className="flex justify-center">
                <button
                  className="button-primary bg-blue-500 hover:bg-blue-700 text-white px-4 py-2"
                  onClick={hideModal}
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
