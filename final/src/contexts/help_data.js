// dataContext will eventually hold::
/*
 @id: The id has no relation to the order questions comes in,
 @question
 @answer
 @keywords: Keywords are optional. They pretty much treated on the same level as a question when it comes to ordering what comes first in the search results
*/

import React from 'react';

const dataContext = React.createContext();

export default dataContext;
