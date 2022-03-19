import Context from './Context'
import { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import { IntlProvider } from 'react-intl';

function Provider({ children }) {
    const [state, dispatch] = useReducer(initialState, reducer)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;

