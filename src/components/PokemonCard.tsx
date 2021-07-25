import React, { useRef, useState, useEffect, memo, PropsWithChildren } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [ bgColor, setBgColor ] = useState('grey');
    const isMounted = useRef(true);

    const [ hasImage, setHasImage ] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const colors = ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then((colors: any) => {

                if (!isMounted.current) return;

                (colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'grey')
                    : setBgColor(colors.background || 'grey')
            })
            .catch(err => {
                setHasImage(false);
            })
        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () =>
                navigation.navigate('PokemonScreen', {
                    simplepokemon: pokemon,
                    color: bgColor
                })

            }
        >
            <View style={ {
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            } }>
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokeballContainer }>
                    <Image
                        source={ require('../assets/img/pokebola-blanca.png') }
                        style={ styles.pokeball }
                    />
                </View>

                <FadeInImage
                    hasImage={ hasImage }
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        // backgroundColor: 'grey',
        height: 110,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Quicksand-Medium',
        top: 5,
        left: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10
    },
    pokeball: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -5,
        bottom: -10,
        resizeMode: 'center',
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.4,
        overflow: 'hidden'
    }
});

// const arePropsEqual = (prevProps: Readonly<PropsWithChildren<Props>>, nextProps: Readonly<PropsWithChildren<Props>>) => {
//     return prevProps.pokemon.id === nextProps.pokemon.id;
// }

// export const MemoPokemonCard = memo(PokemonCard, arePropsEqual)