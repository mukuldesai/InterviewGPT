// src/components/ui/hover-card.tsx

'use client';

import * as React from 'react';
import { HoverCard as HoverCardPrimitive, HoverCardContent as HoverCardContentPrimitive, HoverCardTrigger as HoverCardTriggerPrimitive } from '@radix-ui/react-hover-card';

export interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export function HoverCard({ trigger, content }: HoverCardProps) {
  return (
    <HoverCardPrimitive>
      <HoverCardTrigger asChild>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className="bg-background border p-4 rounded shadow-md">
        {content}
      </HoverCardContent>
    </HoverCardPrimitive>
  );
}

export const HoverCardContent = HoverCardContentPrimitive

export const HoverCardTrigger = HoverCardTriggerPrimitive
