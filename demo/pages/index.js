import React from "react";
import gallery from "../../es/gallery";

export default class Demo extends React.Component {
  state = {
    size: 16,
  };
  render() {
    const { color, size } = this.state;
    return (
      <div>
        <pre>import Add from 'react-vscode-icons/es/Add'</pre>
        <hr />
        <div style={{margin: '12px 24px'}}>
          <input value={color}
            onChange={e => {
              this.setState({ color: e.target.value });
            }}
          />
          {' '}<b>You can input red</b>{' '}
          <input type="number" value={size}
            onChange={e => {
              this.setState({ size: e.target.value });
            }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {gallery.map(({ Icon, name }) => {
            return (
              <div style={{ margin: 24, textAlign: "center" }}>
                <Icon style={{ color, fontSize: size }} />
                <h5>{name}</h5>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
