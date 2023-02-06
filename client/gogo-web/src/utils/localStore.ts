export function getItemLocalStore(name: string) {
    let store: any = localStorage.getItem(name)
    if (store) {
        store = JSON.parse(store)
    }
    return store
}