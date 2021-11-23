import React from "react";

const DeckContext = React.createContext({});

export const DeckProvider = ({ children }) => {
    return (
        <DeckContext.Provider value={React.useState({})}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => React.useContext(DeckContext);