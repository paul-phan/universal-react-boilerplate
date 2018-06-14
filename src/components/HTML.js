import React from 'react'

export default function HTML({
	title,
	description,
	scripts,
	styles,
	children,
	configs,
	styleTags
}) {
	return (
		<html className="no-js" lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				{/*{scripts.map(script => (*/}
				{/*<link*/}
				{/*key={script}*/}
				{/*rel="preload"*/}
				{/*href={script}*/}
				{/*as="script"*/}
				{/*/>*/}
				{/*))}*/}
				{styles.map(style => (
					<style
						key={style.id}
						id={style.id}
						dangerouslySetInnerHTML={{ __html: style.cssText }}
					/>
				))}
				{styleTags}
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={{ __html: children }} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.__INITIAL_DATA__=${JSON.stringify(
							configs
						)}`
					}}
				/>
				{scripts.map(script => <script key={script} src={script} />)}
			</body>
		</html>
	)
}
