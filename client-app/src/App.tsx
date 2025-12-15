import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './router'

const App = (): JSX.Element => {
  return (
    <div>
      <Header />
      <main className="container">
        <Router />
      </main>
      <Footer />
    </div>
  )
}

export default App
