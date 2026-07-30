import { app } from './app.js'
import { env } from './utils/env.js'

app.listen(env.PORT, () => {
  console.info(`API disponible en http://localhost:${env.PORT}`)
})
