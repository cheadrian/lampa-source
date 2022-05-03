let html = `<div>
    <div class="settings-param selector" data-type="toggle" data-name="parser_use">
        <div class="settings-param__name" data-i18n="settings.parser.parser_use_name">Использовать парсер</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.parser.parser_use_descr">Тем самым, вы соглашаетесь принять на себя всю отвественность за использование публичных ссылок для просмотра торрент и онлайн контента.</div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="parser_torrent_type">
        <div class="settings-param__name" data-i18n="settings.parser.parser_torrent_type_name">Тип парсера для торрентов</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.parser.parser_type">Jackett</span></div>

    <div class="settings-param selector" data-type="input" data-name="jackett_url" placeholder='${i18next.t("settings.parser.jackett_url_placeholder", "Например: 192.168.х")}'>
        <div class="settings-param__name" data-i18n="settings.parser.jackett_url_name">Ссылка</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.parser.jackett_url_descr">Укажите ссылку на скрипт Jackett</div>
    </div>

    <div class="settings-param selector" data-type="input" data-name="jackett_key" placeholder='${i18next.t("settings.parser.jackett_key_placeholder", "Например: sa0sk83d..")}'>
        <div class="settings-param__name" data-i18n="settings.parser.jackett_key_name">Api ключ</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.parser.jackett_key_descr">Находится в Jackett</div>
    </div>

    <div class="settings-param-title is--torllok"><span data-i18n="settings.parser.torlook">Torlook</span></div> 

    <div class="settings-param selector is--torllok" data-type="toggle" data-name="torlook_parse_type">
        <div class="settings-param__name" data-i18n="settings.parser.torlook_parse_type_name">Метод парсинга сайта TorLook</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector is--torllok" data-type="input" data-name="parser_website_url" placeholder='${i18next.t("settings.parser.parser_web_placeholder", "Например: scraperapi.com")}''>
        <div class="settings-param__name" data-i18n="settings.parser.parser_website_url_name">Ссылка на парсер сайтов</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.parser.parser_website_url_descr">Зарегистрируйтесь на сайте scraperapi.com, прописать ссылку api.scraperapi.com?api_key=...&url={q}<br>В {q} будет поставлятся сайт w41.torlook.info</div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.parser.others">Еще</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="parse_lang">
        <div class="settings-param__name" data-i18n="settings.parser.parse_lang_name">Поиск</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.parser.parse_lang_descr">На каком языке производить поиск?</div>
    </div>
    <div class="settings-param selector" data-type="toggle" data-name="parse_in_search">
        <div class="settings-param__name" data-i18n="settings.parser.parse_in_search_name">Парсер в поиске</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.parser.parse_in_search_descr">Искать результаты в поиске?</div>
    </div>
</div>`

export default html