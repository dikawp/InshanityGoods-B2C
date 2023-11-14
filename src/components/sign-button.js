import React from "react";
import { Box, Center, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignButton = ( {title} ) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
      <Box py={3} backgroundColor={'#FFE60D'} borderRadius={5}>
        <Center>
          <Text fontSize={18} fontWeight={'bold'} color={'#74480F'}>{title}</Text>
        </Center>
      </Box>
    </TouchableOpacity>
  );
};

export default SignButton;

