import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";

import { SIZES, FONTS, COLORS, icons } from "../constants";
import { deleteDeckByTitle } from "../utils";
import { useDecks } from "../state";

const IndividualDeckView = ({ route, navigation }) => {
    const [decks, setDecks] = useDecks();
    const [key, setKey] = React.useState("");

    React.useEffect(() => {
        const { id } = route.params;
        setKey(id);
    }, []);

    const renderHeader = () => (
        <View style={{ flexDirection: "row" }}>
            {/* Back navigation arrow */}
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: "center"
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>

            {/* Name of deck */}
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>{decks[key]?.title}</Text>
                </View>
            </View>
        </View>
    );

    const deleteDeck = () => deleteDeckByTitle(decks[key].title)
        .then(currDecks => {
            setDecks(currDecks);
            navigation.goBack();
        });

    const renderDeck = () => (
        <View
            style={styles.deck}
        >
            {/* Deck info */}
            <Text style={{ ...FONTS.h2, color: COLORS.black }}>
                {decks[key]?.title}
            </Text>
            <Text
                style={{
                    ...FONTS.body2,
                    color: COLORS.darkgray,
                    marginLeft: SIZES.padding2,
                    marginRight: SIZES.padding2
                }}
            >
                {decks[key]?.questions?.length} cards
            </Text>
            {/* Buttons */}
            <View
                style={styles.buttons}
            >
                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => navigation.navigate("Card", {
                        id: key
                    })}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.white
                        }}
                    >
                        Add Card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonBlack}
                    onPress={() => navigation.navigate("Quiz", {
                        id: key
                    })}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.white
                        }}
                    >
                        Start Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonPlain}
                    onPress={() => deleteDeck()}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.red
                        }}
                    >
                        Delete Deck
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderDeck()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    deck: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        marginTop: SIZES.padding * 10,
        marginBottom: SIZES.padding * 4
    },
    buttons: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        marginTop: SIZES.padding * 20,
        marginBottom: SIZES.padding
    },
    buttonPrimary: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: 3,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        width: 300
    },
    buttonBlack: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: 3,
        borderRadius: 4,
        backgroundColor: COLORS.black,
        width: 300
    },
    buttonPlain: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: 3,
        borderRadius: 4,
        backgroundColor: COLORS.white,
        width: 300
    }
});

export default IndividualDeckView;