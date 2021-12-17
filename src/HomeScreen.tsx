import React, { useEffect } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, Linking } from 'react-native';
import { NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import { getScreenStyle } from './misc/getScreenStyle';
import axios from 'axios';
import { MainContext } from './mainContext';


export const HomeScreen: NavigationFunctionComponent<Props> = (props) => {
  const { listCountry, listCountryByLanguage, addCountry, updateActiveLanguage, updateActiveCountry, addCountryByLanguage } = React.useContext(MainContext);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://restcountries.com/v2/all',
    }).then(res => {
      let tmpListCountry = [], tmpListLanguage = {};
      res.data.forEach(t => {
        let tmpData = {
          name: t.name, 
          alpha2Code: t.alpha2Code, 
          alpha3Code: t.alpha3Code, 
          region: t.region, 
          population: t.population, 
          languages: t.languages
        }
        tmpListCountry.push(tmpData)

        if (t.languages.length > 0) {
          t.languages.forEach(r => {
            tmpListLanguage = {
              ...tmpListLanguage,
              [r.name]: [
                ...(tmpListLanguage[r.name] || []),
                tmpData,
              ]
              // {
              //   ...r,
              //   ['countries']: [
              //     ...((tmpListLanguage[r.name] || {})['countries'] || []),
              //     tmpData,
              //   ]
              // },
            }
          })
        }
      })
      if (listCountry.length === 0) {
        addCountry(tmpListCountry)
      }
      addCountryByLanguage(tmpListLanguage);
    }).catch(error => {
      
    })

    Linking.addEventListener('url', handleUrl);
    // Linking.openURL('rnhw://country/Vietnam')
    // Linking.openURL('rnhw://language/Vietnamese')
    return () => Linking.removeEventListener('url', handleUrl);
  }, [])

  const handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      let fragments = url.split('/');
      let id = fragments[fragments.length - 1]
      if (fragments[fragments.length - 2] === 'country') {
        let country = listCountry.find(t => t.name === id);
        if (!!country) {
          updateActiveCountry(country)
          Navigation.push(props.componentId, {
            component: {
              name: 'DetailCountry',
              options: {
                topBar: {
                  title: {
                    text: 'DetailCountry'
                  }
                }
              }
            }
          })
        }
      }
      else if (fragments[fragments.length - 2] === 'language') {
        let country = listCountryByLanguage[id];
        country = country[0];
        if (!!country && Array.isArray(country.languages) && country.languages.length > 0) {
          let language = country.languages.find(t => t.name === id)
          updateActiveLanguage(language);
          Navigation.push(props.componentId, {
              component: {
                  name: 'ListCountry',
                  options: {
                  topBar: {
                      title: {
                          text: 'ListCountry'
                          }
                      }
                  }
              }
          })
        }
        // listCountryByLanguage
      }
    });
  }

  return (
    <Root>
      {
        listCountry.length > 0
        ?
        <FlatList
          style={{flex: 1}}
          data={listCountry}
          keyExtractor={item => item.alpha2Code}
          renderItem={({item, index}) => {
            
            return (
              <TouchableOpacity style={{
                padding: 10,
                flexDirection: 'row',
                height: 60,
              }} onPress={() => {
                updateActiveCountry(item)
                Navigation.push(props.componentId, {
                  component: {
                    name: 'DetailCountry',
                    options: {
                      topBar: {
                        title: {
                          text: 'DetailCountry'
                        }
                      }
                    }
                  }
                })
              }}>
                <View 
                  style={{
                    width: 40, 
                    height: 40,
                  }}
                  
                />
                <Title>
                  {item.name}
                </Title>
              </TouchableOpacity>
            )
          }}
        />
        :
        <>
          <Title>Welcome to RN lab!</Title>
          <Text>Your journey starts here</Text>
        </>
      }
    </Root>
  );
};

//#region
type Props = {};

const Root = styled.View`
  flex: 1;
  background-color: #e6eeff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
