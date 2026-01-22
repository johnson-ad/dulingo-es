'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Il y a un problème avec la configuration du serveur.';
      case 'AccessDenied':
        return 'Accès refusé.';
      case 'Verification':
        return 'Le lien de vérification a expiré ou a déjà été utilisé.';
      default:
        return 'Une erreur est survenue lors de la connexion.';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            😕
          </motion.div>
          <h1 className="text-4xl font-black text-error mb-2">
            Oups !
          </h1>
          <p className="text-text-light font-semibold">
            {getErrorMessage(error)}
          </p>
        </div>

        <Card variant="elevated" className="p-8 text-center">
          <p className="text-text mb-6 font-medium">
            Veuillez réessayer ou contactez le support si le problème persiste.
          </p>
          
          <div className="space-y-3">
            <Link href="/auth/signin">
              <Button variant="primary" className="w-full" size="lg">
                Réessayer la connexion
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
