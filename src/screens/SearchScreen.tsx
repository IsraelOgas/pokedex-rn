import React, { useEffect, useState } from 'react';
import { Platform, View, Text, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';

import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const windowWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [ filteredPokemon, setFilteredPokemon ] = useState<SimplePokemon[]>([]);

    const [ term, setTerm ] = useState('');

    useEffect(() => {
        if (term.length === 0) {
            return setFilteredPokemon([]);
        }

        if (isNaN(Number(term))) {
            setFilteredPokemon(
                simplePokemonList.filter(poke => poke.name.toLocaleLowerCase()
                    .includes(term.toLocaleLowerCase())
                )
            )
        } else {
            const pokemonById = simplePokemonList.find((poke) => poke.id === term);
            setFilteredPokemon(
                (pokemonById) ? [ pokemonById ] : []
            )
        }

    }, [ term ])

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={ {
            flex: 1,
            marginHorizontal: 20,
        } }>
            <SearchInput
                onDebounce={ (value) => setTerm(value) }
                style={ {
                    position: 'absolute',
                    zIndex: 999,
                    width: windowWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 15
                } }
            />

            <FlatList
                data={ filteredPokemon }
                contentContainerStyle={{ alignItems: 'center' }}
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                renderItem={ ({ item }) => (<PokemonCard pokemon={ item } />) }

                ListHeaderComponent={ (
                    <Text style={ {
                        ...styles.title,
                        ...styles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === 'ios') ? top + 50 : top + 70
                    } }>{ term }</Text>
                ) }
            />
        </View>
    );
}