import React from "react";
import { Box, Center, Text } from "native-base";

const SignButton = ( {title} ) => {
  return (
      <Box py={3} backgroundColor={'#FFE60D'} borderRadius={5}>
        <Center>
          <Text fontSize={18} fontWeight={'bold'} color={'#74480F'}>{title}</Text>
        </Center>
      </Box>
  );
};

export default SignButton;

