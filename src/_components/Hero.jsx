import React from 'react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="mx-auto px-16 py-24">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-2 lg:gap-8">
          <div
            className="flex flex-col justify-center"
          >
            <h1
              className="text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-300 sm:text-5xl lg:text-6xl"
            >
              Streamline Your Business with Our ERP Solution
            </h1>
            <p
              className="mt-4 text-xl text-gray-600 dark:text-gray-300"
            >
              Integrate, automate, and optimize your business processes with our cutting-edge ERP system.
            </p>
            <div
              className="mt-8 flex flex-wrap gap-4"
            >
              <a  href='/login' className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </a>
              <a href='/login' className="px-6 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-950">
                Sign in
              </a>
            </div>
            <div
              className="relative mt-5"
            >
              <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg">
                <img
                  src="/static/images/logo.png"
                  alt="ERP Dashboard"
                  width={1000}
                  height={600}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/40 mix-blend-multiply dark:from-blue-400/20 dark:to-purple-400/40" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-blue-400/20 dark:bg-blue-400/40"

              />
              <div
                style={{ position: 'absolute', top: '-1.5rem', right: '-1.5rem', height: '8rem', width: '8rem', borderRadius: '50%', backgroundColor: 'rgba(128, 0, 128, 0.3)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero