// app/providers.tsx
"use client";

import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const client = new QueryClient();
interface ProvidersProps extends React.PropsWithChildren {
}

export function Providers({ children }: ProvidersProps) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
            <NextUIProvider>
                <QueryClientProvider client={client}>
                        {children}
                </QueryClientProvider>
            </NextUIProvider>
        </NextThemesProvider>
    )
}
