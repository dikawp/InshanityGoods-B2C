import React from "react";
import { Center, ScrollView } from "native-base";
import { Box, View, Text } from "native-base";


const History = () => {
  return (
    <ScrollView mx={14} mt={2} pb={5}>
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
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                99999999
            </Text>
          </View>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default History;
