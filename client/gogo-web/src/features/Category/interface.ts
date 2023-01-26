export interface IPart {
  _id?: string
  title: string
  desc?: string
  topic: ITopic | string
  picture: string
}

export interface ITopic {
  _id: string
  name: string
  image: string
}