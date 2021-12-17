import React from 'react';

// Declaring the state object globally.
const initialState = {
  listCountry: [],
  listCountryByLanguage: {},
  activeCountry: '',
  activeLanguage: '',
};

const contextWrapper = (component?: React.Component) => ({
  ...initialState,
  addCountry: (listCountry) => {
    initialState.listCountry = listCountry;
    component?.setState({ context: contextWrapper(component) });
  },
  addCountryByLanguage: (listCountryByLanguage) => {
    initialState.listCountryByLanguage = listCountryByLanguage;
    component?.setState({ context: contextWrapper(component) });
  },
  updateActiveCountry: (activeCountry) => {
    initialState.activeCountry = activeCountry;
    component?.setState({ context: contextWrapper(component) });
  },
  updateActiveLanguage: (activeLanguage) => {
    initialState.activeLanguage = activeLanguage;
    component?.setState({ context: contextWrapper(component) });
  }
});

type Context = ReturnType<typeof contextWrapper>;

export const MainContext = React.createContext<Context>(contextWrapper());

interface State {
  context: Context;
}

export class ContextProvider extends React.Component {
  state: State = {
    context: contextWrapper(this),
  };

  render() {
    return (
      <MainContext.Provider value={this.state.context}>
        {this.props.children}
      </MainContext.Provider>
    );
  }
}
