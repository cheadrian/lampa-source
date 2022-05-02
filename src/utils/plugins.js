import Utils from './math'
import Storage from './storage'
import Settings from '../components/settings'
import Controller from '../interaction/controller'
import Arrays from './arrays'
import Params from '../components/settings/params'
import Input from '../components/settings/input'
import Modal from '../interaction/modal'
import Account from './account'
import Reguest from './reguest'
import Template from '../interaction/template'
import Noty from '../interaction/noty'
import Platform from './platform'

let body
let network   = new Reguest()
let official_list = [
    {
        name: i18next.t("utils.plugins.offlist_1",'Просмотр онлайн'),
        url: 'http://jin.energy/online.js'
    },
    {
        name: i18next.t("utils.plugins.offlist_2",'Просмотр онлайн'),
        url: 'http://arkmv.ru/vod'
    }
]

/**
 * Запуск
 */
function init(){
    Settings.listener.follow('open',(e)=>{
        body = null

        if(e.name == 'plugins'){
            body = e.body

            renderPanel()
        }
    })
}

function showCheckResult(error){
    Modal.open({
        title: '',
        html: $('<div class="about"><div class="selector">'+(error ? i18next.t("utils.plugins.err_1",'Не удалось проверить работоспособность плагина, однако это не означает, что плагин не работает. Перезагрузите приложение для выяснения загружается ли плагин.') : i18next.t("utils.plugins.err_2",'Для работы плагина, необходимо перезагрузить приложение.') )+'</div></div>'),
        onBack: ()=>{
            Modal.close()

            Controller.toggle('settings_component')
        },
        onSelect: ()=>{
            Modal.close()

            Controller.toggle('settings_component')
        }
    })
}

/**
 * Рендер панели плагинов
 */
function renderPanel(){
    if(body){
        let list = Storage.get('plugins','[]')

        $('.selector:eq(0)',body).on('hover:enter',()=>{
            Input.edit({
                value: '',
            },(new_value)=>{
                if(new_value && Storage.add('plugins', new_value)){
                    renderPlugin(new_value, {
                        is_new: true,
                        checked: showCheckResult
                    })

                    Params.listener.send('update_scroll')
                }
            })
        })

        $('.selector:eq(1)',body).on('hover:enter',showCatalog)

        list.forEach(url => {
            renderPlugin(url)
        })

        Account.plugins((plugins)=>{
            plugins.forEach((plugin)=>{
                renderPlugin(plugin.url,{
                    is_cub: true,
                    plugin: plugin
                })
            })

            Controller.enable('settings_component')

            Params.listener.send('update_scroll')
        })

        Params.listener.send('update_scroll')
    }
}

function showCatalog(){
    Modal.open({
        title: '',
        html: Template.get('modal_loading'),
        size: 'large',
        mask: true,
        onBack: ()=>{
            network.clear()

            Modal.close()

            Controller.toggle('settings_component')
        }
    })

    function complite(result){
        let temp   = Template.get('plugins_catalog')
        let first  = temp.find('.plugins-catalog__list').eq(0)
        let second = temp.find('.plugins-catalog__list').eq(1)

        function draw(container,plug){
            let item = $(`<div class="plugins-catalog__line selector">
                <div class="plugins-catalog__url"></div>
                <div class="plugins-catalog__detail"></div>
                <div class="plugins-catalog__button" data-i18n="utils.plugins.draw_1">Установить</div>
            </div>`)

            item.on('hover:enter',()=>{
                if(Storage.add('plugins', plug.url)){
                    Modal.close()

                    Controller.toggle('settings_component')

                    renderPlugin(plug.url, {
                        is_new: true,
                        checked: showCheckResult
                    })

                    Params.listener.send('update_scroll')
                }
                else{
                    Noty.show(i18next.t("utils.plugins.sett_component_1",'Этот плагин уже установлен.'))
                }
            })

            item.find('.plugins-catalog__url').text(plug.url)
            item.find('.plugins-catalog__detail').text(plug.count ? plug.count + i18next.t("utils.plugins.cat_details",' - Установок') : plug.name)

            container.append(item)
        }

        official_list.forEach((plug)=>{
            draw(first,plug)
        })

        if(result.plugins.length){
            result.plugins.forEach((plug)=>{
                draw(second,plug)
            })
        }

        Modal.update(temp)
    }

    network.timeout(10000)

    network.silent(Utils.protocol() + 'cub.watch/api/plugins/installs',complite,()=>{
        complite({
            plugins: []
        })
    })
}

/**
 * Рендер плагина
 */
function renderPlugin(url, params = {}){
    let item  = $('<div class="settings-param selector"><div class="settings-param__name">'+(params.is_cub && params.plugin.name ? params.plugin.name + ' - ' : '')+url+'</div><div class="settings-param__descr">'+(params.is_cub ? i18next.t("utils.plugins.iscub_1",'Загружено из CUB') : i18next.t("utils.plugins.iscun_2",'Нажмите для проверки плагина'))+'</div><div class="settings-param__status"></div></div>')
    let check = ()=>{
        let status = $('.settings-param__status',item).removeClass('active error wait').addClass('wait')
        
        network.timeout(5000)
        network.native(url,function(){
            status.removeClass('wait').addClass('active')

            if(params.checked) params.checked()
        },function(){
            status.removeClass('wait').addClass('error')

            if(params.checked) params.checked(true)
        },false,{dataType:'text'})
    }

    let remove = ()=>{
        if(params.is_cub){
            Account.pluginsStatus(params.plugin, params.plugin.status ? 0 : 1)

            item.css({opacity: params.plugin.status ? 0.5 : 1})

            params.plugin.status = params.plugin.status ? 0 : 1
        }
        else{
            let list = Storage.get('plugins','[]')

            Arrays.remove(list, url)

            Storage.set('plugins', list)

            item.css({opacity: 0.5})

            localStorage.removeItem('plugin_'+url)
        }
    }

    item.on('hover:long',remove)
    
    if(params.is_cub && !params.plugin.status) item.css({opacity: 0.5})

    let dbtimer, dbtime = Date.now()

    item.on('hover:enter', ()=>{
        if(dbtime < Date.now() - 200){
            dbtimer = setTimeout(()=>{
                check()
            },200)

            dbtime = Date.now() + 200
        } 
        else if(dbtime > Date.now()){
            clearTimeout(dbtimer)

            remove()
        }
    })

    if(params.is_new) check()

    $('.selector:eq(1)',body).after(item)
}

function saveInMemory(list){
    list.forEach(url=>{
        if(url.indexOf('modification.js') !== -1) return

        network.timeout(5000)

        let prox = Platform.any() ? '' : 'http://proxy.cub.watch/cdn/'

        if(url.indexOf('http') !== 0) prox = ''

        network.native(prox + url,(str)=>{
            localStorage.setItem('plugin_'+url, str)
        },false,false,{
            dataType: 'text'
        })
    })
}

function loadFromMemory(list, call){
    let noload = []

    list.forEach(url=>{
        let str = localStorage.getItem('plugin_'+url, str)

        if(str){
            try{
                eval(str)
            }
            catch(e){
                noload.push(url)
            }
        }
    })

    call(noload)
}

/**
 * Загрузка всех плагинов
 */
function load(call){
    Account.plugins((plugins)=>{
        let list = plugins.filter(plugin=>plugin.status).map(plugin=>plugin.url).concat(Storage.get('plugins','[]'))

        list.push('./plugins/modification.js')

        //saveInMemory(list) //фиг знает, похоже памяти не густо, не буду сохранять
        
        console.log('Plugins','list:', list)

        let errors = []

        Utils.putScript(list,()=>{
            call()

            if(errors.length){
                loadFromMemory(errors,(notload)=>{
                    if(notload.length){
                        setTimeout(()=>{
                            let enabled = Controller.enabled().name

                            Modal.open({
                                title: '',
                                html: $('<div class="about"><div class="selector"><span data-i18n="utils.plugins.loadmem_1">При загрузке приложения, часть плагинов не удалось загрузить</span> ('+notload.join(', ')+')</div></div>'),
                                onBack: ()=>{
                                    Modal.close()
                        
                                    Controller.toggle(enabled)
                                },
                                onSelect: ()=>{
                                    Modal.close()
                        
                                    Controller.toggle(enabled)
                                }
                            })
                        },3000)
                    }
                })
            }
        },(u)=>{
            if(u.indexOf('modification.js') == -1) errors.push(u)
        })
    })
}

export default {
    init,
    load
}