import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";

import { SIZES, FONTS, COLORS, icons } from "../constants";
import { useDecks } from "../state";
import { addCardToDeck } from "../utils";

const NewQuestionView = ({ route, navigation }) => {
    const [decks, setDecks] = useDecks();
    const [key, setKey] = React.useState("");
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");

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
                    alignItems: "flex-start",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: SIZES.padding
                    }}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{decks[key]?.title}</Text>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "flex-start",
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
                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>Add Card</Text>
                </View>
            </View>
        </View>
    );

    const addCard = () => {
        const card = {
            question,
            answer
        };
        addCardToDeck(decks[key]?.title, card)
            .then(currDecks => {
                setDecks(currDecks);
                setQuestion("");
                setAnswer("");
                navigation.goBack();
            });
    }

    const renderForm = () => (
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="Question"
                onChangeText={question => setQuestion(question)}
                defaultValue={question}
                underlineColorAndroid="transparent"
            />
            <TextInput
                style={styles.input}
                placeholder="Answer"
                onChangeText={answer => setAnswer(answer)}
                defaultValue={answer}
                underlineColorAndroid="transparent"
            />

            <View
                style={styles.buttons}
            >
                <TouchableOpacity
                    style={styles.buttonPlain}
                    onPress={() => addCard()}
                    disabled={answer.trim().length <= 0 || question.trim().length <= 0}
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
            {renderHeader()}
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

export default NewQuestionView;