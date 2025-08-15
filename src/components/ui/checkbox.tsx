import * as React from "react";
import  * as Checkbox  from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";


type CheckboxProps= {
    checked?: boolean
    onCheckedChange: (checked: Checkbox.CheckedState) => void
}

const CheckboxDemo = ({checked,onCheckedChange}: CheckboxProps) => (
	<form>
		<div className="flex items-center">
			<Checkbox.Root
				className={`flex size-[17px] cursor-pointer appearance-none items-center justify-center rounded-full outline-none hover:bg-violet3 animate-checkbox ${checked ? 'bg-green-500' : 'bg-transparent ring-1 ring-black dark:ring-gray-50 hidden group-hover:block'}`}
				defaultChecked
                checked={checked}
                onCheckedChange={onCheckedChange}
				id="c1"
			>
				<Checkbox.Indicator className="dark:text-black text-white">
					<CheckIcon size={13} width={20}/>
				</Checkbox.Indicator>
			</Checkbox.Root>
		</div>
	</form>
);

export default CheckboxDemo;