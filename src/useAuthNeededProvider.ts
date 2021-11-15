// @ts-ignore
import createGlobalState from 'react-create-global-state';

// create the global for your hook
const initialState = false;

const [useGlobalAuthNeeded, Provider] = createGlobalState(initialState)

// export the provider to link in the application
export const GlobalAuthNeededProvider = Provider

// export the hook
export default useGlobalAuthNeeded