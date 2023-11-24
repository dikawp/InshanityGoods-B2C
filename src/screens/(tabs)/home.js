import { useEffect, useState } from "react";
import {
  HStack,
  ScrollView,
  Image,
  Flex,
  Box,
  Text,
  Heading,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Categories from "../../components/categories";
import items from "../../dummy/furniture";
import ProductItem from "../../components/product-Item";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [Products, setProducts] = useState([]);

  const categoriesHandler = (categoryName) => {
    setActiveCategory(categoryName);
  };

  useEffect(() => {
    const filteredItems = items
      .filter((product) => product.kategori === activeCategory)
      .flatMap((category) => category.items);

    setProducts(filteredItems);
  }, [activeCategory]);

  // console.log(Products);

  return (
    <ScrollView mx={14} mt={20} showsVerticalScrollIndicator={false}>
      <Flex direction="row" alignItems={"center"} justifyContent={'space-between'}>
        <Box>
          <Text fontSize={24}>
            Hi Brody,
          </Text>
          <Text fontSize={18}>
            Welcome back
          </Text>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
          <Image
            size={"64px"}
            borderRadius={100}
            source={require("../../images/brody.png")}
            alt="hitam"
          />
        </TouchableOpacity>
      </Flex>
      <TouchableOpacity onPress={() => navigation.navigate("Discount")}>
        <Image
          height={150}
          width="100%"
          mt={30}
          source={require("../../images/promo_poster.png")}
          alt="diskon"
        />
      </TouchableOpacity>
      <Heading mt={5}>Categories</Heading>
      <Categories onChange={categoriesHandler} />

      <HStack flexWrap={"wrap"} justifyContent={"space-between"}>
        {Products.map((product) => {
          return <ProductItem item={product} key={product.id} />;
        })}
      </HStack>
    </ScrollView>
  );
};
export default Home;
