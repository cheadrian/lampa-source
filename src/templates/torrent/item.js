let html = `<div class="torrent-item selector">
    <div class="torrent-item__title">{title}</div>
    <div class="torrent-item__details">
        <div class="torrent-item__date">{date}</div>
        <div class="torrent-item__tracker">{tracker}</div>

        <div class="torrent-item__bitrate bitrate"><span data-i18n="torrent.item.bitrate">Битрейт:</span> <span>{bitrate} <span data-i18n="torrent.item.speed">Мб/с</span></span></div>
        <div class="torrent-item__seeds"><span data-i18n="torrent.item.seeds">Раздают:</span> <span>{seeds}</span></div>
        <div class="torrent-item__grabs"><span data-i18n="torrent.item.grabs">Качают:</span> <span>{grabs}</span></div>
        
        <div class="torrent-item__size">{size}</div>
    </div>
</div>`

export default html