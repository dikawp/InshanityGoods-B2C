import {
  View,
  Text,
  VStack,
  FormControl,
  Input,
  Center,
  Icon,
  Pressable,
} from "native-base";
import { TouchableOpacity } from "react-native";
import SignButton from "../components/buttons/sign-button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FIREBASE_AUTH, FIRESTORE } from "../firebase/credential";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

const Register = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const Auth = FIREBASE_AUTH;
  const db = FIRESTORE;

  const signUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password tidak sama cuy");
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          Auth,
          email,
          password
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: displayName,
          email: userCredential.user.email,
          phoneNumber: "",
          photoUrl: "",
        });
        navigation.replace('Tabs')
      }
    } catch (error) {
      console.log(error);
      alert("Sign Failed :" + error);
    }
  };

  return (
    <View mx={14} my={20}>
      <Text fontSize={"32px"}>Sign Up</Text>
      <Text fontSize={"18px"}>Create Your Account</Text>
      <VStack space={8} mt={20} width={"90%"} mx={"auto"}>
        <FormControl>
          <Input
            py={3}
            placeholder="Username"
            value={displayName}
            type="text"
            onChangeText={(text) => setDisplayName(text)}
          />
        </FormControl>
        <FormControl>
          <Input
            py={3}
            placeholder="Email"
            value={email}
            type="email"
            onChangeText={(text) => setEmail(text)}
          />
        </FormControl>
        <FormControl>
          <Input
            type={show ? "text" : "password"}
            onChangeText={(text) => setPassword(text)}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
          />
        </FormControl>
        <FormControl>
          <Input
            type={show ? "text" : "password"}
            onChangeText={(text) => setConfirmPassword(text)}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Confirm Password"
          />
        </FormControl>
        <TouchableOpacity onPress={signUp}>
          <SignButton title={"Sign Up"} />
        </TouchableOpacity>
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
};

export default Register;
