import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from "react-native";

import { SIZES, FONTS, COLORS } from "../constants";
import { useDecks } from "../state";
import { saveDeckTitle, getDeckKey } from "../utils";

const NewDeckView = ({ navigation }) => {
    const [decks, setDecks] = useDecks();
    const [title, setTitle] = React.useState("");

    const addDeck = () => {
        saveDeckTitle(title)
            .then(currDecks => {
                setDecks(currDecks);
                setTitle("");
                navigation.navigate("Deck", {
                    id: getDeckKey(title)
                });
            });
    }

    const renderForm = () => (
        <View style={styles.form}>
            <Text
                style={{
                    ...FONTS.h4,
                    color: COLORS.darkgray
                }}
            >
                What is the title of your new deck?
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Deck title"
                onChangeText={title => setTitle(title)}
                defaultValue={title}
                underlineColorAndroid="transparent"
            />

            <View
                style={styles.buttons}
            >
                <TouchableOpacity
                    style={styles.buttonPlain}
                    onPress={() => addDeck()}
                    disabled={title.trim().length <= 0}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.white
                        }}
                    >
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderForm()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    form: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        marginTop: SIZES.padding * 10,
        marginBottom: SIZES.padding * 4
    },
    input: {
        height: 50,
        width: 300,
        borderStyle: "solid",
        borderColor: COLORS.black,
        borderRadius: 4,
        borderWidth: 1,
        margin: 8,
        padding: SIZES.padding,
        fontSize: 18,
        fontFamily: "Roboto-Regular"
    },
    buttons: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        marginTop: SIZES.padding * 2,
        marginBottom: SIZES.padding
    },
    buttonPlain: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: 3,
        borderRadius: 4,
        backgroundColor: COLORS.black,
        width: 300
    }
});

export default NewDeckView;