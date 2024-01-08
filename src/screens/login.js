import {
  View,
  Text,
  VStack,
  FormControl,
  Input,
  Center,
  Image,
} from "native-base";
import { TouchableOpacity } from "react-native";
import SignButton from "../components/buttons/sign-button";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../firebase/credential";
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from "@firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Auth = FIREBASE_AUTH;
  const session = getAuth();
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      signInWithEmailAndPassword(Auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigation.replace('Tabs');
        })
        .catch((error) => {
          if (error) {
            alert("Incorrect Email or Password");
          } else {
            alert("Sign-in failed: " + error.message);
          }
        });
    } catch (error) {
      alert("Sign-in failed: " + error.message);
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(session, (user) => {
      if (user) {
        navigation.navigate("Tabs");
        alert("Welcome back, " + user.email);
      } else {
        alert("Login Dulu sir");
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  console.log(session);

  return (
    <View mx={14} my={20}>
      <Text fontSize={"32px"}>Sign In</Text>
      <Text fontSize={"18px"}>Sign In To Account</Text>
      <VStack space={8} mt={20} width={"90%"} mx={"auto"}>
        <Center>
          <Image source={require("../../assets/inshanity.png")} alt="yaa" />
        </Center>
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
            py={3}
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </FormControl>
        <TouchableOpacity onPress={() => signIn()}>
          <SignButton title={"Sign In"} />
        </TouchableOpacity>
      </VStack>

      <Center mt={3} flexDirection={"row"}>
        <Text fontSize={"16px"}>New here?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text fontSize={"16px"} color={"blue.400"} ml={2}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </Center>
    </View>
  );
};

export default Login;
