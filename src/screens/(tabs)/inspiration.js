import { useEffect, useState } from "react";
import { 
  Input, 
  NativeBaseProvider, 
  ScrollView,
  View,
  Image, 
  Flex, 
  Box, 
  Text,
  Heading, 
  Body,
  FlatList,
  Card,
  CardItem,
  Center,
  VStack
 } from "native-base";
import { TouchableOpacity } from "react-native";
import Categories from "../../components/categories-inspiration";
import inspiration_data from "../../dummy/data";
import ProductItem from "../../components/inspiration-item";

const InspirationScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [Products, setProducts] = useState([]);
  // const navigation = useNavigation();

  const categoriesHandler = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const getItems = (activeCategory) => {
    const getItems = inspiration_data.find(item => item.kategori === activeCategory);
  
    if (getItems) {
      return getItems.inspirasi; 
    } else {
      return null; 
    }
  }

  useEffect (() => {
    setProducts(getItems(activeCategory))
  })
  const renderItem = ({ item }) => {
    return <ProductItem item={item} />;
  };
  

  return(
      <ScrollView mx={14} mt={12} scrollIndicatorInsets={false}>
        <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>Inspiration</Heading>
        <Categories onChange={categoriesHandler}/>
  
        {/* <FlatList
          data={Products}
          renderItem={ renderItem }
          keyExtractor={(item) => item.id}
          numColumns={1} 
        /> */}
        <VStack>
        {Products.map((item) => {
          return <ProductItem item={item} key={item.id} />;
        })}
      </VStack>
      </ScrollView>
  )
}
export default InspirationScreen;