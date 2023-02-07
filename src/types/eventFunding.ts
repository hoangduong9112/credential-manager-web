export interface EventFundingInfo {
  id: number;
  eventName: string;
  tongtien: number;
  date: string;
  descriptions: string;
  mucphi?: number;
  listHKDG: FamilyFundingInfo[];
}

export interface FamilyFundingInfo {
  address: string;
  tenChuHo: string;
  amount: number;
  time: string;
}
