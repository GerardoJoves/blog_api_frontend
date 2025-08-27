import { useEffect } from 'react';

export default function useOnBreakpointMatch(
  breakpoint: string,
  cb: () => void,
) {
  useEffect(() => {
    const handleResize = () => {
      const isMdScreen = window.matchMedia(breakpoint).matches;
      if (isMdScreen) cb();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, cb]);
}
