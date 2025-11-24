import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { login, logout } from '@/state/slices';
import { authApi } from '@/lib/api';
import { TrendingUp } from 'lucide-react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = await authApi.getMe();
                if (user) {
                    // We don't have the token here since it's in the cookie, 
                    // but the login action expects a token. 
                    // For now we can pass an empty string or modify the slice type if needed.
                    // However, looking at the slice, it stores the token. 
                    // If we are using cookies, we might not need to store the token in Redux anymore,
                    // or we can just store a dummy value to indicate "authenticated".
                    dispatch(login({ user, token: 'cookie-auth' }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error('Failed to restore session:', error);
                dispatch(logout());
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center animate-pulse">
                        <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-gray-400 animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
