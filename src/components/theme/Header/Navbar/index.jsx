import React from 'react'
import { Link } from 'gatsby'
import { Container } from 'Common'
import NavbarLinks from '../NavbarLinks'
import { Wrapper } from './styles'

const Navbar = () => {
	return (
		<Wrapper as={Container}>
			<div className="hero" style={{ marginTop: '1em' }}>
				{/* <Dark onClick={handleTheme} /> */}
			</div>
			<NavbarLinks desktop />
		</Wrapper>
	)
}

export default Navbar
