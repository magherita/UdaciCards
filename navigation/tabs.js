import React from "react";
import {
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import { COLORS, icons } from "../constants";
import { DeckListView, NewDeckView } from "../screens";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected;

    if (isSelected) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        position: "absolute",
                        top: 0
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: COLORS.white
                        }}>

                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        // top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                height: 60,
                backgroundColor: COLORS.white
            }}
            activeOpacity={1}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}

const CustomTabBar = (props) => {
    return <BottomTabBar {...props.props} />
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                "tabBarShowLabel": false,
                "tabBarStyle": [
                    {
                        "display": "flex",
                        "borderTopWidth": 0,
                        "backgroundColor": "transparent",
                        "elevation": 0
                    },
                    null
                ]
            }}
            tabBar={(props) => (
                <CustomTabBar props={props} />
            )}
        >
            <Tab.Screen
                name="All decks"
                component={DeckListView}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.list}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.primary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="New deck"
                component={NewDeckView}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.add}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.primary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;