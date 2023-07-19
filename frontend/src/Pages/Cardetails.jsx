import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Cardetails = ({ cars, setCars }) => {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [sortData, setSortData] = useState(cars);
  const toast = useToast();

  function getTask() {
    if (token) {
      fetch("https://thoughtful-cyan-chimpanzee.cyclic.app/cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCars(data);
          setSortData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }
  const handleDelete = (id) => {
    fetch(`https://thoughtful-cyan-chimpanzee.cyclic.app/cars/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleFilter = (event) => {
    const { value } = event.target;
    if (value === "Default") {
      setCars(sortData);
    } else {
      const filteredData = sortData.filter((el) => el.color === value);
      setCars(filteredData);
    }
  };

  const handleSort = (event) => {
    const { value } = event.target;
    if (value === "htl") {
      const sortedData = [...cars].sort((a, b) => b.price - a.price);
      setCars(sortedData);
    } else if (value === "lth") {
      const sortedData = [...cars].sort((a, b) => a.price - b.price);
      setCars(sortedData);
    }
  };

  useEffect(() => {
    getTask();
  }, [token]);

  if (isLoading) {
    return (
      <Box>
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
    );
  }

  if (!token) {
    return <Box>Please log in to view car details.</Box>;
  }

  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p={3}
        justifyContent={"space-between"}
      >
        <Box>
          <Button colorScheme="teal">
            <Link to="/carform">Add new car</Link>
          </Button>
        </Box>
        <ButtonGroup gap="4">
          <FormControl>
            <FormLabel>Select color</FormLabel>
            <Select onChange={handleFilter}>
              <option value="Default">Default</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select Mileage</FormLabel>
            <Select onChange={handleSort}>
              <option value="">Mileage</option>
              <option value="lth">Low to High</option>
              <option value="htl">High to Low</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select price</FormLabel>
            <Select onChange={handleSort}>
              <option value="">Prices</option>
              <option value="lth">Low to High</option>
              <option value="htl">High to Low</option>
            </Select>
          </FormControl>
        </ButtonGroup>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {cars &&
          cars.map((el) => {
            return (
              <Box key={el._id} boxShadow="lg" p={3}>
                <Box>
                  <Image src={el.image} alt="car" />
                </Box>
                <Box>{el.title}</Box>
                <Text noOfLines={3} isTruncated>
                  {el.description}
                </Text>
                <Box>Price: {el.price}</Box>
                <Box>Mileage: {el.mileage}</Box>
                <Box>Color: {el.color}</Box>
                <Button
                  onClick={() => handleDelete(el._id)}
                  colorScheme="teal"
                  mt={2}
                >
                  Delete
                </Button>
              </Box>
            );
          })}
      </Grid>
    </>
  );
};

export default Cardetails;
