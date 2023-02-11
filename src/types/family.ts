export interface FamilyInfo {
	id?: string;
	address?: string;
	soTVien?: number;
	contact?: string;
	ownerId?: string;
	absentNumber?: number;
}

export interface HistoryFamilyInfo {
	id: number;
	status: string;
	descriptions: string;
	date: string;
}
