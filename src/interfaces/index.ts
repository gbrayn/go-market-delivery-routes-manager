export interface Delivery {
  id: string;
  name: string;
  address: string;
  complement: string;
  latitude: number;
  longitude: number;
}

export type Position = {
  longitude: number;
  latitude: number;
};
