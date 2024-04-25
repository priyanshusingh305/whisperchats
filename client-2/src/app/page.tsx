
import Dashboard from "../../components/sign-up";


export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-2 items-center justify-center p-24">
      <h1 className="text-2xl font-bold z-20" >Whisper chat</h1>
      <Dashboard/>
    </div>
  );
}
