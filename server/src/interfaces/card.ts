export interface ICard {
    type: string
    question: {
        title: string
        img: string
    }[]
    answer: number
    status?: boolean
}
