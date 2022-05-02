let html = `<div class="error">
    <div class="error__ico"></div>
    <div class="error__body">
        <div class="error__title">{title}</div>
        <div class="error__text">{text}</div>
    </div>
</div>

<div class="torrent-error noconnect">
    <div>
        <div data-i18n="torrent.error.nohash_cause">Причины</div>
        <ul>
            <li data-i18n="torrent.error.nohash_cause_1">TorServer не смог скачать торрент файл</li>
            <li><span data-i18n="torrent.error.nohash_cause_2">Ответ от TorServer:</span> {echo}</li>
            <li><span data-i18n="torrent.error.nohash_cause_3">Ссылка:</span> <code>{url}</code></li>
        </ul>
    </div>

    <div class="is--jackett">
        <div data-i18n="torrent.error.nohash_whatto">Что делать?</div>
        <ul>
            <li data-i18n="torrent.error.nohash_whatto_1">Проверьте правильно ли вы настроили Jackett</li>
            <li data-i18n="torrent.error.nohash_whatto_2">Приватные источники могут не выдавать ссылку на файл</li>
            <li data-i18n="torrent.error.nohash_whatto_3">Убедитесь что Jackett тоже может скачать файл</li>
        </ul>
    </div>

    <div class="is--torlook">
        <div data-i18n="torrent.error.nohash_whatto">Что делать?</div>
        <ul>
            <li data-i18n="torrent.error.nohash_whatto_4">Написать в нашу телеграм группу: @lampa_group</li>
            <li data-i18n="torrent.error.nohash_whatto_5">Укажите какой фильм, какая раздача и по возможности фото этой разадачи</li>
        </ul>
    </div>
</div>`

export default html