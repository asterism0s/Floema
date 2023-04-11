require('dotenv').config()

const express = require('express')

const app = express()
const path = require('path')
const port = 3000

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  })
}

const handleLinkResolver = doc => {
  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid
  // } else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid
  // }
  return '/'
}

app.use((req, res, next) => {
  // res.locals.ctx = {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   linkResolver: handleLinkResolver
  // }

  res.locals.Links = handleLinkResolver

  res.locals.Numbers = index => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }

  res.locals.PrismicDOM = PrismicDOM

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/home', (req, res) => {
  initApi(req).then(api => {
    api.query(
      Prismic.Predicates.any('document.type', ['meta', 'home'])).then(response => {
      const { results } = response
      const [home, meta] = results

      res.render('pages/home', {
        meta,
        home
      })
    })
  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const meta = await api.getSingle('meta')
  const about = await api.getSingle('about')

  res.render('pages/about', {
    about,
    meta
  })
})

app.get('/collections', async (req, res) => {
  const api = await initApi(req)
  const meta = await api.getSingle('meta')
  const home = await api.getSingle('home')
  const { results: collections } = await api.query(Prismic.Predicates.at('document.type', 'collection'), {
    fetchLinks: 'product.image'
  })

  res.render('pages/collections', {
    collections,
    home,
    meta
  })
})

app.get('/detail/:uid', async (req, res) => {
  const api = await initApi(req)
  const meta = await api.getSingle('meta')
  const product = await api.getByUID('product', req.params.uid, {
    fetchLinks: 'collection.title'
  })

  res.render('pages/detail', {
    meta,
    product
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
