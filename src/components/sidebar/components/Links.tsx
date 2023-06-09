/* eslint-disable */
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// chakra imports
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdLogout } from "react-icons/md";
import React, { useContext, useState } from "react";
import { AuthContext, TasksContext, DashboardContext } from "../../../contexts";
import LogoutModal from "./LogoutModal";

export function SidebarLinks(props: { routes: RoutesType[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { logout } = useContext(AuthContext);
  const { clearTasks } = useContext(TasksContext);
  const { clearDashboard } = useContext(DashboardContext);
  const navigate = useNavigate();

  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    if (routeName.includes("*")) {
      const route = routeName.split("/*")[0];
      return location.pathname.includes(route);
    } else {
      return location.pathname.includes(routeName);
    }
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route: RoutesType, index: number) => {
      if (route.layout === "/") {
        return (
          <NavLink
            key={index}
            to={
              route.path.includes("*") ? route.path.split("/*")[0] : route.path
            }
          >
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };

  const handleLogout = (): void => {
    clearTasks();
    clearDashboard();
    logout(navigate);
  };

  //  BRAND
  return (
    <>
      {createLinks(routes)}
      <LogoutModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        handleLogout={handleLogout}
      />
      <Box cursor="pointer" onClick={() => toggleModal()}>
        <Box>
          <HStack spacing={"26px"} py="5px" ps="10px">
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Box color={activeIcon} me="18px">
                <Icon
                  as={MdLogout}
                  width="20px"
                  height="20px"
                  color="inherit"
                />
              </Box>
              <Text me="auto" color={activeColor} fontWeight={"bold"}>
                Sair
              </Text>
            </Flex>
            <Box h="36px" w="4px" bg={"transparent"} borderRadius="5px" />
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default SidebarLinks;
