import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { format } from 'date-fns'
import { trpc } from '@/utils/trpc'
import { Button } from '../Button'

export function Table() {
  const [search, setSearch] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = trpc.getLessons.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          My lessons
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <label htmlFor="search-lesson" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search-lesson"
                id="search-lesson"
                className="w-full rounded-2xl border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search lessons"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Updated
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {status === 'loading' ? (
                <p>Loading...</p>
              ) : status === 'error' ? (
                <p>Error: {error.message}</p>
              ) : (
                <tbody className="divide-y divide-gray-200">
                  {data?.pages.map(({ items }) => (
                    <>
                      {items?.items
                        .filter((course) =>
                          course.title?.toLowerCase().includes(search)
                        )
                        .map((course) => (
                          <tr key={course.id} className="text-sm text-gray-900">
                            <td className="whitespace-nowrap py-4 pl-4 sm:pl-6 md:pl-0">
                              <img
                                src={course.image?.url}
                                alt={course.title}
                                className="h-20 w-32 bg-slate-300 object-cover"
                              />
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 font-medium">
                              {course.title}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3">
                              {!!course?.updated &&
                                format(new Date(course?.updated), 'dd/MM/yyyy')}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right sm:pr-6 md:pr-0">
                              <Button
                                variant="outline"
                                href={`/courses/${course.id}`}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              )}
            </table>
            {hasNextPage && (
              <div className="my-8 flex justify-center">
                <Button
                  onClick={fetchNextPage}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  Load more
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
