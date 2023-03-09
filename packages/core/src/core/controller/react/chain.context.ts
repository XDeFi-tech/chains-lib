import React from 'react';
import { ChainController } from 'core/controller';

const ChainContext = React.createContext(new ChainController());
export const ChainProvider = ChainContext.Provider;

export default ChainContext;
