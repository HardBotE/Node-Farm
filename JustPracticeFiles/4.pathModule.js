const path=require('path')

console.log(path)

const filePath=path.join('Folder','SubFolder','SubSubFolder','SubSubSubFolder','kifogas.txt')

const base=path.basename(filePath)

const absolute=path.resolve(__dirname,'Folder','SubFolder','SubSubFolder','SubSubSubFolder','kifogas.txt')

console.log(absolute)