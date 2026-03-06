'use client';

import React from 'react';
import { LoadingIcon } from './ui/Icons';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LoadingIcon className="w-12 h-12 text-[var(--primary)] animate-spin" />
        <p className="text-[var(--muted-foreground)] font-medium">Загрузка...</p>
      </div>
    </div>
  );
};

export default Loader;