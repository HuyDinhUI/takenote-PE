import { ChevronDown, HelpCircle, LogOut, Moon, Settings, Settings2, Sun, UserCog } from "lucide-react";
import { Button } from "./button"


import { InputSearch } from "./input"
import { IconMenu, IconHelpCircle, IconBell, IconUser, IconSettings, IconLock, IconLogout, IconPalette, IconSun, IconMoon } from '@tabler/icons-react'
import { DropdownMenu, DropdownMenu2, type MenuItem } from "./dropdown";
import API from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AvatarDemo from "./avatar";
import { Popover } from "./popover";
import { CreateBoard } from "../create-board";


export const Header = () => {
    const navigate = useNavigate()
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') ?? 'light');
    const username: string = localStorage.getItem('username') ?? ''

    const Logout = async () => {
        try {
            const res = await API.delete('/users/logout')
            navigate("/auth/login")
        }
        catch (error) { }
    }

    useEffect(() => {
        localStorage.setItem('theme',theme)
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);


    const items: MenuItem[] = [
        { label: username, icon: <AvatarDemo size="25px" /> },
        { label: 'Settings', icon: <Settings2 size={16} /> },
        { label: 'Help', icon: <HelpCircle size={16} /> },
        { separator: true },
        { label: 'Logout', icon: <IconLogout size={16} />, onClick: () => Logout() },
    ];


    return (
        <div className="flex p-3 items-center border-b-1">
            <div className="w-[20%]">
                <IconMenu />

            </div>
            <div className="flex flex-1 justify-center gap-2">
                <InputSearch />
                {/* <DropdownMenu2 items={items} trigger={<Button className="h-full" title="Create" variant="primary" size="sm" />}>

                </DropdownMenu2> */}

                <Popover
                    trigger={
                        <Button title="Create" variant="primary" size="sm" />
                    }
                    side="bottom"
                    sideOffset={10}
                >
                    <div className="text-sm text-gray-800">
                        <CreateBoard />
                    </div>
                </Popover>

            </div>
            <div className="w-[25%] flex justify-end items-center">
                {theme === 'light' ? <Button variant="icon" size="ic" icon={<IconSun size={20} />} onClick={() => setTheme('dark')} />
                    :
                    <Button variant="icon" size="ic" icon={<IconMoon size={20} />} onClick={() => setTheme('light')} />}
                <Button variant="icon" size="ic" icon={<IconBell size={20} />} />
                <Button variant="icon" size="ic" icon={<IconHelpCircle size={20} />} />
                <DropdownMenu
                    trigger={<Button variant="icon" size="ic" icon={<AvatarDemo size="25px" />} />}
                    items={items}
                    size="md"

                />
            </div>
        </div>
    )
}