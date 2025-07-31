import {IconSearch} from '@tabler/icons-react'

export const InputSearch = () => {
    return (
        <div className='flex items-center ring ring-gray-400 flex-1 rounded-sm'>
            <div className='p-2'>
                <IconSearch size={15}/>
            </div>
            <input className='outline-none w-full' placeholder='Search'></input>
        </div>
    )
}