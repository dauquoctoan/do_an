export interface IDataItem {
    type: string;
    option: {
        title: string;
        img: string;
    }[];
    answer: number;
    status?: boolean | null;
}
export interface IOption {
    title: string;
    img: string;
}
