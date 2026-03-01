import { useFavorites } from "@/store/context/favories-context";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const FavoriteScreen = () => {
  const {} = useFavorites();
  return (
    <View>
      <Text>FavoriteScreen</Text>
    </View>
  );
};

export default FavoriteScreen;
