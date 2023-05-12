import Image from "next/image";
import { Spinner, Stack } from "react-bootstrap";

export const Stat = ({ title, data, icon }: any) => {
	return (
		<Stack gap={3} className='p-1 align-items-center'>
			<Image
				alt='logo'
				src={icon}
				width={60}
				height={60}
				className='d-inline-block align-top'
			/>
			<h4>{title}</h4>
			{data ? <h4>{data}</h4>	 : <Spinner animation='grow' variant='dark' />}
		</Stack>
	);
};
