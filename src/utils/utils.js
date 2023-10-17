
export function unixToDate(unixTime) {
    const date = new Date(unixTime * 1000)
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yy = date.getFullYear()

    return `${dd}/${mm}/${yy}`
}

export function domainToHostname(url) {
    const domain = new URL(url)
    return domain.hostname
}

export function openExternalUrl(url) {
    window.open(url)
}

export function copy(entity) {
    return JSON.parse(JSON.stringify(entity))
}