import Reguest from '../reguest'
import Utils from '../math'
import Storage from '../storage'
import Status from '../status'
import Favorite from '../../utils/favorite'
import Recomends from '../../utils/recomend'
import Arrays from '../../utils/arrays'
import VideoQuality from '../video_quality'

import TMDB from './tmdb'

let baseurl   = Utils.protocol() + 'tmdb.cub.watch/'
let network   = new Reguest()

function url(u, params = {}){
    if(params.genres)  u = add(u, 'genre='+params.genres)
    if(params.page)    u = add(u, 'page='+params.page)
    if(params.query)   u = add(u, 'query='+params.query)

    if(params.filter){
        for(let i in params.filter){
            u = add(u, i+'='+params.filter[i])
        }
    }

    return baseurl + u
}

function add(u, params){
    return u + (/\?/.test(u) ? '&' : '?') + params;
}

function get(method, params = {}, oncomplite, onerror){
    let u = url(method, params)
    
    network.silent(u,(json)=>{
        json.url = method

        oncomplite(json)
    }, onerror)
}

function list(params = {}, oncomplite, onerror){
    let u = url(params.url, params)

    network.silent(u,oncomplite, onerror)
}

function main(params = {}, oncomplite, onerror){
    let status = new Status(11)

    status.onComplite = ()=>{
        let fulldata = []
        let data     = status.data

        for(let i = 1; i <= 11; i++){
            let ipx = 's'+i

            if(data[ipx] && data[ipx].results.length) fulldata.push(data[ipx])
        }

        if(fulldata.length) oncomplite(fulldata)
        else onerror()
    }
    
    let append = function(title, name, json){
        json.title = title

        status.append(name, json)
    }

    get('?sort=now_playing',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_1",'Сейчас смотрят'),'s1', json)

        VideoQuality.add(json.results)
    },status.error.bind(status))

    get('?sort=latest',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_2",'Последнее добавление'),'s2', json)
    },status.error.bind(status))

    get('movie/now',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_3",'Фильмы'),'s3', json)
    },status.error.bind(status))

    get('?sort=now&genre=16',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_4",'Мультфильмы'),'s4', json)
    },status.error.bind(status))

    get('tv/now',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_5",'Сериалы'),'s5', json)
    },status.error.bind(status))

    get('?sort=now&genre=12',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_6",'Приключения'),'s6', json)
    },status.error.bind(status))

    get('?sort=now&genre=35',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_7",'Комедии'),'s7', json)
    },status.error.bind(status))

    get('?sort=now&genre=10751',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_8",'Семейное'),'s8', json)
    },status.error.bind(status))

    get('?sort=now&genre=27',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_9",'Ужасы'),'s9', json)
    },status.error.bind(status))

    get('?sort=now&genre=878',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_10",'Фантастика'),'s10', json)
    },status.error.bind(status))

    get('?sort=now&genre=53',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_11",'Триллер'),'s11', json)
    },status.error.bind(status))
}

function category(params = {}, oncomplite, onerror){
    let total = 6

    if(params.url !== 'tv') total--

    let show     = ['tv','movie'].indexOf(params.url) > -1
    let books    = show ? Favorite.continues(params.url) : []
    let recomend = show ? Arrays.shuffle(Recomends.get(params.url)).slice(0,19) : []

    let status = new Status(total)

    status.onComplite = ()=>{
        let fulldata = []
        let data     = status.data

        if(books.length)    fulldata.push({results: books,title: params.url == 'tv' ? i18next.t("utils.api.cub.book_1",'Продолжить просмотр') : i18next.t("utils.api.cub.book_2",'Вы смотрели')})
        if(recomend.length) fulldata.push({results: recomend,title: i18next.t("utils.api.cub.recomend_1",'Рекомендуем посмотреть')})

        for(let i = 1; i <= total+1; i++){
            let ipx = 's'+i

            if(data[ipx] && data[ipx].results.length) fulldata.push(data[ipx])
        }

        if(fulldata.length) oncomplite(fulldata)
        else onerror()
    }
    
    let append = function(title, name, json){
        json.title = title

        status.append(name, json)
    }

    get('?cat='+params.url+'&sort=now_playing',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_12",'Сейчас смотрят'),'s1', json)

        if(show) VideoQuality.add(json.results)
    },status.error.bind(status))

    if(params.url == 'tv'){
        get('?cat='+params.url+'&sort=update',params,(json)=>{
            append(i18next.t("utils.api.cub.filter_13",'Новые серии'),'s2', json)
        },status.error.bind(status))
    }

    get('?cat='+params.url+'&sort=top',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_14",'Популярное'),'s3', json)

        if(show) VideoQuality.add(json.results)
    },status.error.bind(status))

    get('?cat='+params.url+'&sort=latest',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_15",'Последнее добавление'),'s4', json)
    },status.error.bind(status))

    get('?cat='+params.url+'&sort=now',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_16",'Новинки этого года'),'s5', json)
    },status.error.bind(status))

    get('?cat='+params.url+'&sort=latest&vote=7',params,(json)=>{
        append(i18next.t("utils.api.cub.filter_17",'С высоким рейтингом'),'s6', json)
    },status.error.bind(status))
}

function full(params, oncomplite, onerror){
    let status = new Status(7)
        status.onComplite = oncomplite

    get('3/'+params.method+'/'+params.id+'?api_key=4ef0d7355d9ffb5151e987764708ce96&language='+Storage.field('tmdb_lang'),params,(json)=>{
        json.source = 'tmdb'

        if(params.method == 'tv'){
            TMDB.get('tv/'+json.id+'/season/'+json.number_of_seasons,{},(ep)=>{
                status.append('episodes', ep)
            },status.error.bind(status))
        }
        else status.need--

        if(json.belongs_to_collection){
            TMDB.get('collection/'+json.belongs_to_collection.id,{},(collection)=>{
                collection.results = collection.parts.slice(0,19)

                status.append('collection', collection)
            },status.error.bind(status))
        }
        else status.need--

        status.append('movie', json)
    },()=>{
        status.need -= 2

        status.error()
    })

    TMDB.get(params.method+'/'+params.id+'/credits',params,(json)=>{
        status.append('persons', json)
    },status.error.bind(status))

    TMDB.get(params.method+'/'+params.id+'/recommendations',params,(json)=>{
        status.append('recomend', json)
    },status.error.bind(status))

    TMDB.get(params.method+'/'+params.id+'/similar',params,(json)=>{
        status.append('simular', json)
    },status.error.bind(status))

    TMDB.get(params.method+'/'+params.id+'/videos',params,(json)=>{
        status.append('videos', json)
    },status.error.bind(status))
}

function person(params, oncomplite, onerror){
    TMDB.person(params, oncomplite, onerror)
}

function menu(params, oncomplite){
    TMDB.menu(params, oncomplite)
}

function seasons(tv, from, oncomplite){
    TMDB.seasons(tv, from, oncomplite)
}

function clear(){
    network.clear()
}

export default {
    main,
    menu,
    full,
    list,
    category,
    clear,
    person,
    seasons
}
