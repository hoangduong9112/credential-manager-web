import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { RiTimerFill } from 'react-icons/ri';

import './EventFundingCard.scss';

interface EventFundingCardProps {
  key: number;
  eventName: string;
  tongtien: number;
  date: string;
  descriptions: string;
  mucphi?: number;
  onClick: (event: any) => void;
}

const EventFundingCard = (props: EventFundingCardProps) => {
  return (
    <div className="card" onClick={props.onClick} key={props.key}>
      <div className="card-header">
        <div>
          <div className="card-title-group">
            <div className="card-title">
              <GrMoney />
              <div className="card-content">Tên quỹ : {props.eventName}</div>
            </div>
            <div className="card-title">
              <RiTimerFill />
              <div className="card-content">Thời gian thu : {props.date}</div>
            </div>
            <div className="card-title">
              <FaMoneyBillWave />
              <div className="card-content">
                Tổng số tiền đã thu : {props.tongtien}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFundingCard;
