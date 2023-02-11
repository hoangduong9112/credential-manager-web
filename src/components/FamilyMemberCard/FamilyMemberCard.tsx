import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {AiFillCloseCircle} from 'react-icons/ai';
import {FaPencilAlt} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {editFamilyAction} from '../../redux/family/FamilyAction';
import {deletePersonAction, editPersonAction} from '../../redux/person/PersonAction';
import {RootState} from '../../redux/reduxStore';
import './FamilyMemberCard.scss';

interface PersonCardProps {
	id?: string;
	name?: string;
	image?: string;
	relationship?: string;
	job?: string;
	familyId?: string;
	status?: string;
	onClick: () => void;
}

const PersonCardFamilyMember = (props: PersonCardProps) => {
	const dispatch = useDispatch();
	const listPeople = useSelector((state: RootState) => state.person.listPeople);
	const listFamily = useSelector((state: RootState) => state.family.listFamily);

	const currentPerson = listPeople.find((p) => p.id === props.id);
	const currentFamily = listFamily.find((p) => p.id === props.familyId);

	const [updateRelationship, setUpdateRelationship] = useState<boolean>(false);
	const deletePerson = async (event: any) => {
		event.preventDefault();

		dispatch(deletePersonAction(props?.id || ''));
	};

	const editRelationship = async (event: any) => {
		event.preventDefault();

		dispatch(
			editPersonAction({
				id: props.id,
				person: {
					...currentPerson,
					relationship: event.target.value || '',
				},
			})
		);

		if (event.target.value === 'Chủ hộ') {
			dispatch(
				editFamilyAction({
					id: props.familyId,
					family: {
						...currentFamily,
						ownerId: currentPerson?.id,
					},
				})
			);
		}
	};
	return (
		<div className="person-card" key={props.id}>
			<div className="top">
				<h4 className="name">{props.name}</h4>
				<img className="circle-img" src={props.image} alt="avatar_img" />
			</div>
			<div className="bottom">
				<p className="info">ID: {props.id}</p>
				<p className="info">Trạng thái: {props.status}</p>

				{!updateRelationship && (
					<div className="d-flex align-items-center">
						<p className="info">Quan hệ với chủ hộ: {props.relationship}</p>
						<FaPencilAlt
							style={{cursor: 'pointer', marginLeft: '5px'}}
							onClick={() => {
								setUpdateRelationship(true);
							}}
						/>
					</div>
				)}
				{!!updateRelationship && (
					<p className="info d-flex align-items-center">
						Quan hệ với chủ hộ:
						<Form.Control style={{width: '30%', marginLeft: '5px'}} placeholder="Quan hệ" name="relationship" id={String(props.id)} aria-describedby="basic-addon1" onChange={editRelationship} />
						<AiFillCloseCircle
							style={{marginLeft: '2px'}}
							size={28}
							onClick={() => {
								setUpdateRelationship(false);
							}}
						/>
					</p>
				)}
				<p className="info">Nghề nghiệp: {props.job}</p>
				<p className="info">Tình trạng: {props.status}</p>
				<div onClick={props.onClick} className="detail" style={{fontStyle: 'italic'}}>
					Sửa thông tin
				</div>
				<div onClick={deletePerson} className="detail" style={{fontStyle: 'italic'}}>
					Xóa
				</div>
			</div>
		</div>
	);
};

export default PersonCardFamilyMember;
