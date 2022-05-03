let html = `<div>
    <div class="settings-param selector" data-type="toggle" data-name="cloud_use">
        <div class="settings-param__name" data-i18n="settings.cloud.use_cloud_name">Синхронизация</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.cloud.use_cloud_descr">Синхронизация даёт возможность синхронизировать ваши закладки, историю просмотров, метки и тайм-коды. Инструкция по подключению https://github.com/yumata/lampa/wiki</div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.cloud.authorization">Авторизация</span></div>

    <div class="settings-param selector" data-type="input" data-name="cloud_token" placeholder='${i18next.t("settings.cloud.token_placeholder", "Не указан")}'>
        <div class="settings-param__name">Token</div>
        <div class="settings-param__value"></div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.cloud.status">Статус</span></div>

    <div class="settings-param selector settings--cloud-status" data-static="true">
        <div class="settings-param__name"></div>
        <div class="settings-param__descr"></div>
    </div>
</div>`

export default html