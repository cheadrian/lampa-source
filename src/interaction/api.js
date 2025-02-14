import Reguest from '../utils/reguest'
import Favorite from '../utils/favorite'
import Status from '../utils/status'
import Utils from '../utils/math'
import Storage from '../utils/storage'

import TMDB from '../utils/api/tmdb'
import OKKO from '../utils/api/okko'
import IVI  from '../utils/api/ivi'
import CUB  from '../utils/api/cub'
import PARSER from '../utils/api/parser'

let sources = {
    ivi: IVI,
    okko: OKKO,
    tmdb: TMDB,
    cub: CUB
}

let network = new Reguest()

function source(params){
    return params.source ? sources[params.source] : sources.tmdb
}

function main(params = {}, oncomplite, onerror){
    source(params).main(params, oncomplite, onerror)
}

function category(params = {}, oncomplite, onerror){
    source(params).category(params, oncomplite, onerror)
}

function full(params = {}, oncomplite, onerror){
    source(params).full(params, oncomplite, onerror)
}

function search(params = {}, oncomplite, onerror){
    let use_parser = Storage.field('parser_use') && Storage.field('parse_in_search')

    let status = new Status(use_parser ? 3 : 2)
        status.onComplite = oncomplite

    TMDB.search(params, (json)=>{
        if(json.movie) status.append('movie', json.movie)
        if(json.tv) status.append('tv', json.tv)
    }, status.error.bind(status))

    
    if(use_parser){
        PARSER.get({
            search: decodeURIComponent(params.query),
            other: true,
            movie: {
                genres: [],
                title: decodeURIComponent(params.query),
                original_title: decodeURIComponent(params.query),
                number_of_seasons: 0
            }
        },(json)=>{
            json.title = i18next.t("interaction.api.title_1",'Парсер')
            json.results = json.Results.slice(0,20)
            json.Results = null

            json.results.forEach((element)=>{
                element.Title = Utils.shortText(element.Title,110)
            })

            status.append('parser', json)
        },status.error.bind(status))
    }
}

function person(params = {}, oncomplite, onerror){
    source(params).person(params, oncomplite, onerror)
}

function genres(params = {}, oncomplite, onerror){
    TMDB.genres(params, oncomplite, onerror)
}

function company(params = {}, oncomplite, onerror){
    TMDB.company(params, oncomplite, onerror)
}

function list(params = {}, oncomplite, onerror){
    source(params).list(params, oncomplite, onerror)
}

function menu(params = {}, oncomplite){
    source(params).menu(params, oncomplite)
}

function seasons(tv, from, oncomplite){
    source(tv).seasons(tv, from, oncomplite)
}

function collections(params, oncomplite, onerror){
    source(params).collections(params, oncomplite, onerror)
}

function favorite(params = {}, oncomplite, onerror){
    let data = {}

    data.results = Favorite.get(params)

    data.total_pages = Math.ceil(data.results.length / 20)
    data.page = Math.min(params.page, data.total_pages)

    let offset = data.page - 1

    data.results = data.results.slice(20 * offset,20 * offset + 20)

    if(data.results.length) oncomplite(data)
    else onerror()
}

function relise(oncomplite, onerror){
    network.silent(Utils.protocol() + 'tmdb.cub.watch?sort=releases&results=200',(json)=>{
        json.results.forEach((item)=>{
            item.tmdbID = item.id
        })

        oncomplite(json.results)
    }, onerror)
}

function clear(){
    TMDB.clear()
    OKKO.clear()
    IVI.clear()

    network.clear()
}

export default {
    main,
    img: TMDB.img,
    full,
    list,
    genres,
    category,
    search,
    clear,
    company,
    person,
    favorite,
    seasons: seasons,
    screensavers: TMDB.screensavers,
    relise,
    menu,
    collections
}