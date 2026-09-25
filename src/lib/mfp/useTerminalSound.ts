import { useCallback } from 'react';
import { playTerminalBeep } from './mfp-core';

export function useTerminalSound() {
  const playClick = useCallback(() => {
    playTerminalBeep();
  }, []);

  return { playClick };
}

export { playTerminalBeep };
