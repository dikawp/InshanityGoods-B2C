import { View, Text, VStack, FormControl, Input, Center } from "native-base";
import { TouchableOpacity } from "react-native";
import SignButton from "../components/sign-button";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../firebase/credential";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";


const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Auth = FIREBASE_AUTH;

  useEffect(() => {
    const session = Auth.onAuthStateChanged(user => {
      if (user){
        navigation.navigate('Tabs')
      }
    })
    return session;
  },[])

  const signUp = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password tidak sama cuy");
        return;
      }else{
        createUserWithEmailAndPassword(Auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigation.navigate("Tabs");
          }
        );   
      }
    } catch (error) {
      console.log(error);
      alert("Sign Failed :" + error);
    } finally {
      setLoading(false);
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
        <FormControl>
          <Input
            py={3}
            placeholder="Comfirm Password"
            type="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </FormControl>
        <TouchableOpacity onPress={() => signUp()}>
          <SignButton title={"Sign In"} />
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
