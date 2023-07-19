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
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };
    fetch("https://thoughtful-cyan-chimpanzee.cyclic.app/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log(res,"res")
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res,"myres")
        if (!res.token) {
          throw new Error("Token not received");
        }
        console.log(res);
        localStorage.setItem("token", res.token);
        toast({
          title: "Login successful.",
          status: "success",
          position: "top-center",
          duration: 2000,
          isClosable: true,
        });
        navigate("/allcars");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Login Failed.",
          description: "Please try again.",
          position: "top-center",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    setEmail("");
    setPassword("");
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                onClick={handleLogin}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Log In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                New to the website? Please{" "}
                <Link to="/signup">
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
