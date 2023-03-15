import { createContext } from 'react';
import { ChainController } from 'core/controller';

const ChainContext = createContext(new ChainController());
export const ChainProvider = ChainContext.Provider;

export default ChainContext;
