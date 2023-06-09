import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "../../../../layouts/auth/Default";
// Assets
import illustration from "../../../../assets/img/auth/auth.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { useFormik } from "formik";
import { IUserRegisterRequest } from "../../models/register/IUserRegisterRequest";
import { signUpValidation } from "../../utils/validation/signUpValidation";
import { AuthContext } from "../../../../contexts/auth/context/AuthContext";

function SignUp() {
  const { register, isLoading } = useContext(AuthContext);

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClick = (selector: string) => {
    if (selector === "password") {
      setShow((prevState) => !prevState);
    } else {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

  // const [authService, isLoading] = makeAuthRegisterService();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidation,
    onSubmit: async (values: IUserRegisterRequest) => {
      await register(values);
    },
  });

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px", lg: "80px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Cadastrar
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Realize seu cadastro agora para acessar!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Nome
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb="24px"
                placeholder="Digite seu nome"
                name="name"
                fontWeight="500"
                size="lg"
                onChange={(e) => {
                  validation.handleChange(e);
                }}
                value={validation.values.name || ""}
              />
            </FormControl>

            <FormControl
              isInvalid={
                !!(validation.touched.username && validation.errors.username)
              }
            >
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Nome de usuário<Text color={brandStars}>*</Text>
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb={
                  !!(validation.touched.username && validation.errors.username)
                    ? ""
                    : "24px"
                }
                isInvalid={
                  !!(validation.touched.username && validation.errors.username)
                }
                placeholder="Digite seu nome de usuário"
                name="username"
                fontWeight="500"
                size="lg"
                onChange={(e) => {
                  validation.handleChange(e);
                }}
                value={validation.values.username || ""}
              />
              <FormErrorMessage mb="10px">
                {validation.errors.username}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                !!(validation.touched.email && validation.errors.email)
              }
            >
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                name="email"
                ms={{ base: "0px", md: "0px" }}
                placeholder="email@exemplo.com"
                mb={
                  !!(validation.touched.email && validation.errors.email)
                    ? ""
                    : "24px"
                }
                fontWeight="500"
                size="lg"
                onChange={(e) => {
                  validation.handleChange(e);
                }}
                value={validation.values.email || ""}
                isInvalid={
                  !!(validation.touched.email && validation.errors.email)
                }
              />
              <FormErrorMessage mb="10px">
                {validation.errors.email}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                !!(validation.touched.password && validation.errors.password)
              }
            >
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Senha<Text color={brandStars}>*</Text>
              </FormLabel>

              <InputGroup size="md">
                <Input
                  variant="auth"
                  fontSize="sm"
                  placeholder="Digite sua senha"
                  mb={
                    !!(
                      validation.touched.password && validation.errors.password
                    )
                      ? ""
                      : "24px"
                  }
                  size="lg"
                  name="password"
                  onChange={(e) => {
                    validation.handleChange(e);
                  }}
                  value={validation.values.password}
                  type={show ? "text" : "password"}
                  isInvalid={
                    !!(
                      validation.touched.password && validation.errors.password
                    )
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => handleClick("password")}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage mb="10px">
                {validation.errors.password}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                !!(
                  validation.touched.confirmPassword &&
                  validation.errors.confirmPassword
                )
              }
            >
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Confirme a senha<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  variant="auth"
                  fontSize="sm"
                  placeholder="Confirme sua senha"
                  mb={
                    !!(
                      validation.touched.confirmPassword &&
                      validation.errors.confirmPassword
                    )
                      ? ""
                      : "24px"
                  }
                  size="lg"
                  name="confirmPassword"
                  onChange={(e) => {
                    validation.handleChange(e);
                  }}
                  value={validation.values.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  isInvalid={
                    !!(
                      validation.touched.confirmPassword &&
                      validation.errors.confirmPassword
                    )
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={
                      showConfirmPassword
                        ? RiEyeCloseLine
                        : MdOutlineRemoveRedEye
                    }
                    onClick={() => handleClick("confirmPassword")}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage mb="24px">
                {validation.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>

            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              isLoading={isLoading}
            >
              Cadastrar
            </Button>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Já possui conta?
              <NavLink to="/">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Acesse agora!
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
