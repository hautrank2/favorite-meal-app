import { CATEGORIES } from "@/data/dummy-data";
import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";

const CategoriesScreen = () => {
  const data = CATEGORIES;
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <Card>
              <Card.Content>
                <Text variant="bodyLarge">{item.title}</Text>
              </Card.Content>
            </Card>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CategoriesScreen;
