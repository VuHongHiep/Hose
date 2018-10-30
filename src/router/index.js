import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Help from '../components/Help'
import About from '../components/About'
import Contact from '../components/Contact'
import Index from '../components/users/Index'
import New from '../components/users/New'
import Login from '../components/users/Login'
import Show from '../components/users/Show'
import Edit from '../components/users/Edit'
import Profile from '../components/users/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/users',
      name: 'Index',
      component: Index
    },
    {
      path: '/users/signup',
      name: 'SignUp',
      component: New
    },
    {
      path: '/users/login',
      name: 'LogIn',
      component: Login
    },
    {
      path: '/users/:id',
      name: 'Show',
      component: Show
    },
    {
      path: '/users/:id/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/users/:id/following',
      name: 'Following',
      component: Profile,
      props: {'title': 'following'}
    },
    {
      path: '/users/:id/follower',
      name: 'Follower',
      component: Profile,
      props: {'title': 'follower'}
    }
  ]
})
