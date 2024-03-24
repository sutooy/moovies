import axios from "axios"

const base_url = "https://api.themoviedb.org/3/"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjOWE1ODQzMWM1YjQ2ZTA5OGJmNGVlZDE3Yzk0YiIsInN1YiI6IjYwZjE5MDZkZjA2NDdjMDA0NjYwYWU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ja4SbvjhT3NGKoApfUCyTZlyTJXs9Ar_SOf9ovIwxc"
export const image_url = "https://image.tmdb.org/t/p/w300"
export const image_backdrop = "https://image.tmdb.org/t/p/w1280"


const api = axios.create({ baseURL: `${base_url}` });

api.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`
    return req;
})

export const getTrendingMovie = async (page) => {
    await api.get(`trending/movie/week?language=en-US&page=${page ? page : 1}`)

}

export const getDiscoverMovie = async (page) => await api.get(`discover/movie?include_adult=false&include_video=false&language=en-US&page=${page ? page : 1}&sort_by=popularity.desc`)

export const getDetailMovie = async (id) => await api.get(`movie/${id}?language=en-US`)

// 
// ?language=en-US&page=1
export const getSearchMovie = async (page, title,) => {
    const data = await api.get(`/search/movie?query=${title ? title : ""}&include_adult=false&language=en-US&page=${page ? page : 1}`)
    return data
}
