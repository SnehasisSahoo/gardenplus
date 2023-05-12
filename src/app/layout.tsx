import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Roboto } from 'next/font/google';
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
	title: "Garden Plus",
	description: "App to interface with Garden Plus IoT hardware",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
