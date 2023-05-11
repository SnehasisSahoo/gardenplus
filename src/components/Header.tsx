"use client";
import React from "react";
import { Navbar, Container, Nav, Stack } from "react-bootstrap";
import Image from "next/image";

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' className='fixed-top'>
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
