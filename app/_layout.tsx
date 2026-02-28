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
import MealDetailScreen from "@/screens/MealDetailScreen";
import MealOverviewScreen from "@/screens/MealOverviewScreen";
import { CategoryModel } from "@/types/category";
import { MealDataModel } from "@/types/meal";
import { LogBox } from "react-native";
import "../global.css";

// Handle error
// [runtime not ready] Error: Non-js exception: compiling JS failed: 10839:8 react native
// Enable logging for all warnings
LogBox.ignoreAllLogs(false);

// Capture global JS errors
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error("Caught global error:", error, isFatal);
});

export type RootStackParamList = {
  Categories: {};
  MealDetail: {
    meal: MealDataModel;
  };
  MealOverview: { category: CategoryModel };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AllProviders>
        <Stack.Navigator initialRouteName="Categories">
          <Stack.Screen name="Categories" component={CategoriesScreen} />
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
