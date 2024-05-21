import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import MyProfilePic from './components/MyProfilePic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "James's Blog",
	description: 'Created by James Olsen',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} dark:bg-slate-800`}>
				<Navbar />
				<MyProfilePic />
				{children}
			</body>
		</html>
	);
}
