import { CATEGORIES } from "@/data/dummy-data";
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
              className="flex-1 mx-2 my-2"
              onPress={() => {
                navigation.navigate("MealOverview", { categoryId: item.id });
              }}
            >
              <Card>
                <Card.Content>
                  <Text variant="bodyLarge">{item.title}</Text>
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
