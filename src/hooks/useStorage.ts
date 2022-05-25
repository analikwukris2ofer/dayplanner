import { useEffect, useState } from "react";

// custom-hook to take state and pass it into local storage. A hook is basically a function.
const useLocalStorage = <TState>(key: string, newState: TState) => {
  const [state, setState] = useState<TState>(() => {
    const stateStr = window.localStorage.getItem(key);
    return stateStr ? (JSON.parse(stateStr) as TState) : newState;
    //we first check local storage to see if we already have state, if we do we parse it as JSON
    // and use the TState type to store to memStat.
    //The very first time this hook is called in a component, this function would be called to fetch an initial value
    //for this state. Subsequently this function will not be called.
  });
  // In local storage the 'key' and 'value' has to always be a string.

  // const updateState = (state: TState) => {
  //   window.localStorage.setItem(key, JSON.stringify(state));
  //   setState(state); // this ensures we always return the most current state snapshot.
  // };
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // return [state, setState]
  return [state, setState] as const; // by default all elements of the this array will be set to one type which is
  //the type of 'setState' however if we say 'as const' typescript will infer separetely what each individual type is.
};

export default useLocalStorage;
