import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  useToast,
} from "@chakra-ui/react";

const Carform = ({ cars, setCars }) => {
  const [form, setForm] = useState({});
  const toast = useToast();
  const token = localStorage.getItem("token");
  console.log(token, "token");

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (token) {
      console.log(form,"form");
      try {
        let res = await fetch("http://localhost:8080/cars/addcar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        let data = await res.json();
        console.log(data,"data");
        setCars([...cars, data]);

        toast({
          title: "New car added",
          status: "success",
          position:"top",
          duration: 2000,
          isClosable: true,
        });
      } catch (e) {
        console.log(e,"error");
      }
    }
    else {
      alert("please login")
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add your car here</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="image">
              <FormLabel>Car Image</FormLabel>
              <Input
                type="text"
                placeholder="image"
                name="image"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="price">
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="price"
                name="price"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="color">
              <FormLabel>Select color</FormLabel>
              <Select placeholder="color" onChange={handleChange} name="color">
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Gray">Gray</option>
              </Select>
            </FormControl>
            <FormControl id="mileage">
              <FormLabel>Mileage</FormLabel>
              <Input
                type="number"
                placeholder="mileage"
                name="mileage"
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                onClick={handleSubmit}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Add Car
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Carform;
