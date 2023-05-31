import React, { useState } from 'react'
import { Group } from '../types/Group.type'

function UseInitialGroupState() : Group {
  
    const [initialState] = useState<Group>({
        id: 0,
        name: '',
        createdAt: '',
        modifiedAt: '',
        sites: []  
    });

    return initialState;
}

export default UseInitialGroupState