"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Nav } from "react-bootstrap";
import { useState } from "react";
import { Health } from "@/components/Health";
import { Irrigate } from "@/components/Irrigate";

export default function Home() {
	const [activePage, setActivePage] = useState<"health" | "irrigate">("health");
	return (
		<>
      <div className="home-container">
      {activePage === "health" ? <Health/> : <Irrigate/>}
			</div>
			<Nav justify variant='tabs' className='fixed-bottom tabs-bg'>
				<Nav.Item>
					<Nav.Link
						onClick={() => {
							setActivePage("health");
						}}
						active={activePage === "health" ? true : false}
					>
						GARDEN HEALTH
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						onClick={() => {
							setActivePage("irrigate");
						}}
						active={activePage === "irrigate" ? true : false}
					>
						IRRIGATE
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</>
	);
}
