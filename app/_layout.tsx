import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AllProviders } from "@/providers";
import CategoriesScreen from "@/screens/CategoriesScreen";
import FavoriteScreen from "@/screens/FavoriteScreen";
import MealDetailScreen from "@/screens/MealDetailScreen";
import MealOverviewScreen from "@/screens/MealOverviewScreen";
import { CategoryModel } from "@/types/category";
import { MealDataModel } from "@/types/meal";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LogBox } from "react-native";
import { Icon } from "react-native-paper";
import "../global.css";

const Drawer = createDrawerNavigator();

// Handle error
// [runtime not ready] Error: Non-js exception: compiling JS failed: 10839:8 react native
// Enable logging for all warnings
LogBox.ignoreAllLogs(false);

// Capture global JS errors
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error("Caught global error:", error, isFatal);
});

export type RootStackParamList = {
  Drawer: {};
  MealDetail: {
    meal: MealDataModel;
  };
  MealOverview: { category: CategoryModel };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const CategoriesDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Icon source="menu" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon source="star" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AllProviders>
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Drawer"
            component={CategoriesDrawerNavigator}
          />
          <Stack.Screen
            name="MealOverview"
            component={MealOverviewScreen}
            options={({ route }) => ({
              title: route.params.category.title,
            })}
          />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={({ route }) => ({
              title: route.params.meal.title,
            })}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </AllProviders>
    </ThemeProvider>
  );
}
