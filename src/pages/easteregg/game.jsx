import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const GameComponentWithNoSSR = dynamic(() => import('@/components/Game/game'), {
  ssr: false,
});

export default function Game() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = originalStyle;
  }, []);

  return <GameComponentWithNoSSR />;
}
