"use client";
import { Health } from "@/components/Health";
import { Irrigate } from "@/components/Irrigate";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

export default function Home() {
	const [activePage, setActivePage] = useState<"health" | "irrigate">("health");

	const [dbData, setDbData] = useState<any>({});

	const firebaseConfig = {
		project_id: "garden-plus",
		databaseURL: "https://garden-plus-default-rtdb.firebaseio.com/",
	};
	const app = initializeApp(firebaseConfig);
	const db = getDatabase(app);
	const dbRef = ref(db, "/garden");

	useEffect(() => {
    update(dbRef, { "req-data": true });
		onValue(dbRef, (snapshot) => {
			setDbData(snapshot.val());
		});
    const interval = setInterval(() => {
      update(dbRef, { "req-data": true });
    }, 1000*3600);
    return () => clearInterval(interval);
	}, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     update(dbRef, { "req-data": true });
  //   }, 1000*3600);
  //   return () => clearInterval(interval);
  // }, []);

	return (
		<>
			<div className='home-container'>
				{activePage === "health" ? (
					<Health dbData={dbData} dbRef={dbRef} />
				) : (
					<Irrigate dbData={dbData} dbRef={dbRef} />
				)}
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
						DEVICE CONFIG
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</>
	);
}
