import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'Common'
import code from 'Static/illustrations/code.svg'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import {
	Wrapper,
	SkillsWrapper,
	SkillListWrapper,
	Details,
	Thumbnail,
} from './styles'

export const Skills = () => (
	<React.Fragment>
		<SkillListWrapper>
			<Chip
				label="Java"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="Javascript"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="HTML/CSS"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="Python"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="PHP"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="Node.js"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="React.js"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="Database Management"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="MySQL/NoSQL"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="Firebase"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
			<Chip
				label="Google Cloud"
				deleteIcon={<DoneIcon />}
				style={{ marginRight: '1em' }}
			/>
		</SkillListWrapper>
		<Wrapper id="about">
			<SkillsWrapper as={Container}>
				<Thumbnail>
					<img src={code} style={{ width: '80%' }} />
				</Thumbnail>
				<Details>
					<p>
						I am an enthusiastic, hard-working Fullstack Web Developer skilled
						in developing web apps, database management, and design. Currently
						attending RIT studying Web and Mobile Computing and Human Language
						Technology and Computational Linguistics
					</p>
					<Button
						as="a"
						target="_blank"
						rel="noopener noreferrer"
						href="https://lucaskohorst.com/resume"
					>
						Resume
					</Button>
				</Details>
			</SkillsWrapper>
		</Wrapper>
	</React.Fragment>
)
