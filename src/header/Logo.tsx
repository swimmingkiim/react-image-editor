import React from 'react';

type LogoProps = {}

const Logo: React.FC<LogoProps> = ({}) => (
  <img
    width={25}
    height={25}
    src={`${process.env.PUBLIC_URL}/doc-tree-icon.svg`}
    alt="konva"
  />
);

export default Logo;
