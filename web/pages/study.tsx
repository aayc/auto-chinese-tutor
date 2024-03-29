import Head from "next/head";
import { auth } from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import StudyInterface from "../components/StudyInterface";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const widget = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    } else if (user) {
      return <StudyInterface user={user}></StudyInterface>;
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
