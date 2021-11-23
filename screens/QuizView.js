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
import { useDecks } from "../state";

const QuizView = ({ route, navigation }) => {
    const [decks, _] = useDecks();
    const [key, setKey] = React.useState("");
    const [isAnswer, setIsAnswer] = React.useState(true);
    const [isQuestion, setIsQuestion] = React.useState(false);
    const [card, setCard] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const totalCards = decks[key]?.questions?.length;

    React.useEffect(() => {
        const { id } = route.params;
        setKey(id);
    }, []);

    const renderHeader = () => (
        <>
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
                        <Text style={{ ...FONTS.h3, color: COLORS.black }}>Quiz</Text>
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
                        <Text style={{ ...FONTS.h3, color: COLORS.black }}>{decks[key]?.title}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ ...FONTS.h2, color: COLORS.black, marginLeft: SIZES.padding }}>
                    {card}/{totalCards}
                </Text>
            </View>
        </>
    );

    const renderMessage = () => (
        <View style={styles.alert}>
            <Text
                style={{
                    ...FONTS.h4,
                    color: COLORS.white
                }}
            >
                Add some cards to the {decks[key]?.title} deck in order to start a quiz.
            </Text>
        </View>
    );

    const flipCard = () => {
        setIsAnswer(!isAnswer);
        setIsQuestion(!isQuestion);
    }

    const nextCard = () => {
        if (card < totalCards) {
            setCard(card + 1);
        }
    }

    const correctChoice = () => {
        setScore(score + 1);
        nextCard();
    }

    const incorrectChoice = () => {
        nextCard();
    }

    const renderQuiz = () => (
        <View
            style={styles.quiz}
        >
            {/* Quiz info */}
            {
                isAnswer
                &&
                (
                    <>
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>
                            {decks[key]?.questions[card]?.question}
                        </Text>
                        <TouchableOpacity
                            style={styles.buttonPlain}
                            onPress={() => flipCard()}
                        >
                            <Text
                                style={{
                                    ...FONTS.body2,
                                    color: COLORS.primary,
                                    marginLeft: SIZES.padding2,
                                    marginRight: SIZES.padding2
                                }}
                            >
                                Answer
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }
            {
                isQuestion
                &&
                (
                    <>
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>
                            {decks[key]?.questions[card]?.answer}
                        </Text>
                        <TouchableOpacity
                            style={styles.buttonPlain}
                            onPress={() => flipCard()}
                        >
                            <Text
                                style={{
                                    ...FONTS.body2,
                                    color: COLORS.primary,
                                    marginLeft: SIZES.padding2,
                                    marginRight: SIZES.padding2
                                }}
                            >
                                Question
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }
            {/* Buttons */}
            <View
                style={styles.buttons}
            >
                <TouchableOpacity
                    style={styles.buttonGreen}
                    onPress={() => correctChoice()}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.white
                        }}
                    >
                        Correct
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonRed}
                    onPress={() => incorrectChoice()}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.white
                        }}
                    >
                        Incorrect
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderScore = () => (
        <View style={styles.score}>
            {
                (((score / totalCards) * 100) > 60)
                &&
                (
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                        Congratulations! You scored {score} out of {totalCards} points!
                    </Text>
                )
            }

            {
                (((score / totalCards) * 100) < 60)
                &&
                (
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                        You scored {score} out of {totalCards} points!
                    </Text>
                )
            }
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {totalCards <= 0 && renderMessage()}
            {(card < totalCards) && renderQuiz()}
            {(card >= totalCards && totalCards > 0) && renderScore()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    alert: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.red,
        borderRadius: 4,
        padding: SIZES.padding,
        marginTop: SIZES.padding * 10,
        marginBottom: SIZES.padding * 10,
        marginLeft: SIZES.padding * 2,
        marginRight: SIZES.padding * 2,
        height: 300
    },
    score: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.green,
        borderRadius: 4,
        padding: SIZES.padding,
        marginTop: SIZES.padding * 10,
        marginBottom: SIZES.padding * 10,
        marginLeft: SIZES.padding * 2,
        marginRight: SIZES.padding * 2,
        height: 300
    },
    quiz: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        marginTop: SIZES.padding * 15,
        marginBottom: SIZES.padding * 4
    },
    buttons: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        marginTop: SIZES.padding * 2,
        marginBottom: SIZES.padding
    },
    buttonGreen: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: 3,
        borderRadius: 4,
        backgroundColor: COLORS.green,
        width: 300
    },
    buttonRed: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.padding,
        margin: 3,
        borderRadius: 4,
        backgroundColor: COLORS.red,
        width: 300
    }
});

export default QuizView;