import React, { useState } from 'react';
import clsx from 'clsx'
import { Check, Ellipsis, ChevronDown, EarthLock, Earth, Users } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { Popover } from './ui/popover';
import { Button } from './ui/button';
import API from '@/utils/axios';
import { useNavigate } from 'react-router-dom';


const listBackgroundImg = [
    {
        id: '1',
        img: 'https://images.unsplash.com/photo-1742156345582-b857d994c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzU0MjIzNTg0fA&ixlib=rb-4.1.0&q=80&w=400&quot;);'
    },
    {
        id: '2',
        img: 'https://images.unsplash.com/photo-1741812191037-96bb5f12010a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzU0MjIzNTg0fA&ixlib=rb-4.1.0&q=80&w=400&quot;);'
    },
    {
        id: '3',
        img: 'https://images.unsplash.com/photo-1742937163916-78fd07cc3b49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzU0MjIzNTg0fA&ixlib=rb-4.1.0&q=80&w=400&quot;);'
    },
    {
        id: '4',
        img: 'https://images.unsplash.com/photo-1742845918430-c6093f93f740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzU0MjIzNTg0fA&ixlib=rb-4.1.0&q=80&w=400&quot;);'
    }
]

const listBackgroundColor = [
    {
        id: '1',
        img: 'https://trello.com/assets/13425f9db06517de0f7f.svg'
    },
    {
        id: '2',
        img: 'https://trello.com/assets/707f35bc691220846678.svg'
    },
    {
        id: '3',
        img: 'https://trello.com/assets/d106776cb297f000b1f4.svg'
    },
    {
        id: '4',
        img: 'https://trello.com/assets/8ab3b35f3a786bb6cdac.svg'
    },
    {
        id: '5',
        img: 'https://trello.com/assets/a7c521b94eb153008f2d.svg'
    }
]
const visibility_list = [
    {
        icon: <EarthLock />,
        value: 'private',
        title: 'Private',
        des: 'Board members and Trello Workspace Workspace admins can see and edit this board'
    },
    {
        icon: <Users />,
        value: 'workspace',
        title: 'Workspace',
        des: 'All members of the Trello Workspace Workspace can see and edit this board'
    },
    {
        icon: <Earth />,
        value: 'public',
        title: 'Public',
        des: 'Anyone on the internet can see this board. Only board members can edit'
    },
]

export const CreateBoard = () => {
    const [selected, setSelected] = useState(listBackgroundImg[0].img)
    const [visibility, setVisibility] = useState('workspace')
    const [title, setTitle] = useState<string>()
    const navigate = useNavigate()
    
    const submit = async () => {

        const data = {
            title,
            visibility,
            cover: selected
        }

        try{
            const res = await API.post('/boards',data)
            navigate(`/b/${res.data.newData._id}/${res.data.newData.title}`)

        }
        catch (error) {}
    }
    return (
        <div className="w-[300px] p-1 dark:text-white">
            <div className="py-2 flex justify-center items-center">
                <span className="font-bold">Create board</span>
            </div>
            <div className="flex justify-center">
                <div className="w-[200px] h-[120px] flex justify-center items-center bg-cover" style={{ backgroundImage: `url('${selected}')` }}>
                    <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg"></img>
                </div>
            </div>
            <div className="mt-5">
                <label>Background</label>
                <div className='ratio'>
                    <ul className='grid grid-cols-4 list-none gap-2 pb-2'>
                        {listBackgroundImg.map(item => (
                            <li key={item.id} className='h-[40px]'>
                                <button onClick={() => setSelected(item.img)} className='cursor-pointer h-full w-full flex justify-center items-center bg-cover rounded-[3px] brightness-90 hover:brightness-70' style={{ backgroundImage: `url('${item.img}')` }}>
                                    {selected === item.img && <Check color='white' size={15} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className='grid grid-cols-6 list-none gap-2'>
                        {listBackgroundColor.map(item => (
                            <li key={item.id} className='h-[32px]'>
                                <button onClick={() => setSelected(item.img)} className='cursor-pointer h-full w-full flex justify-center items-center bg-cover rounded-[3px] brightness-90 hover:brightness-70' style={{ backgroundImage: `url('${item.img}')` }}>
                                    {selected === item.img && <Check color='white' size={15} />}
                                </button>
                            </li>
                        ))}
                        <li className='h-[32px]'>
                            <button className='cursor-pointer flex rounded-[3px] justify-center items-center bg-gray-100 h-full w-full'>
                                <span><Ellipsis size={15} /></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='mt-3'>
                <div>
                    <div className='grid gap-2'>
                        <label>Board title</label>
                        <input
                            className='invalid:ring-pink-500 invalid:text-pink-600 peer ... ring ring-gray-400 rounded-[3px] p-2'
                            id="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                        <p className="invisible peer-invalid:visible ... pb-2">👋
                            Board title is required</p>
                    </div>
                    <div className='grid gap-2 pb-4'>
                        <label>Visibility</label>
                        <Popover
                            trigger={
                                <button className='cursor-pointer flex justify-between items-center ring ring-gray-400 rounded-[3px] p-2'>
                                    <span>{visibility}</span>
                                    <ChevronDown size={15} />
                                </button>
                            }
                            side="top"
                            sideOffset={10}
                        >
                            <div className='w-[280px] text-sm'>
                                {visibility_list.map(item => (
                                    <button onClick={() => setVisibility(item.value)} className={clsx(`flex w-full cursor-pointer items-center p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-sm ${visibility === item.value ? 'bg-blue-500/10 text-blue-500' : ''}`)}>
                                        <div className='p-3 flex justify-center'>{item.icon}</div>
                                        <div className='text-left px-2'>
                                            <label className='font-bold'>{item.title}</label>
                                            <p>{item.des}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Popover>
                    </div>
                </div>
                <Button onClick={() => submit()} className='w-full justify-center font-bold' variant='primary' title='Create' disabled={title ? false : true}/>
                <Button title='Start with a template' size='sm' className='w-full justify-center mt-2 font-bold dark:text-black'/>
            </div>
        </div>
    )
}

