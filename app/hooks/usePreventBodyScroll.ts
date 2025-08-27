import { useEffect } from 'react';

export default function usePreventScroll(preventScroll: boolean) {
  useEffect(() => {
    if (preventScroll) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }

    return () => document.body.classList.remove('overflow-y-hidden');
  }, [preventScroll]);
}
