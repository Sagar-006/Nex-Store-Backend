export interface Users {
  username: string;
  email:string;
  password: string;
  role:"user" | "admin";
}

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: "MEN"|"WOMEN";
  size:'S'|'M'|'L'|'XL';
  createdAt?:Date;
}
