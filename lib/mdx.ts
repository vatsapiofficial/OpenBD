import { MDXRemote } from 'next-mdx-remote/rsc';
import { BanglaExplain } from '@/components/mdx/BanglaExplain';
import { ReasoningPanel } from '@/components/mdx/ReasoningPanel';
import { StepFlow } from '@/components/mdx/StepFlow';
import { Quiz } from '@/components/mdx/Quiz';

const allowedComponents = {
  BanglaExplain,
  ReasoningPanel,
  StepFlow,
  Quiz,
};

export function SafeMdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={allowedComponents} />;
}