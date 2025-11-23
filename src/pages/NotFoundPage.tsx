import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl text-muted-foreground">Page not found</p>
      <Button onClick={() => navigate('/')} className="mt-4">
        Go to Dashboard
      </Button>
    </div>
  );
}
