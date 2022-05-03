# Lampa
## i18next - translation

This version of Lampa source have i18next implemented to make translation easyer.

To generate or update translation files you can use:

    npm run start i18next

This will use [i18next-scanner](https://github.com/i18next/i18next-scanner) to create .json files inside *./public/locales*.

The english version of translation is done using automated procedure ([Google Translate - VSCode extension](https://marketplace.visualstudio.com/items?itemName=benshabatnoam.google-translate-ext)). Don't expect great quality of it even if there are some manual fixes.

After you generated the translation files, you can use the extension mentioned above on the JSON file with a help with a simple regex to match RU sentences and words between " ":

    (?<=: ".*)([а-яА-ЯёЁ].*)(?=")

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
