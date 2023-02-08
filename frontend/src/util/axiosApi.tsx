export const BaseUrl = "http://127.0.0.1:5000/api"
//export const BaseUrl = "http://3.39.229.11:5000/api"

export type Company = {
    cname: string,
    address: string,
    sales: string,
    owner: string,
    info: string,
    pay: string,
    resign: string,
    form: string,
    courl: string,
    keyword: string,
    wcloud_url: string,
    logo_url: string,
    bookmarkcnt: number,
    readcnt: number
}

export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}