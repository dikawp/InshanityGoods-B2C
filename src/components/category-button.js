import { Box, Center, Text } from "native-base";
import { TouchableOpacity } from "react-native";

const CategoryButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={props.onPress}>
      <Box 
      backgroundColor={props.isActive? '#A67102' : '#DBC69A'} 
      mr={5} 
      my={4}
      py={1} 
      px={5} 
      textAlign={'Center'}
      borderRadius={10}
      shadow={3}
      >
        <Center>
            <Text color={'white'} fontWeight={400} fontSize={18}>
                {(props.title)}
            </Text>
        </Center>
      </Box>
    </TouchableOpacity>
  );
};

export default CategoryButton;