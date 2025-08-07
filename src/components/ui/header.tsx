import { ChevronDown, LogOut, Settings, UserCog } from "lucide-react";
import { Button } from "./button"


import { InputSearch } from "./input"
import { IconMenu, IconHelpCircle, IconBell, IconUser, IconSettings, IconLock, IconLogout, IconPalette, IconSun, IconMoon } from '@tabler/icons-react'
import { DropdownMenu, type MenuItem } from "./dropdown";
import API from "@/utils/axios";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate()

    const Logout = async () => {
        try{
            const res = await API.delete('/users/logout') 
            navigate("/auth/login")
        }
        catch(error){}
    }
    
    const items: MenuItem[] = [
        { label: 'Profile', icon: <IconUser size={16} /> },
        {
            label: 'Theme',
            icon: <IconPalette size={16} />,
            items: [
                { label: 'Light', icon: <IconSun size={16} />, onClick: () => console.log('') },
                { label: 'Dark', icon: <IconMoon size={16} />, onClick: () => console.log('') },
            ]
        },
        { separator: true },
        { label: 'Logout', icon: <IconLogout size={16} />, onClick: () => Logout()},
    ];

    
    return (
        <div className="flex p-3 items-center border-b-1">
            <div className="w-[20%]">
                <IconMenu />

            </div>
            <div className="flex flex-1 justify-center gap-2">
                <InputSearch />
                <Button title="Create" variant="primary" size="sm" />
            </div>
            <div className="w-[25%] flex justify-end items-center">
                <Button variant="icon" size="ic" icon={<IconBell size={20} />} />
                <Button variant="icon" size="ic" icon={<IconHelpCircle size={20} />} />
                <DropdownMenu
                    trigger={<Button variant="icon" size="ic" icon={<IconUser size={20} />} />}
                    items={items}
                    size="md"
                />
            </div> 
        </div>
    )
}