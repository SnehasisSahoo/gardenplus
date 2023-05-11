"use client";
import React, { useEffect, useRef, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, off, child } from "firebase/database";
import { Button, Stack } from "react-bootstrap";
import { Stat } from "./Stat";
import Image from "next/image";

export const Health = () => {
	const [dbData, setDbData] = useState<any>({});

	const firebaseConfig = {
		project_id: "garden-plus",
		databaseURL: "https://garden-plus-default-rtdb.firebaseio.com/",
	};
	const app = initializeApp(firebaseConfig);
	const db = getDatabase(app);
	const dbRef = ref(db, "/garden");

	useEffect(() => {
		onValue(dbRef, (snapshot) => {
			setDbData(snapshot.val());
		});
	}, []);

	return (
		<>
			<div className='d-flex justify-content-around'>
				<Image alt='cover' src='/home-page-bg.svg' width='250' height='250' />
			</div>
			<hr className="mb-4"/>
			<Stack gap={5} className='align-items-center'>
				<Stack
					gap={2}
					direction='horizontal'
					className='justify-content-between'
				>
					<Stat
						title='Temperature'
						icon='/temp.png'
						data={dbData.temp && `${dbData.temp} °C`}
					/>
					<Stat
						title='Humidity'
						icon='/hum.png'
						data={dbData.hum && `${dbData.hum} %`}
					/>
				</Stack>
				<Stack gap={2} direction='horizontal'>
					<Stat
						title='Soil Moisture'
						icon='/soil-moisture.png'
						data={dbData.sm && `${dbData.sm} %`}
					/>
					<Stat
						title='Tank Level'
						icon='/tank-lvl.png'
						data={dbData["tank-lvl"] && (dbData["tank-lvl"] ? "Ok" : "Empty")}
					/>
				</Stack>
			</Stack>
		</>
	);
};
