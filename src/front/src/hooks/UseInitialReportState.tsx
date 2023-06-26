import React, { useState } from 'react'
import { Report } from '../types/Report.type';

function UseInitialReportState() : Report {
  
    const [initialState] = useState<Report>({
        id: 0,
        title: '',
        sites: [],
        tags: [],
        typeId: 0,
        userId: 0,
        createdAt: '',
        modifiedAt: ''
    });

    return initialState;
}

export default UseInitialReportState;