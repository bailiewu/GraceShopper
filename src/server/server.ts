import app from './app'
import conn from './db'

const PORT = process.env.PORT || 3000

conn
  .authenticate()
  .then(() => {
    console.log('DB Connected.')
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...\n`))
  })
  .catch((e: Error) => {
    console.log('Failed to start server or db.', e)
  })
