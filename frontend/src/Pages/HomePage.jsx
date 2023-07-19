import React from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  let token = localStorage.getItem("token") || null;
  // console.log(token)
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              BUYS Corp
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              Second-hand car market
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            This website is to help you choose the correct second hand car
            according to everyone's needs and requirements.
          </Text>
          <Stack direction={{ base: "column", md: "column" }} spacing={4}>
            <center>
              <Button
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                w={"40%"}
              >
                <Link to={!token ? "/signup" : "/login"}>Get Started</Link>
              </Button>
            </center>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.livemint.com/img/2020/09/16/1600x900/carsales-koVB--621x414@LiveMint_1600277936612.jpg"
          }
        />
      </Flex>
    </Stack>
  );
};

export default HomePage;
