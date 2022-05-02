let html = `<div class="error">
    <div class="error__ico"></div>
    <div class="error__body">
        <div class="error__title">{title}</div>
        <div class="error__text">{text}</div>
    </div>
</div>

<div class="torrent-error noconnect">
    <div>
        <div data-i18n="torrent.error.noconnect_cause">Причины</div>
        <ul>
            <li><span data-i18n="torrent.error.noconnect_cause_1">спользуется адрес:</span><code>{ip}</code></li>
            <li class="nocorect"><span data-i18n="torrent.error.noconnect_cause_2">екущий адрес</span><code>{ip}</code> <span data-i18n="torrent.error.noconnect_cause_3">вляется неверным!</span></li>
            <li><span data-i18n="torrent.error.noconnect_cause_4">екущий ответ:</span><code>{echo}</code></li>
        </ul>
    </div>

    <div>
        <div data-i18n="torrent.error.noconnect_howto">Как правильно?</div>
        <ul>
            <li><span data-i18n="torrent.error.noconnect_howto_1">спользуйте адрес:</span><code>192.168.0.ххх:8090</code></li>
            <li data-i18n="torrent.error.noconnect_howto_2">Используйте версию Matrix</li>
        </ul>
    </div>

    <div>
        <div data-i18n="torrent.error.noconnect_howto">Как проверить?</div>
        <ul>
            <li><span data-i18n="torrent.error.noconnect_howto_3">а этом же устройстве, откройте браузер и зайдите по адресу</span><code>{ip}/echo</code></li>
            <li data-i18n="torrent.error.noconnect_howto_4">Если же браузер не ответит, проверьте запущен ли TorrServe, или перезагрузите его.</li>
            <li><span data-i18n="torrent.error.noconnect_howto_5">сли же браузер ответил, убедитесь что в ответе есть строка</span><code>MatriX</code></li>
        </ul>
    </div>
</div>`

export default html