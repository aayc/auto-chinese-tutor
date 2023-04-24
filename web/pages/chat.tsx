import Head from "next/head";
import ChatInterface from "../components/ChatInterface";
import { auth } from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";

export default function Chat() {
  const [user, loading, error] = useAuthState(auth);

  const widget = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    } else if (user) {
      return <ChatInterface user={user}></ChatInterface>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <LoginForm></LoginForm>;
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>Auto Chinese Tutor</title>
        </Head>

        <main className="">
          <NavBar></NavBar>
          <div className="mt-6">{widget()}</div>
        </main>
      </div>
    </>
  );
}
