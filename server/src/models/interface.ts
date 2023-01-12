export interface Icard {
    type: string
    question: {
        title: string
        img: string
    }[]
    answer: number
    status?: boolean
}

export interface IUser {
    name: string
    email: string
    picture: string
    givenName: string
    typeAccount: string
    iat: number
    exp: number
    email_verified: boolean
    passWord: string
    age: number
}
