let html = `<div>
    <div class="settings-param selector" data-type="toggle" data-name="account_use">
        <div class="settings-param__name" data-i18n="settings.account.account_use_name">Синхронизация</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.account.account_use_descr">Синхронизация с сервисом CUB: синхронизация ваших закладок, истории просмотров, меток и тайм-кодов. Сайт: https://cub.watch</div>
    </div>

    <div class="settings-param-title settings--account-user hide" data-i18n="settings.account.account_user_hide"><span>Аккаунт</span></div>

    <div class="settings-param selector settings--account-user settings--account-user-info hide" data-static="true">
        <div class="settings-param__name" data-i18n="settings.account.user_info_name">Вошли как</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector settings--account-user settings--account-user-profile hide" data-static="true">
        <div class="settings-param__name" data-i18n="settings.account.user_profile_name">Профиль</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector settings--account-user settings--account-user-sync hide" data-static="true">
        <div class="settings-param__name" data-i18n="settings.account.user_sync_name">Синхронизировать</div>
        <div class="settings-param__value" data-i18n="settings.account.user_sync_value">Сохранить локальные закладки в аккаунт CUB</div>
    </div>

    <div class="settings-param selector settings--account-user settings--account-user-out hide" data-static="true">
        <div class="settings-param__name" data-i18n="settings.account.user_out_name">Выйти из аккаунта</div>
    </div>

    <div class="settings-param-title settings--account-signin"><span data-i18n="settings.account.signin">Авторизация</span></div>

    <div class="settings-param selector settings--account-signin" data-type="input" data-name="account_email" placeholder='${i18next.t("settings.account.email_placeholder", "Не указан")}'>
        <div class="settings-param__name">Email</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param selector settings--account-signin" data-type="input" data-string="true" data-name="account_password" placeholder='${i18next.t("settings.account.password_placeholder", "Не указан")}'>
        <div class="settings-param__name" data-i18n="settings.account.signin_name">Пароль</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.account.status">Статус</span></div>

    <div class="settings-param selector settings--account-status" data-static="true">
        <div class="settings-param__value"></div>
        <div class="settings-param__descr"></div>
    </div>
</div>`

export default html