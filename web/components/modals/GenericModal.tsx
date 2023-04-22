import { X } from "lucide-react";

type GenericModalProps = {
  title: string;
  children: React.ReactNode;
  showModal: boolean;
  onHideModal: () => void;
};

export default function GenericModal(props: GenericModalProps) {
  return (
    <>
      {props.showModal && (
        <div
          className="fixed top-0 bg-gray-200 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          id="modal"
        >
          <div className="bg-white shadow-md px-6 pb-10 max-w-xl m-auto rounded-lg mt-16">
            <div className="flex justify-end">
              <button className="p-4" onClick={() => props.onHideModal()}>
                <X size={24} />
              </button>
            </div>
            <div>
              <div className="text-center py-4 font-bold text-md">
                {props.title}
              </div>
              <div className="flex justify-center">{props.children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
