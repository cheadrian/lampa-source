let html = `<div>
    <div class="settings-param selector" data-type="toggle" data-name="start_page">
        <div class="settings-param__name" data-i18n="settings.more.start_page_name">Стартовая страница</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.more.start_page_descr">С какой страницы начинать при запуске</div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.more.source">Источник</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="source">
        <div class="settings-param__name" data-i18n="settings.more.source_name">Основной источник</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.more.source_descr">Откуда брать информацию о фильмах</div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="tmdb_lang">
        <div class="settings-param__name" data-i18n="settings.more.tmdb_lang_name">TMDB</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.more.tmdb_lang_descr">На каком языке отображать данные с TMDB</div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="poster_size">
        <div class="settings-param__name" data-i18n="settings.more.poster_size_name">Разрешение постеров TMDB</div>
        <div class="settings-param__value"></div>
    </div> 

    <div class="settings-param-title"><span data-i18n="settings.more.screensaver">Скринсейвер</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="screensaver">
        <div class="settings-param__name" data-i18n="settings.more.screensaver_name">Показывать заставку при бездействии</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="screensaver_type">
        <div class="settings-param__name" data-i18n="settings.more.screensaver_type_name">Тип заставки</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.more.proxy">Прокси</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="proxy_tmdb">
        <div class="settings-param__name" data-i18n="settings.more.proxy_tmdb_name">Проксировать TMDB</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="proxy_other">
        <div class="settings-param__name" data-i18n="settings.more.proxy_other_name">Проксировать остальные ресурсы</div>
        <div class="settings-param__value"></div>
    </div>
    
    <div class="settings-param-title"><span data-i18n="settings.more.others">Еще</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="pages_save_total">
        <div class="settings-param__name" data-i18n="settings.more.pages_save_total_name">Сколько страниц хранить в памяти</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.more.pages_save_total_descr">Хранит страницы в том состоянии, в котором вы их покинули.</div>
    </div>

    <div class="settings-param selector" data-type="select" data-name="time_offset">
        <div class="settings-param__name" data-i18n="settings.more.time_offset_name">Сместить время</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector" data-type="select" data-name="navigation_type">
        <div class="settings-param__name" data-i18n="settings.more.navigation_type_name">Тип навигации</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector" data-type="input" data-name="device_name" placeholder="Например: Моя Лампа">
        <div class="settings-param__name" data-i18n="settings.more.device_name_name">Название устройства</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector clear-storage" data-static="true">
        <div class="settings-param__name" data-i18n="settings.more.clear_storage_name">Очистить кеш</div>
        <div class="settings-param__value" data-i18n="settings.more.clear_storage_value">Будут очищены все настройки и данные</div>
    </div>
</div>`

export default html