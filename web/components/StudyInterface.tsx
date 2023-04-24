import { User } from "firebase/auth";
import { useState } from "react";
import Tag from "./Tag";

type StudyInterfaceProps = {
  user: User;
};
export default function StudyInterface(props: StudyInterfaceProps) {
  const tabs = ["Flashcards", "Quiz"];
  const [currentTab, setCurrentTab] = useState<string>("Flashcards");

  const switchTab = (tab: string) => () => {
    setCurrentTab(tab);
    console.log(tab);
  };

    const getTabWidget = () => {
        switch (currentTab) {
        case "Flashcards":
            return <StudyInterfaceFlashcards />;
        case "Quiz":
            return <StudyInterfaceQuiz />;
        default:
            return <></>;
        }
    };

  return (
    <div className="max-w-7xl px-6 m-auto min-h-screen">
      <div>
        {tabs.map((tab) => {
          return (
            <Tag
              onClick={switchTab(tab)}
              className="mr-2"
              name={tab}
              selected={tab === currentTab}
            ></Tag>
          );
        })}
      </div>
      {getTabWidget()}
    </div>
  );
}

function StudyInterfaceFlashcards() {
  return (
    <div className="flex mt-8 justify-between">
      <div className="max-w-xl pr-12">Side tabs</div>
      <div className="flex-1">Main tab</div>
    </div>
  );
}

function StudyInterfaceQuiz() {
  return (
    <div className="flex mt-8 justify-between">
      <div className="max-w-xl pr-12"></div>
      <div className="flex-1">Coming soon!</div>
    </div>
  );
}
