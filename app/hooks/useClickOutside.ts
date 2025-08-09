import { useEffect, useRef } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  handler: () => void,
) {
  const domNode = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: Event) => {
      if (!domNode.current || domNode.current.contains(target as Node)) return;
      handler();
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return domNode;
}
