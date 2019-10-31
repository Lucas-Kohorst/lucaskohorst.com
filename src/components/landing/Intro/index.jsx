import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Header } from 'Theme'
import { Container, Button } from 'Common'
import career from 'Static/illustrations/career.svg'
import { Wrapper, IntroWrapper, Details, Thumbnail } from './styles'

export const Intro = () => (
	<Wrapper>
		<Header />
		<IntroWrapper as={Container}>
			<Details>
				<h1>Hi</h1>
				<h4>I’m Lucas a Fullstack Web Developer</h4>
				<h5>Currently Studying at Rochester Institute of Technology</h5>
				<Button as={AnchorLink} href="#contact">
					Get in Touch
				</Button>
			</Details>
			<Thumbnail>
				<img src={career} />
			</Thumbnail>
		</IntroWrapper>
	</Wrapper>
)
