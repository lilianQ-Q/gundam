import React from 'react'

interface SkeletonSpanProps {
	width?: string;
}

function SkeletonSpan(props: SkeletonSpanProps) {

	const width: string = props.width ? props.width : 'w-72';

	return (
		<div className={`h-4 bg-gray-300 rounded-full ${width} animate-pulse`}></div>
	)
}

export default SkeletonSpan