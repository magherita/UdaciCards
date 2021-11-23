import AsyncStorage from '@react-native-async-storage/async-storage';

let decks = {
    "React": {
        title: "React",
        questions: [
            {
                question: "What is React?",
                answer: "A library for managing user interfaces"
            },
            {
                question: "Where do you make Ajax requests in React?",
                answer: "The componentDidMount lifecycle event"
            }
        ]
    },
    "JavaScript": {
        title: "JavaScript",
        questions: [
            {
                question: "What is a closure?",
                answer: "The combination of a function and the lexical environment within which that function was declared."
            }
        ]
    }
};

export const getDeckKey = (title) => {
    let key = title?.trim();
    key = title?.replace(/\s+/g, "-");
    return key;
}

export const getDecks = () => {
    return AsyncStorage.getItem("decks")
        .then(jsonStr => {
            let cache = jsonStr !== null ? JSON.parse(jsonStr) : null;
            // const isEmpty = Object.keys(cache).length === 0 && cache.constructor === Object;
            const isEmpty = cache === null;
            return isEmpty ? decks : cache;
        });
}

export const getDeck = (title) => {
    const key = getDeckKey(title);
    return decks[key];
}

export const saveDeckTitle = (title) => {
    return getDecks().then(data => {
        const key = getDeckKey(title);

        // ensure we have no duplicates
        if (Object.keys(data).includes(key)) {
            return data;
        }

        const deck = {
            title,
            questions: []
        };
        const currDecks = {
            ...data,
            [key]: deck
        };
        AsyncStorage.setItem("decks", JSON.stringify(currDecks));
        return currDecks;
    });
}

export const addCardToDeck = (title, card) => {
    return getDecks().then(data => {
        const key = getDeckKey(title);
        const updatedDeck = {
            title,
            questions: [
                ...data[key].questions,
                card
            ]
        };
        data[key] = updatedDeck;
        AsyncStorage.setItem("decks", JSON.stringify(data));
        return data;
    });
}

export const deleteDeckByTitle = (title) => {
    return getDecks().then(data => {
        const currentDecks = Object.keys(data)
            .filter(key => key !== getDeckKey(title))
            .reduce((currDecks, key) => {
                currDecks[key] = data[key];
                return currDecks;
            }, {});
        AsyncStorage.setItem("decks", JSON.stringify(currentDecks));
        return currentDecks;
    });
}