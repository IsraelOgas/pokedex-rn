import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <>
            <Image
                source={ require('../assets/img/pokebola.png') }
                style={ styles.pokeballBG }
            />

            <View style={ { alignItems: 'center' } }>
                <FlatList
                    data={ simplePokemonList }
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                    renderItem={ ({ item }) => (<PokemonCard pokemon={ item } />) }

                    ListHeaderComponent={ (
                        <Text style={ {
                            ...styles.title,
                            ...styles.globalMargin,
                            marginBottom: top + 20,
                            top: top + 20,
                            paddingBottom: 10
                        } }>Pokedex</Text>
                    ) }

                    // infinite scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={ <ActivityIndicator size={ 20 } color="orange" style={ { height: 100 } } /> }
                />
            </View>

        </>
    );
}