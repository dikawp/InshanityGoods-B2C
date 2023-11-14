import { useNavigation } from "@react-navigation/native";
import { Heading, Center, NativeBaseProvider } from "native-base";


const Saved = () => {
  // const navigation = useNavigation();

  return(
    <NativeBaseProvider>
      <Center flex={1}>
        <Heading>Saved</Heading>
      </Center>
    </NativeBaseProvider>
  )
}
export default Saved;