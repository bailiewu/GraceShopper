import express = require('express')
import User from '../models/user'
import Order from '../models/order'
import Product from '../models/product'
const router = express.Router()

router.put(
  '/login',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('request body', req.body)
    User.findOne({
      where: {
        name: req.body.name,
        password: req.body.password
      }
    })
      .then(user => {
        console.log('this is the user', user!.get())
        if (!user) {
          res.sendStatus(401)
        } else {
          console.log('Creating an order')
          console.log(`Here's the userId: `, user!.id)
          const userId: number = user.id
          console.log('now on line 25')
          console.log(`Here's the current session: `, req.session)
          if (req.session!.order) {
            const order = req.session!.order
            console.log('preparing to create orders')
            Order.addToCart(userId, order[0].id)
              .then(() => console.log('created first order'))
              .then(() => {
                for (let i = 1; i < order.length; i++) {
                  Order.addToCart(userId, order[i].id) //
                    .then(() => console.log(`Added order #${i}`))
                }
              })
              .then(() => (req.session!.order = []))
              .then(() =>
                console.log(
                  `req.session after loading orders\n${req.session!.toString()}`
                )
              )
              .then(() => res.send(user))
              .catch((e: Error) => console.log(`Some error happened\n${e}`))
          }
          res.send(user)
        }
      })
      .catch(next)
  }
)

export default router
