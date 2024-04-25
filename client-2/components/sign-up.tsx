"use client";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const Dashboard = () => {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<>
				          <Link href="/chat">
          <button
						className=" relative group/btn  flex space-x-2 items-center justify-start px-4 md:w-[15vw] w-[40vw] text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
						type="button"
	
					>
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">Continue to Chat</span>
						<BottomGradient />
					</button>
          </Link>
					<button
						className=" relative group/btn  flex space-x-2 items-center justify-start px-4 md:w-[15vw] w-[40vw] text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
						type="button"
						onClick={() => signOut({})}
					>
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">Sign Out</span>
						<BottomGradient />
					</button>

				</>
			) : (
				<>
					<div className="md:max-w-md w-[70vw]  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
						<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Whisperchats</h2>
						<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
							Login to whisperchats with your favorite social media platform
						</p>

						<div className="flex flex-col space-y-4">
							<button
								className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
								type="button"
								onClick={() => signIn("google")}
							>
								<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
								<BottomGradient />
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Dashboard;
