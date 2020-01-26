import React from 'react';

const components = <%= components %>;
const comps = components.map((componentName) => {
  return {
    Comp: require('./' + componentName),
    componentName: componentName,
  }
});
export default function () {
  return comps.map((comp) => {
    return <div>
      <h3>{comp.componentName}</h3>
      {<Comp />}
    </div>
  })
}