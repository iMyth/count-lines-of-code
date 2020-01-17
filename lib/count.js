let excludeExt = /\.(png|jpe?g|gif|svg)(\?.*)?$/
let fs = require('fs')
let path = require('path')
let i
let count = 0
let _getAllFilesFromFolder = function (dir) {
  let filesystem = require('fs')
  let results = []

  filesystem.readdirSync(dir).forEach(function (file) {
    file = dir + '/' + file
    let stat = filesystem.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
    } else {
      if (excludeExt.test(file)) {
        return
      }
      results.push(file)
    }
  })
  return results
}

function readFiles (dir, onFinished, onError) {
  let length = _getAllFilesFromFolder(dir).length
  let counted = 0
  _getAllFilesFromFolder(dir).forEach(function (filename) {
    fs.createReadStream(filename)
    .on('data', function (chunk) {
      for (i = 0; i < chunk.length; ++i) {
        if (chunk[i] === 10) count++
      }
    })
    .on('end', function () {
      counted++
      if (counted === length) {
        onFinished(count)
      }
    })
  })
}
const startCount = (dir = '', onFinished, ext) => {
  if (Object.prototype.toString.call(ext) === '[object RegExp]') {
    excludeExt = ext
  }
  if (typeof ext === 'string') {
    excludeExt = new new RegExp(ext)
  }
  readFiles(path.resolve(process.cwd(), dir), onFinished, err => console.log(err))
}

exports.count = startCount
