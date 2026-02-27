import { CATEGORIES } from "@/data/categories";
import { ScreenProps } from "@/types/screen";
import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";

type CategoriesScreenProps = ScreenProps<"Categories">;

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  const data = CATEGORIES;
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <TouchableRipple
              className="flex-1 mx-2 my-2 p-0 h-40"
              onPress={() => {
                navigation.navigate("MealOverview", { category: item });
              }}
            >
              <Card style={{ backgroundColor: item.color }} className="h-full">
                <Card.Content>
                  <Text variant="headlineMedium">{item.title}</Text>
                </Card.Content>
              </Card>
            </TouchableRipple>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CategoriesScreen;
