export interface IProduct {
  id: string
  slug: string
  name: string
  brand: string
  image: {
    url: string
    width: number
    height: number
  }
  price: number
  stocks: number
}

export interface IUser {
  id: string
  name: string
  email: string
}
