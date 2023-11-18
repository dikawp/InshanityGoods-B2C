import {
  View,
  Text,
  VStack,
  FormControl,
  Input,
  Center,
} from "native-base";
import { TouchableOpacity } from "react-native";
import SignButton from "../components/sign-button";
import { useNavigation } from "@react-navigation/native";

function Register() {
 const navigation = useNavigation()
  return (
      <View mx={14} my={20}>
        <Text fontSize={"32px"}>Sign Up</Text>
        <Text fontSize={"18px"}>Create Your Account</Text>
        <VStack space={8} mt={20} width={'90%'} mx={'auto'}>
          <FormControl>
            <Input py={3} placeholder="Username" />
          </FormControl>
          <FormControl>
            <Input py={3} placeholder="Email" />
          </FormControl>
          <FormControl>
            <Input py={3} placeholder="Password" type="password" />
          </FormControl>
          <FormControl>
            <Input py={3} placeholder="Comfirm Password" type="password" />
          </FormControl>
          <SignButton title={'Sign Up'}/>
        </VStack>

        <Center mt={3} flexDirection={"row"}>
          <Text fontSize={"16px"}>Already have Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text fontSize={"16px"} color={"blue.400"} ml={2}>
              Sign In
            </Text>
          </TouchableOpacity>
        </Center>
      </View>
  );
}

export default Register;
