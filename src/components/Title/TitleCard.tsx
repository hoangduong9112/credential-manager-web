import React from 'react';
import './TitleCard.scss';

interface TitleProps {
  title: string;
  children?: React.ReactNode;
}
const TitleCard = (props: TitleProps) => {
  const { children, title } = props;
  return (
    <div className="container-button">
      <h2 className="title">{title}</h2>
      {!!children && <div> {children}</div>}
    </div>
  );
};

export default TitleCard;
