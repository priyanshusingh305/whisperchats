import type { Metadata } from "next";

import "./globals.css";

import { Inter as FontSans } from "next/font/google";
const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});
import SessionWrapper from "../../components/SessionWrapper";


import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
	title: "Whisper Chat",
	description: "Chat with your friends on Whisper",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionWrapper>
		<html lang="en">

			<body className={cn("min-h-screen bg-background font-sans antialiased select-none", fontSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<div className="min-h-screen h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
						<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
						<div className="absolute top-4  right-4 z-10">
							<ModeToggle />
						</div>
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
		</SessionWrapper>
	);
}
