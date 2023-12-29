import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, View, Text, Center } from "native-base";



export const HistoryItem = ({item}) => { 
    <Center marginTop={4}>
    <Box
      flexDirection="row"
      alignItems="center"
      mt={5}
      backgroundColor="white"
      borderRadius={8}
      padding={8}
      width={350}
      height={160}
      shadow={5}
    >
      <View>
        <Text
          fontSize={16}
          marginBottom={2}
          fontWeight="bold"
          color="black"
        >
          yaaa
        </Text>
        <Text style={{ fontSize: 12, color: "#89580A", marginBottom: 10 }}>
          tes
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>99999999</Text>
      </View>
    </Box>
  </Center>
}