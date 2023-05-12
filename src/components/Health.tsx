"use client";
import React, { useEffect, useRef, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, off, child } from "firebase/database";
import { Button, Stack } from "react-bootstrap";
import { Stat } from "./Stat";
import Image from "next/image";

export const Health = ({ dbData, dbRef }: any) => {
	return (
		<>
			<div className='d-flex justify-content-around'>
				<Image
					alt='cover'
					src='/garden-cover.svg'
					width='300'
					height='300'
					className='m-n1'
				/>
			</div>
			<hr className='mb-4 mx-2' />
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
			<Button
				hidden
				variant='primary'
				className='w-100 mt-3'
				onClick={() => {}}
			>
				Refresh
			</Button>
		</>
	);
};
