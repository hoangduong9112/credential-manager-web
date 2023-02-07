import React, { useState } from 'react';
import './CredentialCard.scss';

interface CredentialCardProps {
  id: number;
  name: string;
  image: string;
  phoneNumber: string;
  status: string;
  job: string;
  address: string;
  canCuocCongDan: string;
  onClick: () => void;
}

const CredentialCard = (props: CredentialCardProps) => {
  return (
    <div className="person-card" key={props.id} onClick={props.onClick}>
      <div className="top">
        <h4 className="name">{props.name}</h4>
        <img className="circle-img" src={props.image} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">Số điện thoại: {props.phoneNumber}</p>
        <p className="info">Số CCCD/ Mã định danh: {props.canCuocCongDan}</p>
        <p className="info">Nghề nghiệp: {props.job}</p>
        <p className="info">Địa chỉ: {props.address}</p>
      </div>
    </div>
  );
};

export default CredentialCard;
