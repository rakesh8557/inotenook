import React from "react";

export const Alert = (props) => {
  const captialise = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: '50px' }}>
      {props.alert &&
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{captialise(props.alert.type)}</strong>: {props.alert.msg}
        </div>}
    </div>
  )
};
