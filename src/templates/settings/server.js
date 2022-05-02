let html = `<div>
    <div class="settings-param selector" data-type="toggle" data-name="torrserver_use_link">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_use_link_name">Использовать ссылку</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.server.links">Ссылки</span></div>

    <div class="settings-param selector" data-type="input" data-name="torrserver_url" placeholder="Например: 192.168.х">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_url_name">Основная ссылка</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.server.torrserver_url_descr">Укажите основную ссылку на скрипт TorrServer</div>
    </div>

    <div class="settings-param selector" data-type="input" data-name="torrserver_url_two" placeholder="Например: 192.168.х">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_url_two_name">Дополнительная ссылка</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.server.torrserver_url_two_descr">Укажите дополнительную ссылку на скрипт TorrServer</div>
    </div>
    
    <div class="settings-param-title"><span data-i18n="settings.server.additionally">Дополнительно</span></div>

    <div class="settings-param selector is--android" data-type="toggle" data-name="internal_torrclient">
        <div class="settings-param__name" data-i18n="settings.server.internal_torrclient_name">Встроенный клиент</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.server.internal_torrclient_descr">Использовать встроенный JS-клиент TorrServe, иначе запускается системный.</div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="torrserver_savedb">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_savedb_name">Сохранить в базу</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.server.torrserver_savedb_descr">Торрент будет добавлен в базу TorrServer</div>
    </div>
    
    <div class="settings-param selector" data-type="toggle" data-name="torrserver_preload">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_preload_name">Использовать буфер пред.загрузки</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.server.torrserver_preload_descr">Дожидаться заполнения буфера предварительной загрузки TorrServer перед проигрыванием</div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.server.authorization">Авторизация</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="torrserver_auth">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_auth_name">Вход по паролю</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector" data-type="input" data-name="torrserver_login" placeholder="Не указан">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_login_name">Логин</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector" data-type="input" data-name="torrserver_password" data-string="true" placeholder="Не указан">
        <div class="settings-param__name" data-i18n="settings.server.torrserver_password_name">Пароль</div>
        <div class="settings-param__value"></div>
    </div>
</div>`

export default html