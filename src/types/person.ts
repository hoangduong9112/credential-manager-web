export interface PersonInfo {
	id?: string;
	familyId?: string;
	image?: string;
	phoneNumber?: string;
	relationship?: string;
	job?: string;
	status?: string;
	canCuocCongDan?: string;
	address?: string;
	dateOfBirth?: string;
	name?: string;
	gender?: string;
	departmentDate?: string;
}

export enum PersonStatus {
	LIVE = 'Đang cư trú',
	TEMPORARY_LIVE = 'Tạm trú',
	TEMPORARY_ABSENT = 'Tạm vắng',
	DIE = 'Đã qua đời',
}

export const personStatus: PersonStatus[] = [PersonStatus.TEMPORARY_ABSENT, PersonStatus.TEMPORARY_LIVE, PersonStatus.DIE, PersonStatus.LIVE];
