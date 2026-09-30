import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Chat from "./Chat";
import Landing from "./landing/Landing";
import Loader from "../components/Loader";

function Home() {
  const { user, loading } = useContext(AuthContext);

  if(loading){
    return <Loader/>
  }
  

  return <div>{user ? <Chat /> : <Landing />}</div>;
}

export default Home;
