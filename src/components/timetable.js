import Controller from '../interaction/controller'
import Scroll from '../interaction/scroll'
import Activity from '../interaction/activity'
import TimeTable from '../utils/timetable'
import Favorite from '../utils/favorite'
import Utils from '../utils/math'
import Modal from '../interaction/modal'
import Template from '../interaction/template'
import Empty from '../interaction/empty'

function component(object){
    let scroll  = new Scroll({mask:true,over: true})
    let html    = $('<div></div>')
    let body    = $('<div class="timetable"></div>')
    let cards   = Favorite.full().card
    let table   = TimeTable.all()
    let last
    
    
    this.create = function(){
        if(table.length){
            let date_max = 0
            let date_now = new Date()
            let date_end = new Date()
            let date_one = 24 * 60 * 60 * 1000

            table.forEach(elem=>{
                elem.episodes.forEach(ep=>{
                    let air = new Date(ep.air_date)
                    let tim = air.getTime()

                    if(date_max < tim){
                        date_max = tim
                        date_end = air
                    }
                })
            })

            let date_dif = Math.min(30,Math.round(Math.abs((date_now - date_end) / date_one)))

            for(let i = 0; i < date_dif; i++){
                this.append(date_now)

                date_now.setDate(date_now.getDate() + 1)
            }

            scroll.minus()
            scroll.append(body)

            html.append(scroll.render())
        }
        else this.empty()

        this.activity.loader(false)

        this.activity.toggle()

        return this.render()
    }

    this.empty = ()=>{
        let empty = new Empty({
            descr: i18next.t("components.timetable.empty_1",'В этом разделе будут отображаться даты выхода новых серий')
        })

        html.append(empty.render())

        this.start = empty.start

        this.activity.loader(false)

        this.activity.toggle()
    }

    this.append = function(date){
        let item = $(`
            <div class="timetable__item selector">
                <div class="timetable__inner">
                    <div class="timetable__date"></div>
                    <div class="timetable__body"></div>
                </div>
            </div>
        `)

        let air_date = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        let air_epis = []
        let day_week = Utils.parseTime(date.getTime())
        let weeks    = [
            i18next.t("components.timetable.weeks_arr.0",'Вс'), 
            i18next.t("components.timetable.weeks_arr.1",'Пн'), 
            i18next.t("components.timetable.weeks_arr.2",'Вт'), 
            i18next.t("components.timetable.weeks_arr.3",'Ср'), 
            i18next.t("components.timetable.weeks_arr.4",'Чт'), 
            i18next.t("components.timetable.weeks_arr.5",'Пт'), 
            i18next.t("components.timetable.weeks_arr.6",'Сб')
        ]

        table.forEach(elem=>{
            elem.episodes.forEach(ep=>{
                let card = cards.find(card=>card.id == elem.id)
                
                if(ep.air_date == air_date && card){
                    air_epis.push({
                        episode: ep,
                        card: cards.find(card=>card.id == elem.id)
                    })
                }
            })
        })

        if(air_epis.length){
            air_epis.slice(0,3).forEach(elem=>{
                item.find('.timetable__body').append('<div><span style="background-color: '+Utils.stringToHslColor(elem.card.name, 50, 50)+'"></span>'+elem.card.name+'</div>')
            })

            if(air_epis.length > 3){
                item.find('.timetable__body').append('<div>+'+(air_epis.length-3)+'</div>')
            }

            if(air_epis.length == 1){
                let preview = $('<div class="timetable__preview"><img><div>'+(air_epis[0].episode.name || i18next.t("components.timetable.air_eips",'Без названия'))+'</div></div>')

                Utils.imgLoad(preview.find('img'), Utils.protocol() + 'imagetmdb.cub.watch/t/p/w200/'+air_epis[0].episode.still_path,false,()=>{
                    preview.find('img').remove()
                })

                item.find('.timetable__body').prepend(preview)
            }

            item.addClass('timetable__item--any')
        }

        item.find('.timetable__date').text(day_week.short + ' - ' + weeks[date.getDay()] + '.')

        item.on('hover:focus',function(){
            last = $(this)[0]

            scroll.update($(this))
        }).on('hover:enter',function(){
            let modal = $('<div></div>')

            air_epis.forEach(elem=>{
                let noty = Template.get('notice_card',{
                    time: air_date,
                    title: elem.card.name,
                    descr: 'Cезон - <b>'+elem.episode.season_number+i18next.t("components.timetable.air_eleme",'</b><br>Эпизод - <b>')+elem.episode.episode_number+'</b>'
                })

                Utils.imgLoad(noty.find('img'), elem.card.poster ? elem.card.poster : elem.card.img ? elem.card.img : Utils.protocol() + 'imagetmdb.cub.watch/t/p/w200/'+elem.card.poster_path)

                noty.on('hover:enter',()=>{
                    Modal.close()

                    Activity.push({
                        url: '',
                        component: 'full',
                        id: elem.card.id,
                        method: 'tv',
                        card: elem.card,
                        source: elem.card.source
                    })
                })
                
                modal.append(noty)
            })

            Modal.open({
                title: i18next.t("components.timetable.modal_medium",'Сериалы'),
                size: 'medium',
                html: modal,
                onBack: ()=>{
                    Modal.close()
    
                    Controller.toggle('head')
                }
            })
        })

        body.append(item)
    }

    this.back = function(){
        Activity.backward()
    }

    this.start = function(){
        Controller.add('content',{
            toggle: ()=>{
                Controller.collectionSet(scroll.render())
                Controller.collectionFocus(last || false,scroll.render())
            },
            left: ()=>{
                if(Navigator.canmove('left')) Navigator.move('left')
                else Controller.toggle('menu')
            },
            right: ()=>{
                Navigator.move('right')
            },
            up: ()=>{
                if(Navigator.canmove('up')) Navigator.move('up')
                else Controller.toggle('head')
            },
            down: ()=>{
                if(Navigator.canmove('down')) Navigator.move('down')
            },
            back: this.back
        })

        Controller.toggle('content')
    }

    this.pause = function(){
        
    }

    this.stop = function(){
        
    }

    this.render = function(){
        return html
    }

    this.destroy = function(){
        scroll.destroy()

        html.remove()
    }
}

export default component