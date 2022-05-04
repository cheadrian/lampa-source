import Select from './select'
import Controller from './controller'
import Activity from './activity'

let data = {}

data.type = {
    title: i18next.t("interaction.content_filter.title_10",'Тип'),
    items: [
        {
            title: i18next.t("interaction.content_filter.title_11",'Фильмы'),
            selected: true,
            cat: 'movie'
        },
        {
            title: i18next.t("interaction.content_filter.title_12",'Мультфильмы'),
            cat: 'multmovie'
        },
        {
            title: i18next.t("interaction.content_filter.title_13",'Сериалы'),
            cat: 'tv'
        },
        {
            title: i18next.t("interaction.content_filter.title_14",'Мультсериалы'),
            cat: 'multtv'
        },
        {
            title: i18next.t("interaction.content_filter.title_15",'Аниме'),
            cat: 'anime'
        }
    ]
}

data.rating = {
    title: i18next.t("interaction.content_filter.title_16",'Рейтинг'),
    items: [
        {
            title: i18next.t("interaction.content_filter.title_17",'Любой'),
        },
        {
            title: i18next.t("interaction.content_filter.title_18",'от 1 до 3'),
            voite: '1-3'
        },
        {
            title: i18next.t("interaction.content_filter.title_19",'от 3 до 6'),
            voite: '3-6'
        },
        {
            title: i18next.t("interaction.content_filter.title_20",'от 6 до 8'),
            voite: '6-8'
        },
        {
            title: i18next.t("interaction.content_filter.title_21",'от 8 до 9'),
            voite: '8-9'
        },
        {
            title: i18next.t("interaction.content_filter.title_150",'от 8'),
            start: 8
        },
        {
            title: i18next.t("interaction.content_filter.title_151",'от 6'),
            start: 6
        },
        {
            title: i18next.t("interaction.content_filter.title_152",'от 4'),
            start: 4
        },
        {
            title: i18next.t("interaction.content_filter.title_153",'от 2'),
            start: 2
        }
    ]
}

data.country = {
    title: i18next.t("interaction.content_filter.title_22",'Страна'),
    items: [{
        title: i18next.t("interaction.content_filter.title_23",'Украина'),
        code: 'uk'
    }, {
        title: i18next.t("interaction.content_filter.title_24",'США'),
        code: 'en'
    }, {
        title: i18next.t("interaction.content_filter.title_25",'Россия'),
        code: 'ru'
    }, {
        title: i18next.t("interaction.content_filter.title_26",'Япония'), 
        code: 'ja'
    }, {
        title: i18next.t("interaction.content_filter.title_27",'Корея'), 
        code: 'ko'
    }, {
        title: i18next.t("interaction.content_filter.title_28",'Азербайджан'),
        code: 'az'
    }, {
        title: i18next.t("interaction.content_filter.title_29",'Албания'),
        code: 'sq'
    }, {
        title: i18next.t("interaction.content_filter.title_30",'Беларусь'),
        code: 'be'
    }, {
        title: i18next.t("interaction.content_filter.title_31",'Болгария'),
        code: 'bg'
    }, {
        title: i18next.t("interaction.content_filter.title_32",'Германия'),
        code: 'de'
    }, {
        title: i18next.t("interaction.content_filter.title_33",'Грузия'),
        code: 'ka'
    }, {
        title: i18next.t("interaction.content_filter.title_34",'Дания'),
        code: 'da'
    }, {
        title: i18next.t("interaction.content_filter.title_35",'Естония'),
        code: 'et'
    }, {
        title: i18next.t("interaction.content_filter.title_36",'Ирландия'),
        code: 'ga'
    }, {
        title: i18next.t("interaction.content_filter.title_37",'Испания'),
        code: 'es'
    }, {
        title: i18next.t("interaction.content_filter.title_38",'Италия'),
        code: 'it'
    }, {
        title: i18next.t("interaction.content_filter.title_39",'Китай'),
        code: 'zh'
    }, {
        title: i18next.t("interaction.content_filter.title_40",'Латвия'),
        code: 'lv'
    }, {
        title: i18next.t("interaction.content_filter.title_41",'Непал'),
        code: 'ne'
    }, {
        title: i18next.t("interaction.content_filter.title_42",'Норвегия'),
        code: 'no'
    }, {
        title: i18next.t("interaction.content_filter.title_43",'Польша'),
        code: 'pl'
    }, {
        title: i18next.t("interaction.content_filter.title_44",'Румуния'),
        code: 'ro'
    }, {
        title: i18next.t("interaction.content_filter.title_45",'Сербия'),
        code: 'sr'
    }, {
        title: i18next.t("interaction.content_filter.title_46",'Словакия'),
        code: 'sk'
    }, {
        title: i18next.t("interaction.content_filter.title_47",'Словения'),
        code: 'sl'
    }, {
        title: i18next.t("interaction.content_filter.title_48",'Таджикистан'),
        code: 'tg'
    }, {
        title: i18next.t("interaction.content_filter.title_49",'Турция'),
        code: 'tr'
    }, {
        title: i18next.t("interaction.content_filter.title_50",'Узбекистан'),
        code: 'uz'
    }, {
        title: i18next.t("interaction.content_filter.title_51",'Финляндия'),
        code: 'fi'
    }, {
        title: i18next.t("interaction.content_filter.title_52",'Франция'),
        code: 'fr'
    }, {
        title: i18next.t("interaction.content_filter.title_53",'Хорватия'),
        code: 'hr'
    }, {
        title: i18next.t("interaction.content_filter.title_54",'Чешская Республика'),
        code: 'cs'
    }, {
        title: i18next.t("interaction.content_filter.title_55",'Швеция'),
        code: 'sv'
    }, {
        title: i18next.t("interaction.content_filter.title_56",'Эстония'),
        code: 'et'
    }]
}

data.genres_movie = {
    title: i18next.t("interaction.content_filter.title_57",'Жанр'),
    items: [
        {"id":28,"title":i18next.t("interaction.content_filter.title_100","боевик"),checkbox: true},
        {"id":12,"title":i18next.t("interaction.content_filter.title_101","приключения"),checkbox: true},
        {"id":16,"title":i18next.t("interaction.content_filter.title_102","мультфильм"),checkbox: true},
        {"id":35,"title":i18next.t("interaction.content_filter.title_103","комедия"),checkbox: true},
        {"id":80,"title":i18next.t("interaction.content_filter.title_104","криминал"),checkbox: true},
        {"id":99,"title":i18next.t("interaction.content_filter.title_105","документальный"),checkbox: true},
        {"id":18,"title":i18next.t("interaction.content_filter.title_106","драма"),checkbox: true},
        {"id":10751,"title":i18next.t("interaction.content_filter.title_107","семейный"),checkbox: true},
        {"id":14,"title":i18next.t("interaction.content_filter.title_108","фэнтези"),checkbox: true},
        {"id":36,"title":i18next.t("interaction.content_filter.title_109","история"),checkbox: true},
        {"id":27,"title":i18next.t("interaction.content_filter.title_110","ужасы"),checkbox: true},
        {"id":10402,"title":i18next.t("interaction.content_filter.title_111","музыка"),checkbox: true},
        {"id":9648,"title":i18next.t("interaction.content_filter.title_112","детектив"),checkbox: true},
        {"id":10749,"title":i18next.t("interaction.content_filter.title_113","мелодрама"),checkbox: true},
        {"id":878,"title":i18next.t("interaction.content_filter.title_114","фантастика"),checkbox: true},
        {"id":10770,"title":i18next.t("interaction.content_filter.title_115","телевизионный фильм"),checkbox: true},
        {"id":53,"title":i18next.t("interaction.content_filter.title_116","триллер"),checkbox: true},
        {"id":10752,"title":i18next.t("interaction.content_filter.title_117","военный"),checkbox: true},
        {"id":37,"title":i18next.t("interaction.content_filter.title_118","вестерн"),checkbox: true}
    ]
}

data.genres_tv = {
    title: 'Жанр',
    items: [
        {"id": 10759,"title": i18next.t("interaction.content_filter.title_200","Боевик и Приключения"),checkbox: true},
        {"id": 16,"title": i18next.t("interaction.content_filter.title_201","Мультфильм"),checkbox: true},
        {"id": 35,"title": i18next.t("interaction.content_filter.title_202","Комедия"),checkbox: true},
        {"id": 80,"title": i18next.t("interaction.content_filter.title_203","Криминал"),checkbox: true},
        {"id": 99,"title": i18next.t("interaction.content_filter.title_204","Документальный"),checkbox: true},
        {"id": 18,"title": i18next.t("interaction.content_filter.title_205","Драма"),checkbox: true},
        {"id": 10751,"title": i18next.t("interaction.content_filter.title_206","Семейный"),checkbox: true},
        {"id": 10762,"title": i18next.t("interaction.content_filter.title_207","Детский"),checkbox: true},
        {"id": 9648,"title": i18next.t("interaction.content_filter.title_208","Детектив"),checkbox: true},
        {"id": 10763,"title": i18next.t("interaction.content_filter.title_209","Новости"),checkbox: true},
        {"id": 10764, "title": i18next.t("interaction.content_filter.title_210","Реалити-шоу"),checkbox: true},
        {"id": 10765,"title": i18next.t("interaction.content_filter.title_211","НФ и Фэнтези"),checkbox: true},
        {"id": 10766,"title": i18next.t("interaction.content_filter.title_212","Мыльная опера"),checkbox: true},
        {"id": 10767,"title": i18next.t("interaction.content_filter.title_213","Ток-шоу"),checkbox: true},
        {"id": 10768,"title": i18next.t("interaction.content_filter.title_214","Война и Политика"),checkbox: true},
        {"id": 37,"title": i18next.t("interaction.content_filter.title_215","Вестерн"),checkbox: true}
    ]
}



data.year = {
    title: i18next.t("interaction.content_filter.title_58",'Год'),
    items: [
        {
            title: i18next.t("interaction.content_filter.title_59",'Любой'),
            any: true
        }
    ]
}

let i = 100,
    y = (new Date()).getFullYear()

while (i-=5) {
    let end = y - (99 - i)

    data.year.items.push({
        title: (end + 5)+'-'+end
    })
}

data.country.items.forEach(i=>i.checkbox = true)

function select(where, a){
    where.forEach(element => {
        element.selected = false
    })

    a.selected = true
}

function selected(where){
    let title = []

    where.items.forEach((a)=>{
        if(a.selected || a.checked) title.push(a.title)
    })

    where.subtitle = title.length ? title.join(', ') : i18next.t("interaction.content_filter.title_200",'Не выбрано')
}

function main(){
    for(var i in data) selected(data[i])

    let cat  = data.type.items.find(s=>s.selected).cat
    let type = cat.indexOf('movie') >= 0 ? 'movie' : 'tv'

    let items = [{
        title: i18next.t("interaction.content_filter.title_60",'Начать поиск'),
        search: true
    },data.type,data.rating,data['genres_'+type],data.country,data.year]

    Select.show({
        title: i18next.t("interaction.content_filter.title_61",'Фильтр'),
        items: items,
        onBack: ()=>{
            Controller.toggle('content')
        },
        onSelect: (a)=>{
            if(a.search) search()
            else submenu(a)
        }
    })
}

function search(){
    Controller.toggle('content')

    let query    = []
    let cat      = data.type.items.find(s=>s.selected).cat
    let type     = cat.indexOf('movie') >= 0 ? 'movie' : 'tv'
    let genres   = []
    let countrys = []

    data.rating.items.forEach(a=>{
        if(a.selected && (a.voite || a.start)){
            if(a.start){
                query.push('vote_average.gte='+a.start)
            }
            else{
                query.push('vote_average.gte='+a.voite.split('-')[0])
                query.push('vote_average.lte='+a.voite.split('-')[1])
            }
        }
    })

    data.country.items.forEach(a=>{
        if(a.checked) countrys.push(a.code)
    })

    data.year.items.forEach(a=>{
        if(a.selected && !a.any){
            let need = type == 'movie' ? 'release_date' : 'air_date'

            query.push(need+'.lte='+a.title.split('-')[0]+'-01-01')
            query.push(need+'.gte='+a.title.split('-')[1]+'-01-01')
        }
    })

    data['genres_'+type].items.forEach(a=>{
        if(a.checked)  genres.push(a.id)
    })

    if(cat == 'multmovie' || cat == 'multtv' && genres.indexOf(16) == -1) genres.push(16)

    if(genres.length){
        query.push('with_genres='+genres.join(','))
    }

    if(cat == 'anime' && countrys.indexOf('ja') == -1) countrys.push('ja')

    if(countrys.length){
        query.push('with_original_language='+countrys.join('|'))
    }

    let url = 'discover/' + type + '?' + query.join('&')

    let activity = {
        url: url,
        title: i18next.t("interaction.content_filter.title_62",'Фильтр'),
        component: 'category_full',
        source: 'tmdb',
        card_type: true,
        page: 1
    }

    let object = Activity.active()

    if(object.component == 'category_full' && object.url.indexOf('discover') == 0) Activity.replace(activity)
    else Activity.push(activity)
}

function submenu(item){
    Select.show({
        title: item.title,
        items: item.items,
        onBack: main,
        onSelect: (a)=>{
            select(item.items, a)

            main()
        }
    })
}

function show(){
    main()
}

export default {
    show
}