'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant='ghost' size='icon' className='h-9 w-9'>
                <Sun className='h-4 w-4' />
            </Button>
        );
    }

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            className='h-9 w-9'
        >
            {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
            <span className='sr-only'>Toggle theme</span>
        </Button>
    );
}
