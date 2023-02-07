import { PersonInfo } from './person';

export interface FamilyInfo {
  id: string;
  address: string;
  soTVien: number;
  contact: string;
  owner: string;
  members: PersonInfo[];
}

export interface HistoryFamilyInfo {
  id: number;
  status: string;
  descriptions: string;
  date: string;
}
