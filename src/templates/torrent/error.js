let html = `<div class="torrent-checklist">
    <div class="torrent-checklist__descr" data-i18n="torrent.error.checklist_descr">Не удалось подключится к TorrServe, проблема может быть разной. Давайте быстро пройдемся по списку возможных проблем и все проверим.</div>

    <div class="torrent-checklist__progress-steps" data-i18n="torrent.error.progress_steps">Выполнено 0 из 0</div>
    <div class="torrent-checklist__progress-bar">
        <div style="width: 0"></div>
    </div>

    <div class="torrent-checklist__content">
        <div class="torrent-checklist__steps">
            <ul class="torrent-checklist__list">
                <li data-i18n="torrent.error.checklist_list_1">Запущен ли TorrServe</li>
                <li data-i18n="torrent.error.checklist_list_2">Динамический IP адрес</li>
                <li data-i18n="torrent.error.checklist_list_3">Протокол</li>
                <li data-i18n="torrent.error.checklist_list_4">Блокировка антивирусами</li>
                <li data-i18n="torrent.error.checklist_list_5">Проверьте на доступность</li>
                <li data-i18n="torrent.error.checklist_list_6">Все равно не работает</li>
            </ul>
        </div>

        <div class="torrent-checklist__info">
            <div class="hide"><span data-i18n="torrent.error.checklist_info_1">Убедитесь, что вы запустили TorrServe на устройстве где он установлен.</span></div>
            <div class="hide"><span data-i18n="torrent.error.checklist_info_2">Частая ошибка, изменился IP адрес вашего устройства. Убедитесь, что IP адрес который вы ввели</span> {ip},<span data-i18n="torrent.error.checklist_info_3"> совпадает с адресом устройства на котором установлен TorrServe</span></div>
            <div class="hide"><span data-i18n="torrent.error.checklist_info_4">Для обращения к TorrServe, необходим порт :8090 в конце адреса. Убедитесь, что в конце вашего IP адреса прописан порт, ваш текущий адрес</span> {ip}</div>
            <div class="hide"><span data-i18n="torrent.error.checklist_info_5">Частое явление, антивирус или брандмауэр может блокировать доступ по IP адресу, попробуйте отключить антивирус и брандмауэр.</span></div>
            <div class="hide"><span data-i18n="torrent.error.checklist_info_6">На любом другом устройстве, где не установлен TorrServe, откройте в браузере адрес</span> {ip} <span data-i18n="torrent.error.checklist_info_7">и проверьте, доступен ли ответ от TorrServe</span></div>
            <div class="hide"><span data-i18n="torrent.error.checklist_info_8">Если после всех проверок все равно не работает, попробуйте перезагрузить TorrServe и интернет адаптер.</span></div>
            <div class="hide"><span data-i18n="torrent.error.checklist_info_9">Если проблема не устранена, пишите в телеграм группу @lampa_group с текстом (Лампа не подключается к TorrServe после всех проверок, текущий адрес</span> {ip})</div>
        </div>
    </div>

    <div class="torrent-checklist__footer">
        <div class="simple-button selector" data-i18n="torrent.error.checklist_footer">Начать проверку</div><div class="torrent-checklist__next-step"></div>
    </div>
</div>`

export default html