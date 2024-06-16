import React, { CSSProperties } from 'react';
import { SpacerProps } from './Spacer.props';


export const Spacer: React.FC<SpacerProps> = React.memo(props => {
  const {
    children,
    className,
    component: Component = 'div',
    m,
    ml,
    mr,
    mt,
    mb,
    mx,
    my,
    p,
    px,
    py,
    pl,
    pr,
    pt,
    pb,
    ...rest
  } = props;

  const stylesheet: CSSProperties = {};

  // Margins
  if (m !== undefined) {
    stylesheet.padding = m;
  }

  if (mx !== undefined) {
    stylesheet.marginLeft = mx;
    stylesheet.marginRight = mx;
  }

  if (my !== undefined) {
    stylesheet.marginTop = my;
    stylesheet.marginBottom = my;
  }

  if (ml !== undefined) {
    stylesheet.marginLeft = ml;
  }

  if (mr !== undefined) {
    stylesheet.marginRight = mr;
  }

  if (mt !== undefined) {
    stylesheet.marginTop = mt;
  }

  if (mb !== undefined) {
    stylesheet.marginBottom = mb;
  }

  // Paddings
  if (p !== undefined) {
    stylesheet.padding = p;
  }

  if (px !== undefined) {
    stylesheet.paddingLeft = px;
    stylesheet.paddingRight = px;
  }

  if (py !== undefined) {
    stylesheet.paddingTop = py;
    stylesheet.paddingBottom = py;
  }

  if (pl !== undefined) {
    stylesheet.paddingLeft = pl;
  }

  if (pr !== undefined) {
    stylesheet.paddingRight = pr;
  }

  if (pt !== undefined) {
    stylesheet.paddingTop = pt;
  }

  if (pb !== undefined) {
    stylesheet.paddingBottom = pb;
  }

  return (
    <Component className={className} style={stylesheet} {...rest}>
      {children}
    </Component>
  );
});

Spacer.displayName = 'Spacer';
