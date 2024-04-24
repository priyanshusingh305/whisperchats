import { SignupFormDemo } from "@/components/sign-up";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold z-20" >whisperchats</h1>
      <SignupFormDemo/>
    </div>
  );
}
