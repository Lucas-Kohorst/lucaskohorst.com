import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Card } from 'Common'
import starIcon from 'Static/icons/star.svg'
import forkIcon from 'Static/icons/fork.svg'
import Chip from '@material-ui/core/Chip'
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const Projects = () => {
	const {
		github: {
			repositoryOwner: {
				repositories: { edges },
			},
		},
	} = useStaticQuery(graphql`
		{
			github {
				repositoryOwner(login: "lucas-kohorst") {
					repositories(
						first: 6
						orderBy: { field: STARGAZERS, direction: DESC }
					) {
						edges {
							node {
								id
								name
								url
								description
								stargazers {
									totalCount
								}
								forkCount
							}
						}
					}
				}
			}
		}
	`)

	return (
		<React.Fragment>
			<Wrapper as={Container} id="projects">
				<h2>Projects</h2>
				<Grid>
					{edges.map(({ node }) => (
						<Item
							key={node.id}
							as="a"
							href={node.url}
							target="_blank"
							rel="noopener noreferrer"
							style={{}}
						>
							<Card>
								<Content>
									<h4>{node.name}</h4>
									<p>{node.description}</p>
								</Content>
								<Stats>
									<div>
										<img src={starIcon} alt="stars" />
										<span>{node.stargazers.totalCount}</span>
									</div>
									<div>
										<img src={forkIcon} alt="forks" />
										<span>{node.forkCount}</span>
									</div>
								</Stats>
							</Card>
						</Item>
					))}
				</Grid>
			</Wrapper>
			<Wrapper as={Container}>
				<Grid>
					<Item
						as="a"
						href="https://www.npmjs.com/package/react-sentence-tree"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Card>
							<Content>
								<h4>React Sentence Tree</h4>
								<p>
									Quickly visualize sentences with constituency and dependency
									diagrams
								</p>
								<Chip label="NPM Package" />
							</Content>
						</Card>
					</Item>
					<Item
						as="a"
						href="https://tickettodavesheart.github.io/ticketToRide/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Card>
							<Content>
								<h4>Ticket to Ride</h4>
								<p>
									A computerized version of the board game Ticket to Ride. The
									objective of the game is to build a railroad network on the
									USA map. The application supports multiple games, which can be
									created and joined in the lobby and multiplayer-play over a
									network. Additional features include an in-game chat.
								</p>
								<Chip label="Java Desktop" />
							</Content>
						</Card>
					</Item>
					<Item
						as="a"
						href="https://gmsofwny.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Card>
							<Content>
								<h4>General Maintenance Services of WNY</h4>
								<p>
									Mobile welding and repair of agricultural and construction
									equipment. Specializing in SS, aluminum, all grades of steel
									and cast steels and Hard surfacing
								</p>
								<Chip label="Website" />
							</Content>
						</Card>
					</Item>
				</Grid>
			</Wrapper>
		</React.Fragment>
	)
}
