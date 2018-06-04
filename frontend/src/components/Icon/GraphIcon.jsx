import React from 'react';
import '../../assets/img/graph.svg';

const GraphIcon = props => (
  <svg className={`icon icon-${props.name}`}>
    <use xlinkHref={`#icons_${props.name}`} />
  </svg>
);

export default GraphIcon;
