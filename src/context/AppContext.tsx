import React from 'react';
import {createContext, useContext, useMemo, useReducer} from 'react';

const initialState = {
  filterValue: '',
  refresh: false,
};

type AppContextState = typeof initialState;

type AppAction =
  | {type: 'RE-RENDER'; payload: {refresh: boolean}}
  | {type: 'FILTER_POSTS'; payload: {filterValue: string}};

type AppDispatch = (action: AppAction) => void;

const reducer = (
  state: AppContextState,
  action: AppAction,
): AppContextState => {
  switch (action.type) {
    case 'FILTER_POSTS':
      const {
        payload: {filterValue},
      } = action;
      return {
        ...state,
        filterValue,
      };
    case 'RE-RENDER':
      const {
        payload: {refresh},
      } = action;
      return {
        ...state,
        refresh,
      };
    default:
      throw new Error('Unsupported action dispatched');
  }
};

const AppStateContext = createContext<AppContextState>(initialState);

const AppDispatchContext = createContext<AppDispatch>(() => null);

export const useAppStateContext = () => useContext(AppStateContext);

export const useAppDispatchContext = () => useContext(AppDispatchContext);

export const AppProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return {state, dispatch};
  }, [state, dispatch]);

  return (
    <AppDispatchContext.Provider value={contextValue.dispatch}>
      <AppStateContext.Provider value={contextValue.state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
