import styled from "styled-components";
import {
  CardProps,
  ConteinerProps,
  ImageProps,
  InputProps,
  RowProps,
  Selectprops,
  TextProps,
} from "./ScreenRoot.props";
import { colors } from "../../utils/colors/colors";

export const ScreenContent = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
`;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap ?? "wrap"};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => width ? `${width}px` : '100%'};
  height: ${({ height }) =>`${height}px`};
`;

export const Text = styled.p<TextProps>`
  color: ${({ color }) => color && colors[color]};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  opacity: ${({ opacity }) => opacity};
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => `${width}px`};
`;

export const Card = styled.div<CardProps>`
  width: ${({ width }) => `${width}px` || "100%"};
  height: ${({ height }) => `${height}px`};
  padding-left: ${({ paddingLeft }) => `${paddingLeft}px`};
  padding-right: ${({ paddingRight }) => `${paddingRight}px`};
  padding-top: ${({ paddingTop }) => `${paddingTop}px`};
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor && colors[backgroundColor]};
  border-radius: ${({
    borderTopLeftRadius = 20,
    borderTopRightRadius = 20,
    borderBottomRightRadius = 20,
    borderBottomLeftRadius = 20,
  }) =>
    `${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px`};
  box-shadow: ${({ noShadow }) =>
    noShadow ? "none" : "0px 4px 8px rgba(50, 50, 50, 0.5)"};
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  border: ${({ border }) => border || "none"};
  border-color: ${({ borderColor }) => borderColor || "transparent"};
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Input = styled.input<InputProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? height : '48px')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : "12px"};
  border: ${({ border }) => border || "1px solid"};
  border-color: ${({ borderColor }) => borderColor || "gray"};

  &::placeholder {
    position: relative;
    top: ${({ placeholderTop }) =>placeholderTop};
    transform: ${({ transform }) =>
      transform !== undefined && `translateY(-${transform}%)`};
  }
`;

export const Select = styled.select<Selectprops>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '48px')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : "12px"};
  border: ${({ border }) => border || "1px solid"};
  border-color: ${({ borderColor }) => borderColor || "gray"};
`;

export const Image = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  border-radius: ${({
    borderTopLeftRadius = 20,
    borderTopRightRadius = 20,
    borderBottomRightRadius = 20,
    borderBottomLeftRadius = 20,
  }) =>
    `${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px`};
`;

export const Conteiner = styled.div<ConteinerProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor && colors[backgroundColor]};
`;
