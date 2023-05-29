import React, { useState } from 'react'
import { Site } from '../types/Site.type';

function UseInitialSiteState() : Site
{
	const [initialState] = useState<Site>({
		id: 0,
		name: '',
		url: '',
		userId: 0,
		description: '',
		groups: [],
		interval: '',
		createdAt: '',
		modifiedAt: '',
		reports: [],
	});
	
	return initialState;
}

export default UseInitialSiteState