import { ImageBackground } from "react-native";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  ScrollView,
  VStack,
  Text,
  Divider,
  Icon,
  Input,
  Pressable,
} from "native-base";

const Editprofile = () => {
  return (
    <>
      <Box flex={1}>
        <Box bg={"muted.500"} h={"20%"} w={"100%"}></Box>
        <Box alignSelf={"center"}>
          <Image
            source={require("../../../assets/favicon.png")}
            w={"100px"}
            mt={"-10"}
            h={"100px"}
            alt="bg Logo"
            borderWidth={2}
            borderRadius={50}
            borderColor={"black"}
            alignSelf={"center"}
          />
          <Heading py={5}>NAMA LENGKAPPPP</Heading>
        </Box>
        <Box>
          <VStack p={6}>
            <Text mt={3} mb={2} bold>Username</Text>
            <Input placeholder="Masukan Username"></Input>
            <Text mt={3} mb={2} bold>Email</Text>
            <Input placeholder="Masukan Email"></Input>
            <Text mt={3} mb={2} bold>Phone Number</Text>
            <Input placeholder="Masukan Phone Number"></Input>
            <Text mt={3} mb={2} bold>Password</Text>
            <Input placeholder="Masukan Password"></Input>
            <Button mt={6}>
              UPDATE
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
export default Editprofile;
