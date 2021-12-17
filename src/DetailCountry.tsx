import React, { useEffect, useState } from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import { MainContext } from './mainContext';

export const DetailCountry: NavigationFunctionComponent<Props> = (props) => {
    const { updateActiveLanguage, activeCountry } = React.useContext(MainContext);
    const [cxListLanguage, setCxListLanguage] = useState([])

    useEffect(() => {
        if (!!activeCountry) {
            setCxListLanguage(activeCountry.languages)
        }
    }, [])

    if (!activeCountry) {
        return null
    }
    return (
        <Root>
            <View style={{
                flex: 1,
                width: '100%',
                marginTop: 20,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginBottom: 50,
                }}>
                    {activeCountry.name}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text>
                        alpha2Code
                    </Text>
                    <Text>
                        {activeCountry.alpha2Code}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text>
                        population
                    </Text>
                    <Text>
                        {activeCountry.population}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text>
                        language
                    </Text>
                    <FlatList 
                        style={{
                            flex: 1,
                        }}
                        keyExtractor={item => item.name}
                        data={cxListLanguage}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity style={{
                                    alignItems: 'flex-end'
                                }} onPress={() => {
                                    updateActiveLanguage(item);
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
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'blue',
                                        textDecorationLine: 'underline'
                                    }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>

            
        </Root>
    );
};

type Props = {};

const Root = styled.View`
    flex: 1;
    background-color: #e6eeff;
    align-items: center;
    justify-content: center;
`;