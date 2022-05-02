import Template from '../interaction/template'
import Controller from '../interaction/controller'
import Select from '../interaction/select'
import Api from '../interaction/api'
import Activity from '../interaction/activity'
import Modal from '../interaction/modal'
import Scroll from '../interaction/scroll'
import Storage from '../utils/storage'
import Filter from '../interaction/content_filter'

let html
let last
let scroll

function init(){
    html   = Template.get('menu')
    scroll = new Scroll({mask: true, over: true})

    Lampa.Listener.send('menu',{type:'start',body: html})

    $('body').on('mouseup',()=>{
        if($('body').hasClass('menu--open')){
            $('body').toggleClass('menu--open',false)

            Controller.toggle('content')
        }
    })

    scroll.minus()
    scroll.append(html)

    Lampa.Listener.send('menu',{type:'end'})

    Controller.add('menu',{
        toggle: ()=>{
            Controller.collectionSet(html)
            Controller.collectionFocus(last,html)
    
            $('body').toggleClass('menu--open',true)
        },
        right: ()=>{
            Controller.toggle('content')
        },
        up: ()=>{
            if(Navigator.canmove('up')) Navigator.move('up')
            else Controller.toggle('head')
        },
        down: ()=>{
            Navigator.move('down')
        },
        gone: ()=>{
            $('body').toggleClass('menu--open',false)
        },
        back: ()=>{
            Activity.backward()
        }
    })
}

function ready(){
    html.find('.selector').on('hover:enter',(e)=>{
        let action = $(e.target).data('action')
        let type   = $(e.target).data('type')

        if(action == 'catalog') catalog()

        if(action == 'movie' || action == 'tv' || action == 'anime'){
            Activity.push({
                url: action,
                title: (action == 'movie' ? i18next.t("components.menu.act_1",'Фильмы') : action == 'anime' ? i18next.t("components.menu.act_2",'Аниме') : i18next.t("components.menu.act_3",'Сериалы')) + ' - ' + Storage.field('source').toUpperCase(),
                component: 'category',
                source: action == 'anime' ? 'cub' : Storage.field('source')
            })
        }

        if(action == 'main'){
            Activity.push({
                url: '',
                title: i18next.t("components.menu.act_4",'Главная - ') + Storage.field('source').toUpperCase(),
                component: 'main',
                source: Storage.field('source')
            })
        }

        if(action == 'search')   Controller.toggle('search')
        if(action == 'settings') Controller.toggle('settings')
        if(action == 'about'){
            Modal.open({
                title: i18next.t("components.menu.about_title",'О приложении'),
                html: Template.get('about'),
                size: 'medium',
                onBack: ()=>{
                    Modal.close()

                    Controller.toggle('content')
                }
            })
        }

        if(action == 'favorite'){
            Activity.push({
                url: '',
                title: type == 'book' ? i18next.t("components.menu.fav_1",'Закладки') : type == 'like' ? i18next.t("components.menu.fav_2",'Нравится') : type == 'history' ? i18next.t("components.menu.fav_3",'История просмотров') : i18next.t("components.menu.fav_4",'Позже'),
                component: 'favorite',
                type: type,
                page: 1
            })
        }

        if(action == 'timetable'){
            Activity.push({
                url: '',
                title: i18next.t("components.menu.timetable_title",'Расписание'),
                component: 'timetable',
                page: 1
            })
        }

        if(action == 'mytorrents'){
            Activity.push({
                url: '',
                title: i18next.t("components.menu.torrents_title",'Мои торренты'),
                component: 'mytorrents',
                page: 1
            })
        }

        if(action == 'relise'){
            Activity.push({
                url: '',
                title: i18next.t("components.menu.relise_title",'Цифровые релизы'),
                component: 'relise',
                page: 1
            })
        }

        if(action == 'console'){
            Controller.toggle('console')
        }

        if(action == 'collections'){
            Select.show({
                title: i18next.t("components.menu.collections_title",'Подборки'),
                items: [
                    {
                        title: i18next.t("components.menu.collections_title_1",'Подборки на ivi'),
                        source: 'ivi'
                    },
                    {
                        title: i18next.t("components.menu.collections_title_2",'Подборки на okko'),
                        source: 'okko'
                    }
                ],
                onSelect: (a)=>{
                    Activity.push({
                        url: '',
                        source: a.source,
                        title: a.title,
                        component: 'collections',
                        page: 1
                    })
                },
                onBack: ()=>{
                    Controller.toggle('menu')
                }
            })
        }

        if(action == 'filter') Filter.show()

    }).on('hover:focus',(e)=>{
        last = e.target

        scroll.update($(e.target),true)
    })
}

function catalog(){
    Api.menu({
        source: Storage.field('source')
    },(menu)=>{
        Select.show({
            title: i18next.t("components.menu.catalog_title",'Каталог'),
            items: menu,
            onSelect: (a)=>{
                let tmdb = Storage.field('source') == 'tmdb' || Storage.field('source') == 'cub'

                Activity.push({
                    url: Storage.field('source') == 'tmdb' ? 'movie' : '',
                    title: i18next.t("components.menu.catalog_title_1",'Каталог - ') + a.title + ' - ' + Storage.field('source').toUpperCase(),
                    component: tmdb ? 'category' : 'category_full',
                    genres: a.id,
                    id: a.id,
                    source: Storage.field('source'),
                    card_type: true,
                    page: 1
                })
            },
            onBack: ()=>{
                Controller.toggle('menu')
            }
        })
    })
}

function render(){
    return scroll.render()
}

export default {
    render,
    init,
    ready
}