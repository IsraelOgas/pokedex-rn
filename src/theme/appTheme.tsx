import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20
    },
    pokeballBG: {
        position: 'absolute',
        width: 300,
        height: 300,
        top: -100,
        right: -100,
        opacity: 0.2
    },
    title: {
        fontSize: 32,
        fontFamily: 'Quicksand-Bold'
    },
    subtitle: {
        fontSize: 26,
        fontFamily: 'Quicksand-Medium'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Quicksand-Regular'
    }
});