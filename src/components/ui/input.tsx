import { IconSearch } from '@tabler/icons-react'

import React from 'react'

export const InputSearch = () => {
    return (
        <div className='flex items-center ring ring-gray-400 flex-1 rounded-sm'>
            <div className='p-2'>
                <IconSearch size={15} />
            </div>
            <input className='outline-none w-full' placeholder='Search'></input>
        </div>
    )
}

type InputVariant = 'default' | 'primary' | 'danger'
type InputSize = 'sm' | 'md' | 'lg'

type InputProps = {
    placeholder?: string,
    variant?: InputVariant,
    size?: InputSize,
} & React.InputHTMLAttributes<HTMLInputElement>

const variantClass: Record<InputVariant, string> = {
    default: 'ring ring-gray-200',
    primary: '',
    danger: ''
}

const sizeClass: Record<InputSize, string> = {
    sm: '',
    md: 'p-2',
    lg: ''
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            placeholder,
            variant = 'default',
            size = 'md',
            className,
            ...rest
        },
        ref
    ) => {
        const base = 'w-full rounded-sm'
        const finalClass = `${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`

        return (
            <input ref={ref} className={finalClass} {...rest} placeholder={placeholder}>

            </input>
        )
    }

)