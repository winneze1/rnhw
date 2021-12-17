import React from 'react';
import {Navigation} from 'react-native-navigation';
import { ContextProvider } from './src/mainContext';
import { HomeScreen } from '~/HomeScreen';
import { DetailCountry } from '~/DetailCountry';
import { ListCountry } from '~/ListCountry';

Navigation.registerComponent('HomeScreen', () => props => (
  <ContextProvider>
    <HomeScreen {...props} />
  </ContextProvider>
));
Navigation.registerComponent('DetailCountry', () => props => (
  <ContextProvider>
    <DetailCountry {...props} />
  </ContextProvider>
));
Navigation.registerComponent('ListCountry', () => props => (
  <ContextProvider>
    <ListCountry {...props} />
  </ContextProvider>
));

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
