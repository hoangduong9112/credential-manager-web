import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import './FamilyMemberCard.scss';

interface PersonCardProps {
  id: number;
  name: string;
  image: string;
  phoneNumber: string;
  relationship: string;
  job: string;
  status: string;
  onClick: () => void;
  handleChangeRelationship: (event: any) => void;
}

const PersonCardFamilyMember = (props: PersonCardProps) => {
  const [updateRelationship, setUpdateRelationship] = useState<boolean>(false);
  return (
    <div className="person-card" key={props.id}>
      <div className="top">
        <h4 className="name">{props.name}</h4>
        <img className="circle-img" src={props.image} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">Số điện thoại: {props.phoneNumber}</p>
        {!updateRelationship && (
          <div className="d-flex align-items-center">
            <p className="info">Quan hệ với chủ hộ: {props.relationship}</p>
            <FaPencilAlt
              style={{ cursor: 'pointer', marginLeft: '5px' }}
              onClick={() => {
                setUpdateRelationship(true);
              }}
            />
          </div>
        )}
        {!!updateRelationship && (
          <p className="info d-flex align-items-center">
            Quan hệ với chủ hộ:
            <Form.Control
              style={{ width: '30%', marginLeft: '5px' }}
              placeholder="Quan hệ"
              name="relationship"
              id={String(props.id)}
              aria-describedby="basic-addon1"
              onChange={props.handleChangeRelationship}
            />
            <AiFillCloseCircle
              style={{ marginLeft: '2px' }}
              size={28}
              onClick={() => {
                setUpdateRelationship(false);
              }}
            />
          </p>
        )}
        <p className="info">Nghề nghiệp: {props.job}</p>
        <p className="info">Tình trạng: {props.status}</p>
        <div
          onClick={props.onClick}
          className="detail"
          style={{ fontStyle: 'italic' }}
        >
          Xem chi tiết
        </div>
      </div>
    </div>
  );
};

export default PersonCardFamilyMember;
