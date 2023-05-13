"use client";
import Image from "next/image";
import { Container, Navbar, Stack } from "react-bootstrap";

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' className='fixed-top bg-dark'>
				<Container className='justify-content-around'>
					<Navbar.Brand>
						<Stack direction='horizontal' gap={3}>
							<Image alt='logo' src='/logo.png' width='30' height='30' />
							<h4>Garden Plus</h4>
						</Stack>
					</Navbar.Brand>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
