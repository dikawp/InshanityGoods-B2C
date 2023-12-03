import React, { useEffect, useState } from "react";
import { Spinner, ScrollView, Center } from "native-base";
import CategoryButton from "./buttons/category-button";
import items from "../dummy/category";

const Categories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const categoryButtonHandler = (index) => {
    setActiveCategory(index);
    onChange(items[index].kategori);
  };

  const getCategories = () => {
    setCategories(items);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="large" color="white" />
        </Center>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => {
            return (
              <CategoryButton
                title={item.kategori}
                isActive={index == activeCategory}
                onPress={() => categoryButtonHandler(index)}
                key={index}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default Categories;