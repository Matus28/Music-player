import * as React from "react";
import "./Card.css";

interface Props {
  children: React.ReactNode;
  color?: string;
  isSelected?: boolean;
  class?: string;
}

export const Card = (props: Props): JSX.Element => {
  return (
    <div
      className={`card-body ${props.color !== undefined ? props.color : ""} ${
        props.isSelected ? "active" : ""
      } ${props.class ?? ""}`}
    >
      {props.children}
    </div>
  );
};
