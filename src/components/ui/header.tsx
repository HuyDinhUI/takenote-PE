import { Button } from "./button"
import { Dropdown } from "./dropdown"
import { InputSearch } from "./input"
import { IconMenu, IconHelpCircle, IconBell, IconUser } from '@tabler/icons-react'

export const Header = () => {
    const handleSelect = (value: string) => {
        console.log("Selected:", value);
    };
    return (
        <div className="flex p-3 items-center">
            <div className="w-[20%]">
                <IconMenu />
                <Dropdown
                    triggerLabel="Select role"
                    options={[
                        { label: "Frontend", value: "frontend" },
                        { label: "Backend", value: "backend" },
                        { label: "Fullstack", value: "fullstack" },
                    ]}
                    onSelect={handleSelect}
                />
            </div>
            <div className="flex flex-1 justify-center gap-2">
                <InputSearch />
                <Button title="Create" type="primary" size="sm" />
            </div>
            <div className="w-[20%] flex justify-end items-center">
                <Button type="icon" size="ic" icon={<IconBell size={20} />} />
                <Button type="icon" size="ic" icon={<IconHelpCircle size={20} />} />
                <Button type="icon" size="ic" icon={<IconUser size={20} />} />
            </div>
        </div>
    )
}