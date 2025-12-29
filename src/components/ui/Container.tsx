interface ContainerProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;

}
export function Container ({variant, children}: ContainerProps){

    const variantClasses = {
        primary: 'container min-h-[60vh] my-8',
        secondary: '',
    }

    return (
        <div className={`w-full flex items-center justify-center bg-container ${variantClasses[variant || 'primary']}`}>{children}</div>
    )
}