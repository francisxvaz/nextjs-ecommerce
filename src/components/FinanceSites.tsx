import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function FinanceSites({name}:{name: string}) {
  return (
    <p className="flex gap-4">
        <Link
              href={`https://finance.yahoo.com/quote/${name}`}
              target="_blank"
            >
              <Image
                className="rounded-full"
                src="/finance-site/yahoo.png"
                alt="fin"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href={`https://www.tipranks.com/stocks/${name}`}
              target="_blank"
            >
              <Image
                src="/finance-site/tiprank.png" alt="tiprank"
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
        </p>
  )
}

export default FinanceSites