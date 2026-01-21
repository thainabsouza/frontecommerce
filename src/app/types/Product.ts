export interface Product {
  id: number;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;

  imgUrl1: string;
  imgUrl2?: string;
  imgUrl3?: string;

  type?: string;
}