let html = `<div>
    <div class="settings-param selector is--player" data-type="toggle" data-name="player">
        <div class="settings-param__name" data-i18n="settings.player.player_name">Тип плеера</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.player.player_descr">Каким плеером воспроизводить</div>
    </div>
    
    <div class="settings-param selector is--android" data-type="button" data-name="reset_player" data-static="true">
        <div class="settings-param__name" data-i18n="settings.player.reset_player_name">Сбросить плеер по умолчанию</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.player.reset_player_descr">Сбрасывает выбранный Android плеер в приложении</div>
    </div>
    
    <div class="settings-param selector" data-type="toggle" data-name="playlist_next">
        <div class="settings-param__name" data-i18n="settings.player.playlist_next_name">Следующая серия</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.player.playlist_next_descr">Автоматически переключать на следующую серию по окончании текущей</div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="player_timecode">
        <div class="settings-param__name" data-i18n="settings.player.player_timecode_name">Таймкод</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.player.player_timecode_descr">Продолжить с последнего места просмотра</div>
    </div>

    <div class="settings-param selector" data-type="toggle" data-name="player_scale_method">
        <div class="settings-param__name" data-i18n="settings.player.player_scale_method_name">Метод масштабирования</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.player.player_scale_method_descr">Каким образом производить вычисления для масштабирования видео</div>
    </div>
    
    <div class="is--has_subs">
        <div class="settings-param-title"><span data-i18n="settings.player.subtitle">Субтитры</span></div>

        <div class="settings-param selector" data-type="toggle" data-name="subtitles_start">
            <div class="settings-param__name" data-i18n="settings.player.subtitles_start_name">Включить</div>
            <div class="settings-param__value"></div>
            <div class="settings-param__descr" data-i18n="settings.player.subtitles_start_descr">Всегда включать субтитры после запуска видео</div>
        </div>

        <div class="settings-param selector" data-type="toggle" data-name="subtitles_size">
            <div class="settings-param__name" data-i18n="settings.player.subtitles_size_name">Размер</div>
            <div class="settings-param__value"></div>
            <div class="settings-param__descr"></div>
        </div>
        
        <div class="settings-param selector" data-type="toggle" data-name="subtitles_stroke">
            <div class="settings-param__name" data-i18n="settings.player.subtitles_stroke_name">Использовать окантовку</div>
            <div class="settings-param__value"></div>
            <div class="settings-param__descr" data-i18n="settings.player.subtitles_stroke_descr">Субтитры будут обведены черным цветом для улучшения читаемости</div>
        </div>
        
        <div class="settings-param selector" data-type="toggle" data-name="subtitles_backdrop">
            <div class="settings-param__name" data-i18n="settings.player.subtitles_backdrop_name">Использовать подложку</div>
            <div class="settings-param__value"></div>
            <div class="settings-param__descr" data-i18n="settings.player.subtitles_backdrop_descr">Субтитры будут отображаться на полупрозрачной подложке для улучшения читаемости</div>
        </div>
    </div>

    <div class="settings-param-title"><span data-i18n="settings.player.others">Еще</span></div>

    <div class="settings-param selector" data-type="toggle" data-name="video_quality_default">
        <div class="settings-param__name" data-i18n="settings.player.video_quality_default_name">Качество видео по умолчанию</div>
        <div class="settings-param__value"></div>
        <div class="settings-param__descr" data-i18n="settings.player.video_quality_default_descr">Предпочтительное качество видео для просмотра</div>
    </div>
</div>`

export default html