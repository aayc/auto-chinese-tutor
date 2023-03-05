import Head from "next/head";
import { useEffect } from "react";
import ChatInterface from "../components/ChatInterface";
import { useRouter } from "next/router";
import WelcomeModal from "../components/WelcomeModal";

export default function Home() {
  return (
    <>
      <WelcomeModal></WelcomeModal>

      <div>
        <Head>
          <title>Auto Chinese Tutor</title>
        </Head>

        <div className="fixed w-full top-0">
          <div className="flex justify-between mt-4 mx-4">
            <h1 className="text-md font-bold"></h1>
          </div>
        </div>

        <main className="mt-12">
          <ChatInterface
          ></ChatInterface>
        </main>
      </div>
    </>
  );
}
