import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetail } from '../components/PokemonDetail';
import { RootStackParams } from '../navigator/TabHome';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

const windowsHeight = Dimensions.get('window').height;

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplepokemon, color } = route.params;
    const { id, name, picture } = simplepokemon;

    const { top } = useSafeAreaInsets();

    const { isLoading, pokemon } = usePokemon(id);

    return (
        <View style={ { flex: 1 } }>
            {/* Header */ }
            <View style={ {
                ...styles.headerContainer,
                backgroundColor: color,
                height: windowsHeight / 2
            } }>
                {/* Backbutton */ }
                <TouchableOpacity
                    onPress={ () => navigation.pop() }
                    activeOpacity={ 0.8 }
                    style={ {
                        ...styles.backButton,
                        top: top + 10
                    } }
                >
                    <Icon name="arrow-back-outline" size={ 35 } color="white" />
                </TouchableOpacity>
                {/* Pokemon name */ }
                <Text
                    style={ {
                        ...styles.pokemonName,
                        top: top + 40,
                        zIndex: 1
                    } }
                >
                    { name + '\n' }#{ id }
                </Text>

                {/* white pokeball */ }
                <View style={ styles.pokeballContainer }>
                    <Image
                        source={ require('../assets/img/pokebola-blanca.png') }
                        style={ styles.pokeball }
                    />
                </View>

                <FadeInImage
                    uri={ picture }
                    style={ styles.pokemonImage }
                />
            </View>

            {/* Details & loading */ }
            {
                isLoading ? (
                    <View style={ styles.loadingIndicator }>
                        <ActivityIndicator
                            color={ color }
                            size={ 50 }
                        />
                    </View>
                ) :
                    (
                        <PokemonDetail pokemon={ pokemon } color={ color } />
                    )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 15,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        textTransform: 'capitalize',
        alignSelf: 'flex-start',
        fontFamily: 'Quicksand-Bold',
        left: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.6,
    },
    pokeballContainer: {
        overflow: 'hidden',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        borderBottomRightRadius: 1000, 
        borderBottomLeftRadius: 1000
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});