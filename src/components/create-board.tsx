import React, { useState } from 'react';
import clsx from 'clsx'
import { Check, Ellipsis } from 'lucide-react'
import { useForm } from 'react-hook-form';

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
export const CreateBoard = () => {
    const [selected, setSelected] = useState('https://images.unsplash.com/photo-1742156345582-b857d994c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzU0MjIzNTg0fA&ixlib=rb-4.1.0&q=80&w=400&quot;);')
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const [error,setError] = useState()
    const submitLogin = (data: any) => {

    }
    return (
        <div className="w-[300px]">
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
                                <button onClick={() => setSelected(item.img)} className='h-full w-full flex justify-center items-center bg-cover rounded-[3px] brightness-90 hover:brightness-70' style={{ backgroundImage: `url('${item.img}')` }}>
                                    {selected === item.img && <Check color='white' size={15} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className='grid grid-cols-6 list-none gap-2'>
                        {listBackgroundColor.map(item => (
                            <li key={item.id} className='h-[32px]'>
                                <button onClick={() => setSelected(item.img)} className='h-full w-full flex justify-center items-center bg-cover rounded-[3px] brightness-90 hover:brightness-70' style={{ backgroundImage: `url('${item.img}')` }}>
                                    {selected === item.img && <Check color='white' size={15}/>}
                                </button>
                            </li>
                        ))}
                        <li className='h-[32px]'>
                            <button className='flex rounded-[3px] justify-center items-center bg-gray-100 h-full w-full'>
                                <span><Ellipsis size={15}/></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <form onSubmit={handleSubmit(submitLogin)} className='mt-3'>
                <div>
                    <div className='grid gap-2'>
                        <label>Board title</label>
                        <input
                        className='ring ring-gray-400 rounded-[3px] p-2' 
                        id="title"
                        required
                        {...register("title",{required: "Board title is required"})}></input>
                    </div>
                    <div className='grid gap-2'>
                        <label>Board title</label>
                        <input
                        className='ring ring-gray-400 rounded-[3px] p-2' 
                        id="title"
                        required
                        {...register("title",{required: "Board title is required"})}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

