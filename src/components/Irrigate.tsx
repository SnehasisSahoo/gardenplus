"use client";
import { update } from "firebase/database";
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Form, Spinner, Stack } from "react-bootstrap";

export const Irrigate = ({ dbData, dbRef }: any) => {
	const [hrs, setHrs] = useState<any>("");
	const [mins, setMins] = useState<any>("");
	const [soil, setSoil] = useState<any>("");
	const [water, setWater] = useState<any>("");

	const [edit, setEdit] = useState<any>("");
	const [addTime, setAddTime] = useState(false);

	const refWaterTime = dbData["water-time"];

	const handelOnUpdate = (field: string, index?: any) => {
		if (field === "time") {
			let editedWaterTime = refWaterTime;
			editedWaterTime[index as number] = hrs + ":" + mins;
			update(dbRef, { "water-time": editedWaterTime });
		} else if (field === "soil") {
			update(dbRef, { "optimal-sm": soil });
		} else if (field === "water") {
			update(dbRef, { "force-water": { command: false, time: water } });
		} else if (field === "start") {
			update(dbRef, { "force-water": { command: true, time: water } });
		}
	};

	const handelOnDel = (index: number) => {
		let editedWaterTime = refWaterTime;
		editedWaterTime.splice(index, 1);
		update(dbRef, { "water-time": editedWaterTime });
	};

	// console.log(dbData["water-time"]);
	return (
		<>
			<div className='d-flex justify-content-around'>
				<Image
					alt='cover'
					src='/water-cover.svg'
					width='300'
					height='300'
					className='m-n1'
				/>
			</div>
			<hr className='mx-2' />
			<Card className='mb-2'>
				<Card.Body>
					<Card.Title>
						<h3> Irrigation Routine </h3>
					</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						Recommended: Twice Daily
					</Card.Subtitle>
					<Stack gap={2}>
						{dbData["water-time"] &&
							dbData["water-time"].map((time: string, i: number) => {
								return (
									<Stack gap={2} direction='horizontal' key={i}>
										<Form.Control
											disabled={edit === i ? false : true}
											type='number'
											onChange={(e) => setHrs(e.target.value)}
											value={edit !== i ? time.split(":")[0] : hrs}
										/>
										:
										<Form.Control
											disabled={edit === i ? false : true}
											type='number'
											onChange={(e) => setMins(e.target.value)}
											value={edit !== i ? time.split(":")[1] : mins}
										/>
										Hrs
										<Button
											hidden={i === edit ? true : false}
											variant='warning'
											size='sm'
											onClick={() => {
												setEdit(i);
												setHrs(time.split(":")[0]);
												setMins(time.split(":")[1]);
											}}
										>
											edit
										</Button>
										<Button
											hidden={i === edit ? false : true}
											variant='success'
											size='sm'
											onClick={() => {
												handelOnUpdate("time", i);
												setEdit("");
											}}
										>
											save
										</Button>
										<Button
											disabled={i === edit ? true : false}
											variant='danger'
											size='sm'
											onClick={() => handelOnDel(i)}
										>
											del
										</Button>
									</Stack>
								);
							})}
					</Stack>
					<Stack
						gap={2}
						direction='horizontal'
						hidden={!addTime}
						className='my-2'
					>
						<Form.Control
							type='number'
							onChange={(e) => setHrs(e.target.value)}
						/>
						:
						<Form.Control
							type='number'
							onChange={(e) => setMins(e.target.value)}
						/>
						Hrs
						<Button
							variant='success'
							size='sm'
							onClick={() => {
								handelOnUpdate("time", dbData["water-time"].length);
								setAddTime(false);
							}}
						>
							save
						</Button>
					</Stack>
					<Button
						disabled={addTime || edit}
						className='my-2 w-100'
						variant='primary'
						onClick={() => setAddTime(true)}
					>
						ADD
					</Button>
				</Card.Body>
			</Card>

			<Card className='my-2'>
				<Card.Body>
					<Card.Title>
						<h3> Set Soil Moisture Level </h3>
					</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						{"Recommended: 60% (depends on plants)"}
					</Card.Subtitle>
					<Stack gap={2} direction='horizontal'>
						<Form.Control
							disabled={edit === "soil" ? false : true}
							type='number'
							onChange={(e) => setSoil(e.target.value)}
							value={edit !== "soil" ? dbData["optimal-sm"] : soil}
						/>
						%
					</Stack>
					<Button
						hidden={edit === "soil" ? true : false}
						className='my-2 w-100'
						variant='primary'
						onClick={() => {
							setEdit("soil");
							setSoil(dbData["optimal-sm"]);
						}}
					>
						EDIT
					</Button>
					<Button
						hidden={edit === "soil" ? false : true}
						className='my-2 w-100'
						variant='success'
						onClick={() => {
							handelOnUpdate("soil");
							setEdit("");
						}}
					>
						SAVE
					</Button>
				</Card.Body>
			</Card>

			<Card className='my-2'>
				<Card.Body>
					<Card.Title>
						<h3> Water Plants Manually </h3>
					</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						Use With Caution
					</Card.Subtitle>
					<Stack
						gap={3}
						direction='horizontal'
						className='justify-content-between'
					>
						<h6 className='w-75'>Set Timer:</h6>
						<Form.Control
							disabled={edit === "water" ? false : true}
							type='number'
							onChange={(e) => setWater(e.target.value)}
							value={edit !== "water" ? dbData["force-water"].time : water}
						/>
						Mins
						<Button
							hidden={edit === "water" ? true : false}
							disabled={dbData["force-water"].command ? true : false}
							variant='warning'
							size='sm'
							onClick={() => {
								setEdit("water");
								setWater(dbData["force-water"].time);
							}}
						>
							edit
						</Button>
						<Button
							hidden={edit === "water" ? false : true}
							size='sm'
							variant='success'
							onClick={() => {
								handelOnUpdate("water");
								setEdit("");
							}}
						>
							set
						</Button>
					</Stack>
					<Button
						disabled={
							dbData["force-water"].command || dbData["force-water"].time <= 0
								? true
								: false
						}
						className='my-2 w-100'
						variant={dbData["force-water"].command ? "success" : "primary"}
						onClick={() => handelOnUpdate("start")}
					>
						{dbData["force-water"].command ? (
							<>
								<Spinner
									as='span'
									animation='grow'
									size='sm'
									role='status'
									aria-hidden='true'
								/>
								{" Watering ..."}
							</>
						) : (
							"START WATERING"
						)}
					</Button>
				</Card.Body>
			</Card>

			<Button
				className='my-2 w-100'
				hidden={true}
				variant='warning'
				size='sm'
				onClick={() => console.log(soil)}
			>
				test
			</Button>
		</>
	);
};
