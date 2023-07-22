import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

const EditCarForm = ({ car, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: car.title,
    description: car.description,
    price: car.price,
    mileage: car.mileage,
    color: car.color,
  });

  const toast = useToast();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const id = car._id;

    fetch(`https://thoughtful-cyan-chimpanzee.cyclic.app/cars/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
          onUpdate(data.updatedCar);
        toast({
          title: "Success!",
          description: "Car details have been updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error!",
          description: "Failed to update car details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={3}>
      <FormControl mb={3}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Mileage</FormLabel>
        <Input
          type="number"
          name="mileage"
          value={formData.mileage}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Color</FormLabel>
        <Input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Update Car Details
      </Button>
    </Box>
  );
};

export default EditCarForm;
