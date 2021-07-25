import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
    onDebounce: ( value: string ) => void,
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');

    const debouncedValue = useDebouncedValue( textValue, 700 );

    useEffect(() => {
        onDebounce( debouncedValue );
    }, [debouncedValue])

    return (
        <View style={ {
            ...styles.container,
            ...style as any
        } }>
            <View style={ styles.textBG }>
                <TextInput
                    placeholder="Search Pokemon..."
                    style={ styles.textInput }
                    autoCapitalize="none"
                    autoCorrect={ false }
                    value={ textValue }
                    onChangeText={ setTextValue }
                />

                <Icon
                    name="search-outline"
                    color="grey"
                    size={ 25 }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'orange'
    },
    textBG: {
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.5,

        elevation: 3,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
});