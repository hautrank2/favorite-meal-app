import { ScreenProps } from "@/types/screen";
import React, { useLayoutEffect } from "react";
import { FlatList, Image, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

type MealDetailScreenProps = ScreenProps<"MealDetail">;

const MealDetailScreen = ({ route, navigation }: MealDetailScreenProps) => {
  const mealData = route.params.meal;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert("This is a button!")}>Info</Button>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Image
        className="w-full h-80 object-cover"
        source={{ uri: mealData.imageUrl }}
        style={{ borderRadius: 0 }}
      />
      <View className="px-4">
        <View className="mx-auto">
          <Text variant="headlineSmall" className="text-center mt-4">
            {mealData.title}
          </Text>
        </View>

        <View className="flex flex-row gap-4 justify-center mt-2">
          <Chip>{mealData.duration}m</Chip>
          <Chip className="uppercase">{mealData.complexity}</Chip>
          <Chip>{mealData.affordability}</Chip>
        </View>

        <Card className="mt-2">
          <Card.Title title="Ingredients" titleVariant="headlineSmall" />
          <Card.Content>
            <FlatList
              keyExtractor={(item) => item}
              data={mealData.ingredients}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text variant="bodyLarge">
                      {index + 1}. {item}
                    </Text>
                  </View>
                );
              }}
            />
          </Card.Content>
        </Card>

        <Card className="mt-2">
          <Card.Title title="Steps" titleVariant="headlineSmall" />
          <Card.Content>
            <FlatList
              keyExtractor={(item) => item}
              data={mealData.steps}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text variant="bodyLarge">
                      {index + 1}. {item}
                    </Text>
                  </View>
                );
              }}
            />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default MealDetailScreen;
