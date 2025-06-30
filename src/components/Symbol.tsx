'use client';

import React from 'react';
import '@/styles/slotSymbols.css';

interface SymbolProps {
  index: number; // 0'dan 5'e kadar
}

export default function Symbol({ index }: SymbolProps) {
  return <div className={`slot-symbol symbol-${index}`} />;
}
