import { CATEGORIES } from "@/data/categories";
import { MEALS } from "@/data/meals";
import { cn } from "@/lib/cn";
import { CategoryModel } from "@/types/category";
import { MealModel } from "@/types/meal";
import { ScreenProps } from "@/types/screen";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

type MealDataModel = MealModel & {
  categories: CategoryModel[];
};
type MealOverviewScreenProps = ScreenProps<"MealOverview">;

const MealOverviewScreen: React.FC<MealOverviewScreenProps> = ({
  route,
  navigation,
}) => {
  const categoryData = route.params.category;
  const data = useMemo(() => {
    const categoryMap = new Map(CATEGORIES.map((c) => [c.id, c]));

    return MEALS.reduce((acc, meal) => {
      if (!meal.categoryIds.includes(categoryData.id)) return acc;

      acc.push({
        ...meal,
        categories: meal.categoryIds
          .map((id) => categoryMap.get(id))
          .filter((d) => !!d),
      });

      return acc;
    }, [] as MealDataModel[]);
  }, [categoryData]);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerClassName="mx-4 my-4"
        renderItem={({ item, index }) => {
          return (
            <Card className={cn(index > 0 ? "mt-2" : "")}>
              <Card.Title titleVariant="headlineSmall" title={item.title} />
              <Card.Cover source={{ uri: item.imageUrl }} />
              <Card.Content className="mt-4">
                <View>
                  <Text variant="titleMedium" className="mb-2">
                    Categories:
                  </Text>
                  <View className="flex flex-row flex-wrap gap-2 items-center">
                    {item.categories.map((category) => (
                      <Chip key={category.id}>{category.title}</Chip>
                    ))}
                  </View>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("MealDetail", { meal: item });
                  }}
                >
                  Detail
                </Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default MealOverviewScreen;
