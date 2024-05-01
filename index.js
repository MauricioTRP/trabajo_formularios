const express = require('express')
const exphbs = require('express-handlebars')
const fs = require('fs/promises')
const app = express()

app.listen(3000, () => {
  console.log("Aplicación abierta en puerto 3000")
})

app.set ("view engine", "handlebars")
app.engine("handlebars", exphbs.engine())

app.get("/crear", (req, res) => {
  res.render("crear")
})

app.get("/leer", (req, res) => {
  res.render("leer")
})

app.get("/eliminar", (req, res) => {
  res.render("eliminar")
})

app.get("/renombrar", (req, res) => {
  res.render("renombrar")
})

// rutas para "manipular info"
app.get("/usuarios/crear", (req, res) => {
  const { nombre_archivo, contenido_archivo } = req.query
  // const nombre_archivo = req.query.nombre_archivo
  // const contenido_archivo = req.query.contenido_archivo

  fs.writeFile(
    './users/' + nombre_archivo + '.txt',
    contenido_archivo
  ).then(() => {
    res.send("Archivo creado con éxito")
  }).catch(err => {
    res.send("Problemas creando el archivo")
  })
})

app.get("/usuarios/leer", (req, res) => {
  // obtenemos nombre archivo de query Params
  const { nombre_archivo } = req.query

  fs.readFile("./users/" + nombre_archivo + ".txt", "utf-8")
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.send("Archivo no existe o corrupto")
    })
})

app.get("/usuarios/renombrar", (req, res) => {
  const { nombre_antiguo, nombre_nuevo } = req.query

  fs.rename(
    "./users/" + nombre_antiguo + ".txt",
    "./users/" + nombre_nuevo + ".txt",
  ).then(() => res.send("Archivo renombrado con éxito"))
  .catch(err => {
    res.send("Problemas al renombrar el archivo")
  })
})

app.get("/usuarios/eliminar", (req, res) => {
  const { nombre_archivo } = req.query

  fs.rm("./users/" + nombre_archivo + ".txt")
    .then(() => res.send("Archivo Eliminado"))
    .catch(err => res.send("Problemas al eliminar archivo"))
})