import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const page = usePage();

    return (
        <>
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md'>
                <img alt='logo' src='blue-logo.jpg' />
            </div>
            <div className='ml-1 grid flex-1 text-left text-sm'>
                <span className='mb-0.5 truncate leading-tight font-semibold'>{page.props.name}</span>
            </div>
        </>
    );
}
