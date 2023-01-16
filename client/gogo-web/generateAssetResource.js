console.log('Generating...')
var fs = require('fs')

function genStringResource() {
  try {
    const data = JSON.parse(fs.readFileSync('./src/locales/vi_VN.json', 'utf8'))
    console.log(
      '🚀 ~ file: generateAssetResource.js ~ line 7 ~ genStringResource ~ data',
      data
    )
    const stringName = Object.keys(data)

    fs.writeFileSync(
      './src/utils/strings.ts',
      `import i18n from '../locales'
      function strings(){
    return{${stringName.map((string, index) => {
      var path = ''
      const reg = /\./g
      if (typeof data[string] === 'string') {
        path = `
        ${string
          .toString()
          .replace(reg, '__')}: i18n.t("${string}", { defaultValue: "" })`
      } else {
        var keys = Object.keys(data[string])
        keys.map((val) => {
          path += `
          ${string}_${val}: i18n.t("${string}.${val}",{ defaultValue: "" }),`
        })
      }
      return path
    })}
}}
export default strings
        `
    )
    console.log(
      `============== Linked ${stringName.length} string ==============`
    )
  } catch (err) {
    console.error(err)
  }
}

genStringResource()
