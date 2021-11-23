import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { IndividualDeckView, QuizView, NewQuestionView } from "./screens";
import { DeckProvider } from "./state";

const Stack = createStackNavigator();

const App = () => {
  return (
    <DeckProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"Default"}
        >
          <Stack.Screen name="Default" component={Tabs} />
          <Stack.Screen name="Deck" component={IndividualDeckView} />
          <Stack.Screen name="Quiz" component={QuizView} />
          <Stack.Screen name="Card" component={NewQuestionView} />
        </Stack.Navigator>
      </NavigationContainer>
    </DeckProvider>
  )
}

export default App;