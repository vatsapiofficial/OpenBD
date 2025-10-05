'use client';

import { MDXProvider as _MDXProvider } from '@mdx-js/react';
import { BanglaExplain } from './BanglaExplain';
import { ReasoningPanel } from './ReasoningPanel';
import { StepFlow } from './StepFlow';
import { Quiz } from './Quiz';

const components = {
  BanglaExplain,
  ReasoningPanel,
  StepFlow,
  Quiz,
};

export function MDXProvider({ children }: { children: React.ReactNode }) {
  return <_MDXProvider components={components}>{children}</_MDXProvider>;
}