function cdnmovies(component, _object){
    let network  = new Lampa.Reguest()
    let extract  = {}
    let results  = []
    let object   = _object
    let select_title = ''

    //let cors  = 'https://cors.eu.org/'
    let prox  = Lampa.Storage.field('proxy_other') === false ? '' : 'http://proxy.cub.watch/cdn/'
    let embed = prox + 'https://cdnmovies.net/api/short'
    let token = '60b340d7b5eef61f62b622b3c018843b'

    let filter_items = {}

    let choice = {
        season: 0,
        voice: 0
    }

    /**
     * Начать поиск
     * @param {Object} _object 
     */
    this.search = function(_object, kp_id){
        object  = _object

        select_title = object.movie.title

        let url = embed
            url = Lampa.Utils.addUrlComponent(url, 'token=' + token);
		    url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + kp_id);

        network.silent(url, (str) => {
            let iframe = String(str).match('"iframe_src":"(.*?)"')
            
            if(iframe && iframe[1]){
                iframe = 'https:' + iframe[1].split('\\').join('')

                this.find(iframe)
            }
            else{
                component.empty('По запросу (' + select_title + ') нет результатов')
            }
        },(a, c)=>{
            component.empty(network.errorDecode(a, c))
        },false,{
            dataType: 'text'
        })
    }

    this.find = function (url) {
        network.clear()
        network.silent(url, (json)=>{
            parse(json)

            component.loading(false)
        }, (a, c)=>{
            component.empty(network.errorDecode(a, c))
        },false,{
            dataType: 'text'
        })
    }

    this.extendChoice = function(saved){
        Lampa.Arrays.extend(choice, saved, true)
    }

    /**
     * Сброс фильтра
     */
    this.reset = function(){
        component.reset()

        choice = {
            season: 0,
            voice: 0
        }

        filter()

        append(filtred())

        component.saveChoice(choice)
    }

    /**
     * Применить фильтр
     * @param {*} type 
     * @param {*} a 
     * @param {*} b 
     */
    this.filter = function(type, a, b){
        choice[a.stype] = b.index

        component.reset()

        filter()

        append(filtred())

        component.saveChoice(choice)
    }

    /**
     * Уничтожить
     */
    this.destroy = function(){
        network.clear()

        results = null
    }

    function parse(str) {
        str = str.replace(/\n/g, '')

        let find   = str.match('Playerjs\\({(.*?)}\\);')
        let videos = str.match("file:'(.*?)'")
        let video  = decode(videos[1])

        if (find) {
            let json

            try {
                json = JSON.parse(video)
            } catch (e) {}

            if (json) {
                extract = json

                filter()

                append(filtred())
            }
            else component.empty('По запросу (' + select_title + ') нет результатов')
        }
    }

    function decode(data) {
        data = data.replace('#2', '').replace('//NTR2amZoY2dkYnJ5ZGtjZmtuZHo1Njg0MzZmcmVkKypk', '').replace('//YXorLWVydyozNDU3ZWRndGpkLWZlcXNwdGYvcmUqcSpZ', '').replace('//LSpmcm9mcHNjcHJwYW1mcFEqNDU2MTIuMzI1NmRmcmdk', '').replace('//ZGY4dmc2OXI5enhXZGx5ZisqZmd4NDU1ZzhmaDl6LWUqUQ==', '').replace('//bHZmeWNnbmRxY3lkcmNnY2ZnKzk1MTQ3Z2ZkZ2YtemQq', '');
        
        try {
            return decodeURIComponent(atob(data).split("").map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        }
        catch (e) {
            return ''
        }
    }

    /**
     * Найти поток
     * @param {Object} element 
     * @param {Int} max_quality
     * @returns string
     */
    function getFile(element) {
        let file        = ''
        let quality     = false
        let max_quality = 1080
        let path        = element.slice(0, element.lastIndexOf('/')) + '/'

        if (file.split('/').pop().replace('.mp4', '') !== max_quality) {
            file = path + max_quality + '.mp4'
        }

        quality = {}

        let mass = [1080, 720, 480, 360]

        mass = mass.slice(mass.indexOf(max_quality))

        mass.forEach(function (n) {
            quality[n + 'p'] = path + n + '.mp4'
        })

        let preferably = Lampa.Storage.get('video_quality_default','1080') + 'p'
            
        if(quality[preferably]) file = quality[preferably]

        return {
            file: file,
            quality: quality
        }
    }

    /**
     * Построить фильтр
     */
    function filter(){
        filter_items  = {
            season: [],
            voice: [],
            quality: []
        }

        if (extract[0].folder || object.movie.number_of_seasons) {
            extract.forEach((season)=>{
                filter_items.season.push(season.title)
            })
            
            extract[choice.season].folder.forEach(f=>{
                f.folder.forEach(t=>{
                    if(filter_items.voice.indexOf(t.title) == -1) filter_items.voice.push(t.title)
                })
            })

            if(!filter_items.voice[choice.voice]) choice.voice = 0
        }

        component.filter(filter_items, choice)
    }

    /**
     * Отфильтровать файлы
     * @returns array
     */
    function filtred(){
        let filtred = []

        let filter_data = Lampa.Storage.get('online_filter', '{}')

        console.log(extract)

        if (extract[0].folder || object.movie.number_of_seasons) {
            extract.forEach(function (t) {
                if (t.title == filter_items.season[filter_data.season]) {
                    t.folder.forEach(function (se) {
                        se.folder.forEach(function (eps) {
                            if (eps.title == filter_items.voice[choice.voice]) {
                                filtred.push({
                                    file: eps.file,
                                    episode: parseInt(se.title.match(/\d+/)),
                                    season: parseInt(t.title.match(/\d+/)),
                                    quality: '360p ~ 1080p',
                                    info: ' / ' + Lampa.Utils.shortText(eps.title,50) 
                                })
                            }
                        })
                    })
                }
            })
        } 
        else {
            extract.forEach(function (data) {
                filtred.push({
                    file: data.file,
                    title: data.title,
                    quality: '360p ~ 1080p',
                    info: '',
                    subtitles: data.subtitle ? data.subtitle.split(',').map(function (c) {
                        return {
                            label: c.split(']')[0].slice(1),
                            url: c.split(']')[1]
                        }
                    }) : false
                })
            })
        }

        return filtred
    }

    /**
     * Добавить видео
     * @param {Array} items 
     */
    function append(items){
        component.reset()

        let viewed = Lampa.Storage.cache('online_view', 5000, [])

        items.forEach(element => {
            if(element.season) element.title = 'S'+element.season + ' / Серия ' + element.episode

            element.info = element.season ? ' / ' + Lampa.Utils.shortText(filter_items.voice[choice.voice], 50) : ''

            let hash = Lampa.Utils.hash(element.season ? [element.season,element.episode,object.movie.original_title].join('') : object.movie.original_title)
            let view = Lampa.Timeline.view(hash)
            let item = Lampa.Template.get('online',element)

            let hash_file = Lampa.Utils.hash(element.season ? [element.season,element.episode,object.movie.original_title,filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title)

            item.addClass('video--stream')

            element.timeline = view

            item.append(Lampa.Timeline.render(view))

            if(Lampa.Timeline.details){
                item.find('.online__quality').append(Lampa.Timeline.details(view,' / '))
            }

            if(viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">'+Lampa.Template.get('icon_star',{},true)+'</div>')

            item.on('hover:enter',()=>{
                if(object.movie.id) Lampa.Favorite.add('history', object.movie, 100)

                let extra = getFile(element.file)

                if(extra.file){
                    let playlist = []
                    let first = {
                        url: extra.file,
                        quality: extra.quality,
                        timeline: view,
                        subtitles: element.subtitles,
                        title: element.season ? element.title : object.movie.title + ' / ' + element.title
                    }

                    if(element.season){
                        items.forEach(elem=>{
                            let ex = getFile(elem.file)

                            playlist.push({
                                title: elem.title,
                                url: ex.file,
                                quality: ex.quality,
                                subtitles: elem.subtitles,
                                timeline: elem.timeline
                            })
                        })
                    }
                    else{
                        playlist.push(first)
                    }

                    if(playlist.length > 1) first.playlist = playlist

                    Lampa.Player.play(first)

                    Lampa.Player.playlist(playlist)

                    if(viewed.indexOf(hash_file) == -1){
                        viewed.push(hash_file)

                        item.append('<div class="torrent-item__viewed">'+Lampa.Template.get('icon_star',{},true)+'</div>')

                        Lampa.Storage.set('online_view', viewed)
                    }
                }
                else Lampa.Noty.show('Не удалось извлечь ссылку')
            })

            component.append(item)

            component.contextmenu({
                item,
                view,
                viewed,
                hash_file,
                file: (call)=>{call(getFile(element.file))}
            })
        })

        component.start(true)
    }
}

export default cdnmovies