import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { CheckIcon } from '@heroicons/react/24/outline'

interface Props {
  choices: string[]
  answer: string
  onSelect: (value: string) => void
}

export function MultipleChoice({ choices, answer, onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    console.log(selected)
  }, [selected])

  const handleOnChange = (value: string) => {
    setSelected(value)
    onSelect(value)
  }

  return (
    <RadioGroup value={selected} onChange={handleOnChange}>
      <RadioGroup.Label className="sr-only"> Privacy setting </RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {choices.map((choice, index) => (
          <RadioGroup.Option
            key={index}
            value={choice}
            className={({ checked }) =>
              clsx(
                index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                index === choices.length - 1
                  ? 'rounded-bl-md rounded-br-md'
                  : '',
                checked
                  ? choice === answer
                    ? 'z-10 border-green-200 bg-green-50'
                    : 'z-10 border-red-200 bg-red-50'
                  : 'border-gray-200',
                'relative flex cursor-pointer border p-4 focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={clsx(
                    checked
                      ? choice === answer
                        ? 'border-transparent bg-green-600'
                        : 'border-transparent bg-red-600'
                      : 'border-gray-300 bg-white',
                    'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border'
                  )}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={clsx(
                      checked
                        ? choice === answer
                          ? 'text-green-900'
                          : 'text-red-900'
                        : 'text-gray-900',
                      'block text-sm font-medium'
                    )}
                  >
                    {choice}
                  </RadioGroup.Label>
                  {/* {checked && choice === answer && (
                    <CheckIcon className="h-5 w-5" />
                  )} */}
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
