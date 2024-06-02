export function commonToDetail(router, item) {
    if (item.redirectUrl) {
        window.open(item.redirectUrl)
    } else {
        router.push(`/home/item?id=${item.id}`)
    }
    
}