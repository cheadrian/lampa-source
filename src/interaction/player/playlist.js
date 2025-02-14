import Subscribe from '../../utils/subscribe'
import Select from '../select'
import Controller from '../controller'

let listener = Subscribe()
let current  = ''
let playlist = []
let position = 0

/**
 * Показать плейлист
 */
function show(){
    active()

    let enabled = Controller.enabled()

    Select.show({
        title: i18next.t("interaction.player.playlist.title_1",'Плейлист'),
        items: playlist,
        onSelect: (a)=>{
            Controller.toggle(enabled.name)

            listener.send('select',{
                playlist,
                item: a,
                position
            })
        },
        onBack: ()=>{
            Controller.toggle(enabled.name)
        }
    })
}

/**
 * Установить активным
 */
function active(){
    playlist.forEach(element => {
        element.selected = element.url == current

        if(element.selected) position = playlist.indexOf(element)
    })
}

/**
 * Назад
 */
function prev(){
    active()

    if(position > 0){
        listener.send('select',{
            playlist,
            position: position - 1,
            item: playlist[position-1]
        })
    }
}

/**
 * Далее
 */
function next(){
    active()

    if(position < playlist.length - 1){
        listener.send('select',{
            playlist,
            position: position + 1,
            item: playlist[position+1]
        })
    }
}

/**
 * Установить плейлист
 * @param {Array} p 
 */
function set(p){
    playlist = p

    listener.send('set',{playlist,position})
}

/**
 * Получить список
 */
 function get(){
    return playlist
}

/**
 * Установить текуший урл
 * @param {String} u 
 */
function url(u){
    current = u
}


export default {
    listener,
    show,
    url,
    get,
    set,
    prev,
    next
}