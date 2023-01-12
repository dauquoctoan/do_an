export interface Icard {
    type: string
    question: {
        title: string
        img: string
    }[]
    answer: number
    status?: boolean
}
