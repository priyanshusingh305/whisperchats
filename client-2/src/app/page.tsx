
import Dashboard from "../../components/sign-up";


export default function Home() {
  return (
    <div className="flex md:min-h-screen  md:w-screen  w-screen h-full flex-col gap-2 items-center justify-center ">
      <h1 className="text-2xl font-bold z-20" >Whisper chat</h1>
      <Dashboard/>
    </div>
  );
}
