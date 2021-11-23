import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";
import { getDecks } from "../utils";
import { useDecks } from "../state";

const DeckListView = ({ navigation }) => {
    const [decks, setDecks] = useDecks();

    React.useEffect(() => {
        getDecks().then(data => setDecks(data));
    }, []);

    const renderDecks = () => (
        <View
            style={styles.decks}
        >
            {
                decks && Object.keys(decks).map(key => (

                    <TouchableOpacity
                        key={key}
                        style={{
                            margin: SIZES.padding,
                            borderRadius: SIZES.radius,
                        }}
                        onPress={() => navigation.navigate("Deck", {
                            id: key
                        })}
                    >
                        <Text style={{ ...FONTS.h1, color: COLORS.black }}>
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
                    </TouchableOpacity>

                ))
            }
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {renderDecks()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    decks: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: SIZES.padding
    },
    scrollView: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
    }
});

export default DeckListView;