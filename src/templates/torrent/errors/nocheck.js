let html = `<div class="error">
    <div class="error__ico"></div>
    <div class="error__body">
        <div class="error__title">{title}</div>
        <div class="error__text">{text}</div>
    </div>
</div>

<div class="torrent-error noconnect">
    <div>
        <div data-i18n="torrent.error.nocheck">Причины</div>
        <ul>
            <li data-i18n="torrent.error.nocheck_1">Запрос на пинг вернул неверный формат</li>
            <li><span data-i18n="torrent.error.nocheck_2">Ответ от TorServer:</span> <code>{echo}</code></li>
        </ul>
    </div>

    <div>
        <div data-i18n="torrent.error.nocheck_todo">Что делать?</div>
        <ul>
            <li data-i18n="torrent.error.nocheck_todo_1">Убедитесь что у вас стоит версия Matrix</li>
        </ul>
    </div>

    <div>
        <div data-i18n="torrent.error.nocheck_check">Как проверить?</div>
        <ul>
            <li><span data-i18n="torrent.error.nocheck_check_1">Откройте браузер и зайдите по адресу</span> <code>{ip}/echo</code></li>
            <li><span data-i18n="torrent.error.nocheck_check_2">Убедитесь что в ответе есть наличие кода</span> <code>MatriX</code></li>
        </ul>
    </div>
</div>`

export default html