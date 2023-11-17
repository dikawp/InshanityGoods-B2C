import {
  Box,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Divider,
  Icon,
  Pressable,
  Center,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Setting = ( ) => {
  const navigation = useNavigation();
  return (
    <>
      <Box flex={1}>
        <Box bg={"muted.500"} h={"25%"} w={"100%"}></Box>
        <Box alignSelf={"center"}>
          <Image
            source={require("../../../assets/favicon.png")}
            w={"120px"}
            h={"120px"}
            mt={"-10"}
            alt="bg Logo"
            borderWidth={1}
            borderRadius={100}
            borderColor={"black"}
            alignSelf={"center"}
          />
          <Center py={3}>
            <Heading>Brody</Heading>
          </Center>
        </Box>
        <Box py={4}>
          <VStack p={6}>
            <Box py={5}>
              <Pressable onPress={() => navigation.navigate("EditProfile")}>
                <HStack>
                  <Icon
                    as={<Ionicons name={"settings-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    Account Settings
                  </Text>
                </HStack>
              </Pressable>
            </Box>
            <Divider />
            <Box py={5}>
              <Pressable>
                <HStack>
                  <Icon
                    as={<Ionicons name={"bookmark-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    Saved Items
                  </Text>
                </HStack>
              </Pressable>
            </Box>
            <Divider />
            <Box py={5}>
              <Pressable>
                <HStack>
                  <Icon
                    as={<Ionicons name={"log-out-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    Logout
                  </Text>
                </HStack>
              </Pressable>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Setting;
