const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

app.use('/img', express.static(path.join(__dirname, '../img')))

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Main</title>
    </head>
    <body>
      <a href="/preload">Preload</a>
      <a href="/non-preload">Non-Preload</a>
    </body>
  </html>
  `)
  res.end()
})

app.get('/preload', (req, res) => {
  fs.readFile(path.join(__dirname, '../preload.html'), (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write('hello')
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    }
  })
})

app.get('/non-preload', (req, res) => {
  fs.readFile(path.join(__dirname, '../non_preload.html'), (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write('hello')
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    }
  })
})

app.listen(8080, () => {
  console.log('Server started')
})
