import React from 'react'
import { Redirect } from 'react-router'
import { Home, Login, Signup, ForgotPassword, OtherPage, Strategies, Strategy } from './components'

module.exports = [
    {
        'path':'/',
        'component': Home,
        'exact': true,
        // 'private': true,
    },
    {
        'path':'/strategies',
        'component': Strategies,
        // 'private': true,
    },
    {
        'path':'/strategy/:id',
        'component': Strategy,
        // 'private': true,
    },
    {
        'path':'/search',
        'component': OtherPage
    },
    {
        'path':'/login',
        'component': OtherPage
    },
    {
        'path':'/signup',
        'component': Signup
    },
    {
        'path':'/forgot-password',
        'component': ForgotPassword
    },
]