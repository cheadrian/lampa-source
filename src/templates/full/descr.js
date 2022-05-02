let html = `<div class="full-descr">
    <div class="full-descr__left">
        <div class="full-descr__text">{text}</div>

        <div class="full-descr__line full--genres">
            <div class="full-descr__line-name" data-i18n="full.descr.name_genres">Жанр</div>
            <div class="full-descr__line-body">{genres}</div>
        </div>

        <div class="full-descr__line full--companies">
            <div class="full-descr__line-name" data-i18n="full.descr.name_companies">Производство</div>
            <div class="full-descr__line-body">{companies}</div>
        </div>
    </div>

    <div class="full-descr__right">
        <div class="full-descr__info">
            <div class="full-descr__info-name" data-i18n="full.descr.name_relise">Дата релиза</div>
            <div class="full-descr__info-body">{relise}</div>
        </div>

        <div class="full-descr__info">
            <div class="full-descr__info-name" data-i18n="full.descr.name_budget">Бюджет</div>
            <div class="full-descr__info-body">{budget}</div>
        </div>

        <div class="full-descr__info">
            <div class="full-descr__info-name" data-i18n="full.descr.name_countries">Страны</div>
            <div class="full-descr__info-body">{countries}</div>
        </div>
    </div>
</div>`

export default html