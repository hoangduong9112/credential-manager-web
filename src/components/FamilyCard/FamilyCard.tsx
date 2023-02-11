import React from 'react';
import {BsTelephoneFill, BsFillHouseFill, BsFillPeopleFill, BsFillPersonFill} from 'react-icons/bs';

import './FamilyCard.scss';

interface FamilyCardProps {
	id?: string;
	address?: string;
	ownerName?: string;
	soTVien?: number;
	contact?: string;
	onClick: (event: any) => void;
}

const FamilyCard = (props: FamilyCardProps) => {
	return (
		<div className="card" onClick={props.onClick} key={props.id}>
			<div className="card-header">
				<div>
					<div className="card-title-group">
						<div className="card-title">
							<BsFillHouseFill />
							<div className="card-content">Địa chỉ : {props.address}</div>
						</div>
						<div className="card-title">
							<BsFillPersonFill />
							<div className="card-content">Tên chủ hộ : {props.ownerName}</div>
						</div>
						<div className="card-title">
							<BsFillPeopleFill />
							<div className="card-content">Số lượng thành viên : {props.soTVien}</div>
						</div>
						<div className="card-title">
							<BsTelephoneFill />
							<div className="card-content">Liên hệ : {props.contact}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FamilyCard;
