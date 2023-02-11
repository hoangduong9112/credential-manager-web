import {PersonStatus} from './person';

export interface IFormAddPeopleTamTru {
	image?: string;
	phoneNumber?: string;
	relationship?: string;
	job?: string;
	status?: PersonStatus;
	canCuocCongDan?: string;
	address?: string;
	name?: string;
	gender?: string;
}

export interface IFormAddPeople {
	image?: string;
	phoneNumber?: string;
	relationship?: string;
	job?: string;
	status?: string;
	canCuocCongDan?: string;
	address?: string;
	name?: string;
	gender?: string;
	departmentDate?: string;
}
