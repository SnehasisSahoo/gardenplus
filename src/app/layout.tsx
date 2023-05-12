import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const roboto = Roboto({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Garden Plus",
	description: "App to interface with Garden Plus IoT hardware",
	viewport: "width=device-width, initial-scale=1",

};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={roboto.className}>
			<Head>
				<link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
				<link rel="icon" href="%PUBLIC_URL%/logo.png" />
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
				<link rel="manifest" href="manifest.json" />
			</Head>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
