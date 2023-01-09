export interface IDataItem {
    type: string;
    question: {
        title: string;
        img: string;
    }[];
    answer: number;
    status?: boolean | null;
}
