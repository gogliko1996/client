import { CSSProperties } from "styled-components";
import { ReactElement } from "react";
import { ColorTypes } from "../../utils/colors/colors";


export interface RowProps {
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    width?: any;
    height?: any;
  }


export interface TextProps {
  color?: ColorTypes;
  fontSize?: number;
  width?: number | string | any;
  children?: string;
  style?: CSSProperties;
  onClick?: () => void;
  cursor?: 'pointer';
  opacity?: string | number;
  fontFamily?: 'inherit' | 'revert-layer' | 'sans-serif' | 'unset' | 'Arial';
  fontWeight?: 'bold';
  textAlign?: 'left' | 'right' | 'center' | 'justify'
}

export interface CardProps {
  children?: ReactElement
  minHeight?: number
  width?: number | string | any;
  height?: number | string | any;
  color?: ColorTypes;
  backgroundColor?: ColorTypes;
  style?: CSSProperties
  paddingLeft?: number | string | any;
  paddingRight?: number | string | any;
  paddingTop?: number | string | any;
  paddingBottom?: number | string | any;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
  noShadow?: boolean;
  backgroundImage?: string; 
  border?: string;
  borderColor?: ColorTypes;
}

export interface ButtonProps {
  color?: ColorTypes;
  width?: number;
  height?: number;
}

export interface InputProps {
  boxShadow?: string; 
  textShadow?: string;
  width?: number | string | any;
  height?: number | string | any;
  border?: string;
  borderColor?: ColorTypes;
  borderRadius?: number
  placeholderTop?: number | string | any
  transform?: number
}

export interface Selectprops {
  width?: number | string | any;
  height?: number | string | any;
  border?: string;
  borderColor?: ColorTypes;
  borderRadius?: number
}


export interface ConteinerProps {
  width?: number | string | any;
  height?: number | string | any;
  backgroundColor?: ColorTypes;
}


export interface ImageProps {
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
}