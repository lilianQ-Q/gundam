import React, { useState } from 'react'
import { Analytics } from '../types/Analytics.type';

function UseInitialAnalyticsState() : Analytics {
  
    const [initialState] = useState<Analytics>({
        site: 0,
        sitePercentage: 0,
        errors: 0,
        errorPercentage: 0,
        reports: 0,
        reportPercentage: 0,
    });

    return initialState;
}

export default UseInitialAnalyticsState