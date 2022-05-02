let html = `<div class="card-parser selector">
    <div class="card-parser__title">{Title}</div>

    <div class="card-parser__footer">
        <div class="card-parser__details">
            <div data-i18n="card_parser.handing_out">Раздают: <span>{Seeders}</span></div>
            <div data-i18n="card_parser.pumping">Качают: <span>{Peers}</span></div>
        </div>
        <div class="card-parser__size">{size}</div>
    </div>
</div>`

export default html