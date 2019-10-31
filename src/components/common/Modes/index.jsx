import React from 'react'
import moonDark from 'Static/icons/moon-dark.svg'
import moonLight from 'Static/icons/moon-light.svg'

export const Dark = props => {
	// If the `onClick` prop exists, call it with 'dark'
	const handleClick = () => props.onClick && props.onClick('light')

	return (
		<div className="theme-toggle">
			<img width={20} src={moonDark} onClick={handleClick} />
		</div>
	)
}

export const Light = props => {
	// If the `onClick` prop exists, call it with 'light'
	const handleClick = () => props.onClick && props.onClick('dark')

	return (
		<div className="theme-toggle">
			<img width={20} src={moonLight} onClick={handleClick} />
		</div>
	)
}
