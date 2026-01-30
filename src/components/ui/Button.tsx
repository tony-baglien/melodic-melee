import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
    children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'primary',
        isLoading = false, 
        children,
        ...props
    }, ref) => {

        const baseClasses="px-8 py-4 rounded-md"
        const variantClasses = {
            primary: 'bg-tertiary text-text hover:bg-primary/60 hover:cursor-pointer disabled:opacity-50',
        }

        const { className: propsClassName, disabled: propsDisabled, ...rest } = props
        const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${propsClassName ?? ''}`.trim()

    return (
        <button
        ref={ref}
        disabled={isLoading || propsDisabled}
        className={combinedClasses}
        {...rest}
        >
        {isLoading ? 'Loading...' : children}
        </button>
    )
    }
)
