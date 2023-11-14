import { useNavigation } from "@react-navigation/native";
import { Heading, Center, NativeBaseProvider } from "native-base";


const Inspiration = () => {
  const navigation = useNavigation();

  return(
    <NativeBaseProvider>
      <Center flex={1}>
        <Heading>Inspiration</Heading>
      </Center>
    </NativeBaseProvider>
  )
}
export default Inspiration;