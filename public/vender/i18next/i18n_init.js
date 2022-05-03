/*
 * Regex to select RU on .json file: (?<=: ".*)([а-яА-ЯёЁ].*)(?=")
 * Regex to find RU in files (?<=['">])([а-яА-ЯёЁ].*?)(?=['"<])
 */

const lngs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' }
};

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();
  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(i18nextHttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      load: 'languageOnly',
      saveMissing: false,
      preload:['en']
    }, (err, t) => {
      if (err) {
        $('body').append('<div style="margin: 15px;color: white;z-index: 999;position: absolute;">Error loading translation: i18next init.</div>');
        return console.error(err);
      }

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: false, parseDefaultValueFromContent: true });

      $('body').append('<script id="lampa-app" src="app.js"></script>');
      
      // fill language switcher
      Object.keys(lngs).map((lng) => {
        const opt = new Option(lngs[lng].nativeName, lng);
        if (lng === i18next.resolvedLanguage) {
          opt.setAttribute("selected", "selected");
        }
        $('#languageSwitcher').append(opt);        
      });
      $('#languageSwitcher').change((a, b, c) => {
        const chosenLng = $(this).find("option:selected").attr('value');
        i18next.changeLanguage(chosenLng, () => {
          localStorage.removeItem("activity");
          location.reload();
          //$('#lampa-app').remove();
          //$('body').append('<script id="lampa-app" src="app.js"></script>');
          //Lampa.Activity.replace()
          rerender();
        });
      });

      rerender();
    });
});

//Wait for translation to load
//while(!i18next.isInitialized) {
    //Nothing
//}

//$(function(){
  //setInterval(()=> $("body").localize(), 250);
//});

//$("body").on("hover:enter", function(){ $(this).localize() });

//Observe changes in DOM using MutationObserver, bind class to localize
$(function(){
const targetNode = document.getElementsByTagName('body')[0];
const config = { attributes: true, childList: false, subtree: false };
//var lang_filled = false;
const callback = function(mutationsList, observer) {
  /*if(!lang_filled){
  *  const someDiv = document.getElementById('languageSwitcher');
  *  if(someDiv !== null)
  *  {
  *    lang_filled = true;
  *    
  *  }
  }*/
  for(const mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      if(mutation.attributeName === 'class'){
        $("body").localize();
      }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
})