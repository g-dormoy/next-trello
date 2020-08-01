import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import netlifyAuth from './netlifyAuth.js'


export default function Home() {
    let [user, setUser] = useState(null)
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)

    useEffect(() => {
        let isCurrent = true
        netlifyAuth.initialize((user) => {
            if (isCurrent) {
                setLoggedIn(!!user)
            }
        })

        return () => {
            isCurrent = false
        }
    })

    let login = () => {
        netlifyAuth.authenticate((user) => {
            setLoggedIn(!!user)
            setUser(user)
            netlifyAuth.closeModal()
        })
    }

    let logout = () => {
        netlifyAuth.signout(() => {
            setLoggedIn(false)
            setUser(null)
        })
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          {loggedIn ? (
              <div>
                  You are logged in!
                  {user && <>Welcome {user?.user_metadata.full_name}!</>}

                  <button onClick={logout}>
                      Log-out here.
                  </button>
              </div>
          ) : (
              <button onClick={login}>
                  Log in here.
              </button>
          )}
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
