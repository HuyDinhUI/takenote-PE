import type { ReactNode } from 'react';

type ButtonVariant = 'default' | 'primary' | 'danger' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg' | 'ic';

type ButtonProps = {
    title?: string;
    type?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    icon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
    default: 'bg-gray-500 hover:bg-gray-600 text-white',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    icon: 'hover:bg-gray-600/20'
};

const sizeClass: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    ic: 'p-2'
};

export const Button = ({
    title,
    type = 'default',
    size = 'md',
    disabled = false,
    icon,
}: ButtonProps) => {
    const base = 'inline-flex items-center gap-2 rounded transition duration-200';
    const finalClass = `${base} ${variantClass[type]} ${sizeClass[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`

    return (
        <button className={finalClass} disabled={disabled}>
            {icon && <span>{icon}</span>}
            {title && <span>{title}</span>}
        </button>
    )
}