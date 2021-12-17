import React, { useEffect, useState } from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import { MainContext } from './mainContext';

export const ListCountry: NavigationFunctionComponent<Props> = (props) => {
    const { listCountryByLanguage, activeLanguage, updateActiveCountry } = React.useContext(MainContext);
    const [listCountry, setListCountry] = useState([])

    useEffect(() => {
        if (!!activeLanguage && !!listCountryByLanguage[activeLanguage.name]) {
            setListCountry(listCountryByLanguage[activeLanguage.name])
        }
    }, [])

    return (
        <Root>
            <FlatList 
                data={listCountry}
                keyExtractor={item => item.name}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => {
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
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
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