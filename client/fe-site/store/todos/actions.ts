export default {
    async fetchCounter({ state }: { state: any }) {
        // make request
        const res = { data: 10 }
        state.counter = res.data
        return res.data
    },
}
