"use client";

import { useEffect, useState } from "react";
import { NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Navbar as NavbarUi } from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { CoffeeIcon, GithubIcon, HeartFilledIcon, LinkedInIcon } from "./icons";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { User } from "@heroui/user";

const Navbar = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NavbarUi maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as={Link} className="flex justify-start items-center gap-3 max-w-fit" href="#">
          <div className="relative flex items-center justify-center w-[20px] h-[20px] border-[3.8px] border-solid border-[#076dff] rounded-[5px] rotate-45 before:block before:bg-[#007bff] before:w-[6px] before:h-[6px] before:rounded-[50%]" />
					<p className="text-foreground font-bold transition-colors duration-75">PEDRO ESTEVÃO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex items-center gap-2">
          <a href="#" aria-label="LinkedIn">
            <LinkedInIcon className="text-default-500" />
          </a>
          <a href="#" aria-label="Github">
            <GithubIcon className="text-default-500" />
          </a>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as="a"
            className="text-sm font-normal text-default-600 bg-default-100"
            href="#"
            target="_blank"
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              color="primary"
              as="button"
              className="transition-transform transform hover:scale-105"
              src="/img/pedro-estevao-profile.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" href="mailto:contato@pedroestevao.com">
              <p className="font-semibold">Pedro Estevão</p>
              <p className="font-semibold">contato@pedroestevao.com</p>
            </DropdownItem>
            <DropdownItem key="settings" href="#" target="_blank">
              <div className="flex gap-2 items-center">
                <CoffeeIcon width={40} height={20} />
                Buy me a coffee
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <a href="#" aria-label="Github">
          <GithubIcon className="text-default-500" />
        </a>
        <ThemeSwitcher />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="gap-[12px]">
        <div className="mx-4 mt-2 flex flex-col gap-10">
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              color: "primary",
              size: "lg",
              src: "/img/pedro-estevao-profile.png",
            }}
            className="transition-transform"
            description="@pedro-estevao"
            name="Pedro Estevão"
          />
          <NavbarItem className="hidden max-sm:flex">
            <Button
              as="a"
              className="text-sm font-normal text-default-600 bg-default-100 w-full"
              href="#"
              target="_blank"
              startContent={<CoffeeIcon width={40} height={20} />}
              variant="flat"
            >
              Buy me a coffee
            </Button>
          </NavbarItem>
        </div>
      </NavbarMenu>
    </NavbarUi>
  );
};

export { Navbar };
