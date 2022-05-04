import Storage from '../../utils/storage'
import Arrays from '../../utils/arrays'
import Input from './input'
import Platform from '../../utils/platform'
import Select from '../../interaction/select'
import Controller from '../../interaction/controller'
import Modal from '../../interaction/modal'
import Subscribe from '../../utils/subscribe'

let values   = {}
let defaults = {}
let listener = Subscribe()


function init(){
    if(Platform.is('tizen')){
        select('player',{
            'inner': i18next.t("components.settings.params.inner_1",'Встроенный'),
            'tizen': 'Tizen',
        },'tizen')
    }
    if(Platform.is('orsay')){
        select('player',{
            'inner': i18next.t("components.settings.params.inner_2",'Встроенный'),
            'orsay': 'Orsay',
        },'inner')
    }
    else if(Platform.is('webos')){
        select('player',{
            'inner': i18next.t("components.settings.params.inner_3",'Встроенный'),
            'webos': 'WebOS',
        },'inner')
    }
    else if (Platform.is('android')) {
        select('player', {
            'inner': i18next.t("components.settings.params.inner_4",'Встроенный'),
            'android': 'Android'
        }, 'android')

        trigger('internal_torrclient', false)
    }

    Storage.set('player_size','default') //делаем возврат на нормальный масштаб видео
}

/**
 * Переключатель
 * @param {String} name - название
 * @param {Boolean} _default - значение по дефолту
 */
function trigger(name,_default){
    values[name] = {
        'true': i18next.t("components.settings.params.trig_1",'Да'),
        'false': i18next.t("components.settings.params.trig_2",'Нет')
    }

    defaults[name] = _default
}

/**
 * Выбрать
 * @param {String} name - название
 * @param {*} _select - значение
 * @param {String} _default - значение по дефолту
 */
function select(name, _select, _default){
    values[name] = _select

    defaults[name] = _default
}

/**
 * Биндит события на элемент
 * @param {*} elems 
 */
function bind(elems){
    elems.on('hover:enter',(event)=>{
        let elem = $(event.target)
        let type = elem.data('type')
        let name = elem.data('name')

        if(type == 'toggle'){
            let params   = values[name]
            let keys     = Arrays.isArray(params) ? params : Arrays.getKeys(params),
			    value    = Storage.get(name,defaults[name]) + '',
			    position = keys.indexOf(value)

                position++

                if(position >= keys.length) position = 0

                position = Math.max(0,Math.min(keys.length - 1, position))

                value = keys[position]

                Storage.set(name,value)

                update(elem)
        }

        if(type == 'input'){
            Input.edit({
                elem: elem,
                name: name,
                value: elem.data('string') ? window.localStorage.getItem(name) || defaults[name] : Storage.get(name,defaults[name]) + ''
            },(new_value)=>{
                Storage.set(name,new_value)

                update(elem)
            })
        }

        if(type == 'button'){
            listener.send('button',{
                name: name
            })
        }

        if(type == 'add'){
            Input.edit({
                value: '',
            },(new_value)=>{
                if(new_value && Storage.add(name, new_value)){
                    displayAddItem(elem, new_value)

                    listener.send('update_scroll')
                }
            })
        }

        if(type == 'select'){
            let params   = values[name]
            let value    = Storage.get(name,defaults[name]) + ''
            let items    = []

            for(let i in params){
                items.push({
                    title: params[i],
                    value: i,
                    selected: i == value
                })
            }

            let enabled = Controller.enabled().name

            Select.show({
                title: i18next.t("components.settings.params.itm_1",'Выбрать'),
                items: items,
                onBack: ()=>{
                    Controller.toggle(enabled)
                },
                onSelect: (a)=>{
                    Storage.set(name,a.value)

                    update(elem)

                    Controller.toggle(enabled)
                }
            })
        }
    }).each(function(){
        if(!$(this).data('static')) update($(this))
    })

    if(elems.eq(0).data('type') == 'add'){
        displayAddList(elems.eq(0))
    }
}

function displayAddItem(elem, element){
    let name  = elem.data('name')
    let item  = $('<div class="settings-param selector"><div class="settings-param__name">'+element+'</div>'+'</div>')

    item.on('hover:long',()=>{
        let list = Storage.get(name,'[]')

        Arrays.remove(list, element)

        Storage.set(name, list)

        item.css({opacity: 0.5})
    })

    elem.after(item)
}

function displayAddList(elem){
    let list = Storage.get(elem.data('name'),'[]')

    list.forEach(element => {
        displayAddItem(elem, element)
    })

    listener.send('update_scroll')
}

/**
 * Обновляет значения на элементе
 * @param {*} elem 
 */
function update(elem){
    let name = elem.data('name')

    let key = elem.data('string') ? window.localStorage.getItem(name) || defaults[name] : Storage.get(name, defaults[name] + '')
    let val = typeof values[name] == 'string' ? key : values[name][key] || values[name][defaults[name]]
    let plr = elem.attr('placeholder')

    if(!val && plr) val = plr

    elem.find('.settings-param__value').text(val)
}

/**
 * Получить значение параметра
 * @param {String} name 
 * @returns *
 */
function field(name){
    return Storage.get(name, defaults[name] + '')
}

/**
 * Добовляем селекторы
 */
select('interface_size',{
    'small': i18next.t("components.settings.params.isize_1",'Меньше'),
    'normal': i18next.t("components.settings.params.isize_2",'Нормальный')
},'normal')

select('poster_size',{
    'w200': i18next.t("components.settings.params.psize_1",'Низкое'),
    'w300': i18next.t("components.settings.params.psize_2",'Среднее'),
    'w500': i18next.t("components.settings.params.psize_3",'Высокое')
},'w200')

select('parser_torrent_type',{
    'jackett': 'Jackett',
    'torlook': 'Torlook',
},'jackett')

select('torlook_parse_type',{
    'native': i18next.t("components.settings.params.torpar_1",'Напрямую'),
    'site': i18next.t("components.settings.params.torpar_2",'Через API сайта'),
},'native')

select('background_type',{
    'complex': i18next.t("components.settings.params.bgtyp_1",'Сложный'),
    'simple': i18next.t("components.settings.params.bgtyp_2",'Простой'),
    'poster': i18next.t("components.settings.params.bgtyp_3",'Картинка'),
},'simple')

select('pages_save_total',{
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
},'5')

select('player',{
    'inner': i18next.t("components.settings.params.player_1",'Встроенный')
},'inner')

select('torrserver_use_link',{
    'one': i18next.t("components.settings.params.torr_use_1",'Основную'),
    'two': i18next.t("components.settings.params.torr_use_2",'Дополнительную')
},'one')

select('subtitles_size',{
    'small': i18next.t("components.settings.params.subtz_1",'Маленькие'),
    'normal': i18next.t("components.settings.params.subtz_2",'Обычные'),
    'large': i18next.t("components.settings.params.subtz_3",'Большие'),
},'normal')

select('screensaver_type',{
    'nature': i18next.t("components.settings.params.screens_1",'Природа'),
    'chrome': i18next.t("components.settings.params.screens_2",'ChromeCast')
},'chrome')

select('tmdb_lang',{
    'ru': i18next.t("components.settings.params.tmdb_lg_1",'Русский'),
    'en': i18next.t("components.settings.params.tmdb_lg_2",'Английский'),
},'en')

select('parse_lang',{
    'df': i18next.t("components.settings.params.pars_lg_1",'Оригинал'),
    'ru': i18next.t("components.settings.params.pars_lg_2",'Русский'),
},'df')

select('player_timecode',{
    'again': i18next.t("components.settings.params.play_tmc_1",'Начать с начала'),
    'continue': i18next.t("components.settings.params.play_tmc_2",'Продолжить'),
    'ask': i18next.t("components.settings.params.play_tmc_3",'Спрашивать'),
},'continue')

select('player_scale_method',{
    'transform': i18next.t("components.settings.params.play_scl_1",'Transform'),
    'calculate': i18next.t("components.settings.params.play_scl_2",'Рассчитать'),
},'transform')

select('source',{
    'tmdb': 'TMDB',
    'ivi': 'IVI',
    'okko': 'OKKO',
    'cub': 'CUB',
},'tmdb')

select('start_page', {
    'main': i18next.t("components.settings.params.start_pg_1",'Главная'),
    'favorite@book': i18next.t("components.settings.params.start_pg_2",'Закладки'),
    'favorite@like': i18next.t("components.settings.params.start_pg_3",'Нравится'),
    'favorite@wath': i18next.t("components.settings.params.start_pg_4",'Позже'),
    'favorite@history': i18next.t("components.settings.params.start_pg_5",'История просмотров'),
    'mytorrents': i18next.t("components.settings.params.start_pg_6",'Мои торренты'),
    'last': i18next.t("components.settings.params.start_pg_7",'Последняя')
}, 'last')

select('scroll_type', {
    'css': 'CSS',
    'js': 'Javascript'
}, 'css')

select('card_views_type', {
    'preload': i18next.t("components.settings.params.card_view_1",'Подгружать'),
    'view': i18next.t("components.settings.params.card_view_2",'Показать все')
}, 'preload')

select('navigation_type', {
    'controll': i18next.t("components.settings.params.nav_type_1",'Пульт'),
    'mouse': i18next.t("components.settings.params.nav_type_2",'Пульт с мышкой')
}, 'mouse')


select('time_offset', {
    'n-5': '-5',
    'n-4': '-4',
    'n-3': '-3',
    'n-2': '-2',
    'n-1': '-1',
    'n0': '0',
    'n1': '1',
    'n2': '2',
    'n3': '3',
    'n4': '4',
    'n5': '5',
}, 'n0')


select('video_quality_default',{
    '480': '480p',
    '720': '720p',
    '1080': '1080p',
    '1440': '1440p',
    '2160': '2160p',
},'1080')



/**
 * Добовляем тригеры
 */
trigger('animation',true)
trigger('background',true)
trigger('torrserver_savedb',false)
trigger('torrserver_preload', false);
trigger('parser_use',false)
trigger('cloud_use',false)
trigger('account_use',false)
trigger('torrserver_auth',false)
trigger('mask',true)
trigger('playlist_next',true)
trigger('internal_torrclient', true)
trigger('subtitles_stroke', true);
trigger('subtitles_backdrop', false);
trigger('screensaver', true)
trigger('proxy_tmdb', true)
trigger('proxy_other', true)
trigger('parse_in_search', false)
trigger('subtitles_start', false)
trigger('helper', true)



/**
 * Добовляем поля
 */
select('jackett_url','','jac.red')
select('jackett_key','','')
select('torrserver_url','','')
select('torrserver_url_two','','')
select('torrserver_login','','')
select('torrserver_password','','')
select('parser_website_url','','')
select('torlook_site','','w41.torlook.info')
select('cloud_token','','')
select('account_email','','')
select('account_password','','')
select('device_name','','Lampa')

export default {
    listener,
    init,
    bind,
    update,
    field,
    select,
    trigger
}