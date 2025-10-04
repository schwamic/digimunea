'use client'

import { useTextAnimation } from "@/app/_hooks/useTextAnimation"
import Header from "@/app/_components/Header"

export default function References() {
  const title = useTextAnimation(content.title)

  return (
    <>
      <Header title={title} />
      <main>
        Referenzen works!
      </main>
    </>
  )
}

const content = {
  title: [
      "referenzen",
      "r3ferenzen",
      "ref3renzen",
      "referenz3n",
      "r3fer3nzen",
      "r3ferenz3n",
      "refer3nz3n",
      "referen7en"
    ]
}

