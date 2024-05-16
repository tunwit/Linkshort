import Image from "next/image";
import ShortenForm from "./components/ShortenForm";
import Dashboard from "./components/Dashboard";
import Signoutbutton from "./components/Signoutbutton";
export default async function Home() {
  return (
    <main>
      <div className="flex flex-col gap-5 ">
        <div className="m-4">
          <span className="text-white text-md flex flex-row gap-2">Logged in as <h1 className="font-bold">{session.user.name}</h1></span>
          <Signoutbutton/>
        </div>
        <div className="flex justify-center mt-[20vh] w-full">
          <h1 className="text-white font-bold text-5xl">Link Shortener!</h1>
        </div>
        <section className="flex flex-col justify-center">
          <ShortenForm/>
          <Dashboard/>
        </section>
      </div>
    </main>
  );
}
