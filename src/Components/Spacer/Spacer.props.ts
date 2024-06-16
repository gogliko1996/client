import { ElementType } from 'react';

export interface SpacerProps {
  className?: string;
  component?: ElementType;
  children?: Element | any;
  m?: number;
  my?: number;
  mx?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;

  p?: number;
  py?: number;
  px?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
}
