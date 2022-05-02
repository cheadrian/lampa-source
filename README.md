# Lampa
## i18next - translation

This version of Lampa source have i18next implemented to make translation easyer.

To generate or update translation files you can use:

    npm run start i18next

This will use [i18next-scanner](https://github.com/i18next/i18next-scanner) to create .json files inside *./public/locales*.

## Compilation

    npm install 

You can pack, rollup, babel, etc. with simple:

    npm run start

This will run gulp script from *gulpfile.js*

You can also generate files for different environements:

    npm run start [pack_webos,pack_tizen,pack_github,pack_plugins,test]

## Original description

Все исходники приложения **lampa**, всем желаюшим прошу до хаты :)

Приветствуется ваши идеи и правки в коде, сделаем вместе приложение еще лучше!

MSX версия тут: https://github.com/yumata/lampa

## Как запустить

Открываем CMD и запускаем команду `npm install`

Затем запускаем команду `npm run start`

Открывам браузер и вводим адрес `http://localhost:3000`
