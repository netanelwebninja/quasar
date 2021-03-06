import langEn from '../i18n/en-us'

export default {
  __installed: false,
  install ({ $q, Vue, lang }) {
    if (this.__installed) { return }
    this.__installed = true

    this.set = (lang = langEn) => {
      lang.set = this.set
      lang.getLocale = this.getLocale

      if ($q.i18n) {
        $q.i18n = lang
      }
      else {
        Vue.util.defineReactive($q, 'i18n', lang)
      }

      this.name = lang.lang
      this.lang = lang
    }

    this.set(lang)
  },

  getLocale () {
    let val =
      navigator.language ||
      navigator.languages[0] ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      navigator.systemLanguage

    if (val) {
      return val.toLowerCase()
    }
  }
}
