import React from 'react'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { Container } from '../Container'

export function Banner() {
  return (
    <div className="bg-blue-600">
      <Container className="py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-blue-800 p-2">
              <MegaphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">
                Sign in to create private lessons
              </span>
              <span className="hidden md:inline">
                This lesson was generated using free plan. Upgrade to remove
                this banner.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-indigo-50"
            >
              Sign up
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
