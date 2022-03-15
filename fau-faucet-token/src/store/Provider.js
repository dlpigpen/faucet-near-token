import Context from './Context'
import { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import { IntlProvider } from 'react-intl';

function Provider({ children }) {
    const [state, dispatch] = useReducer(initialState, reducer)
    return (
        <Context.Provider value={[state, dispatch]}>
            <IntlProvider message={state.messages, state.locale}>
                {children}
            </IntlProvider>
        </Context.Provider>
    )
}

export default Provider;

