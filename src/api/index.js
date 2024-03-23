import axios from "axios"

const base_url = "https://api.themoviedb.org/3/"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjOWE1ODQzMWM1YjQ2ZTA5OGJmNGVlZDE3Yzk0YiIsInN1YiI6IjYwZjE5MDZkZjA2NDdjMDA0NjYwYWU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ja4SbvjhT3NGKoApfUCyTZlyTJXs9Ar_SOf9ovIwxc"
export const image_url = "https://image.tmdb.org/t/p/w300"

const api = axios.create({ baseURL: `${base_url}` });

api.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`
    return req;
})

export const getPopularMovie = async (page) => {
    await api.get(`movie/popular?language=en-US&page=${page ? page : 1}`)

}

export const getNowPlayingMovie = async (page) => {
    await api.get(`movie/now_playing?language=en-US&page=${page ? page : 1}`)

}

export const getSearchMovie = async (page, title,) => {
    const data = await api.get(`/search/movie?query=${title ? title : ""}&include_adult=false&language=en-US&page=${page ? page : 1}`)
    return data
}
