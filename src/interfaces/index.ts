export interface Delivery {
  _id: string;
  name: string;
  address: string;
  complement: string;
  latitude: number;
  longitude: number;
  status: 'open' | 'in progress' | 'closed';
}

export type Position = {
  longitude: number;
  latitude: number;
};
