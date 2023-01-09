import { Model } from "objection";

class BaseModel extends Model {
  id!: number;
  email!: string;
  username!: string;
  category!: string;
  token!: string;
  price!: number;
  name!: string;
  password!: string;
  userId!: number;
  brandId!: number;
  addonId!: number;
}

export default BaseModel;
