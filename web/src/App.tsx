import { useEffect, useState } from "react"
import axios from "axios"
import * as Dialog from '@radix-ui/react-dialog'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { CreateAdBanner } from "./components/CreateAdBanner"
import { GameBanner } from "./components/GameBanner"

import './styles/main.css'

import logoImage from './assets/logo-nlw-esports.svg'
import { CreateAdModal } from "./components/CreateAdModal"

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 5,
      spacing: 15,
    },

  })

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImage} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div ref={sliderRef} className="keen-slider">
        {games.map(game => {
          return (
            <div className="keen-slider__slide">
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </div>
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
