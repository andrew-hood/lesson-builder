import { getImagePath } from '@/utils/helper'
import Image from 'next/image'
import React from 'react'

interface Props {
  id: string
  name: string
  avatar: string
}

export function Avatar({ id, name, avatar }: Props) {
  return (
    <div className="flex items-center">
      <div>
        <Image
          className="inline-block h-9 w-9 rounded-full"
          src={getImagePath(id, avatar)}
          alt={name}
          width={36}
          height={36}
        />
      </div>
      <div className="ml-3">
        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
          Published by
        </p>
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {name}
        </p>
      </div>
    </div>
  )
}
