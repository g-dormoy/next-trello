import netlifyIdentity from 'netlify-identity-widget'

export default {
    isAuthenticated: false,
    user: null,
    initialize(callback) {
        window.netlifyIdentity = netlifyIdentity
        netlifyIdentity.on('init', (user) => {
            callback(user)
        })
        netlifyIdentity.init()
    },
    authenticate(callback) {
        this.isAuthenticated = true
        netlifyIdentity.open()
        netlifyIdentity.on('login', (user) => {
            this.user = user
            callback(user)
            netlifyIdentity.close()
        })
    },
    signout(callback) {
        this.isAuthenticated = false
        netlifyIdentity.logout()
        netlifyIdentity.on('logout', () => {
            this.user = null
            callback()
        })
    },
}
