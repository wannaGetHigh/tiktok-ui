import { Fragment } from 'react'

import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Search from '~/pages/Search'
import User from '~/pages/User'
import { HeaderOnly } from '~/layouts'
import config from '~/config'

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.user, component: User },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: Fragment },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
