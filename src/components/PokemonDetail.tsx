import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull;
    color: string,
}

const windowsHeight = Dimensions.get('window').height;

export const PokemonDetail = ({ pokemon, color }: Props) => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={ false }
            style={ {
                ...StyleSheet.absoluteFillObject,
                // backgroundColor: 'orange' 
            } }
        >
            {/* Types & weight Container */ }
            <View style={ {
                ...styles.container,
                ...styles.customBorder,
                borderColor: color,
                marginTop: windowsHeight / 1.9,
            } }>
                <Text style={ styles.title }>Types</Text>
                <View style={ { flexDirection: 'row' } }>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text
                                style={ {
                                    ...styles.regularText,
                                    marginRight: 10
                                } }
                                key={ type.name }
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Weight */ }
            <View style={ {
                ...styles.container,
                ...styles.customBorder,
                borderColor: color,
            } }>
                <Text style={ styles.title }>Weight</Text>
                <Text style={ styles.regularText }>{ pokemon.weight / 10 }kg</Text>
            </View>

            {/* Sprites */ }
            <View style={ {
                ...styles.container,
                marginTop: 10
            } }>
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
            >
                <FadeInImage
                    style={ styles.basicSprite }
                    uri={ pokemon.sprites.front_default }
                />
                <FadeInImage
                    style={ styles.basicSprite }
                    uri={ pokemon.sprites.back_default }
                />
                <FadeInImage
                    style={ styles.basicSprite }
                    uri={ pokemon.sprites.front_shiny }
                />
                <FadeInImage
                    style={ styles.basicSprite }
                    uri={ pokemon.sprites.back_shiny }
                />
            </ScrollView>

            {/* Base Abilities */ }
            <View style={ {
                ...styles.container,
                ...styles.customBorder,
                borderColor: color,
            } }>
                <Text style={ styles.title }>Base Abilities</Text>

                <View style={ { flexDirection: 'row' } }>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text
                                style={ {
                                    ...styles.regularText,
                                    ...styles.pokemonBadge,
                                    backgroundColor: color,
                                } }
                                key={ ability.name }
                            >
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Moves */ }
            <View style={ {
                ...styles.container,
                ...styles.customBorder,
                borderColor: color,
            } }>
                <Text style={ styles.title }>Moves</Text>

                <View style={ { flexDirection: 'row', flexWrap: 'wrap' } }>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text
                                style={ {
                                    ...styles.regularText,
                                    ...styles.pokemonBadge,
                                    backgroundColor: color,
                                } }
                                key={ move.name }
                            >
                                { move.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Stats */ }
            <View style={ {
                ...styles.container,
            } }>

                <View style={ {
                    ...styles.customBorder,
                    borderColor: color,
                } }>
                    <Text style={ styles.title }>Stats</Text>
                    {
                        pokemon.stats.map((stat, index) => (
                            <View
                                key={ stat.stat.name + index }
                                style={ { flexDirection: 'row' } }
                            >
                                <Text
                                    style={ {
                                        ...styles.regularText,
                                        marginRight: 10,
                                        width: 150,
                                        textTransform: 'capitalize'
                                    } }
                                >
                                    { stat.stat.name }
                                </Text>

                                <Text
                                    style={ {
                                        ...styles.regularText,
                                        fontFamily: 'Quicksand-SemiBold'
                                    } }
                                >
                                    { stat.base_stat }
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* Final Sprite */ }
                <View style={ {
                    marginBottom: 20,
                    alignItems: 'center'
                } }>
                    <FadeInImage
                        style={ styles.basicSprite }
                        uri={ pokemon.sprites.front_default }
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 24,
        fontFamily: 'Quicksand-Bold',
        // marginTop: 20,
        marginBottom: 10
    },
    regularText: {
        fontSize: 16,
        fontFamily: 'Quicksand-Regular',
    },
    basicSprite: {
        width: 100,
        height: 100,
    },
    pokemonBadge: {
        color: 'white',
        margin: 2,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 10,

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 2
    },
    customBorder: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
});