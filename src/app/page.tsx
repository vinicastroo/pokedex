'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import logoPokedex from '../assets/logo-pokedex.png'
import api from '@/services/api'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Logo } from '@/assets/logo'
import {
  BugIcon,
  DarkIcon,
  DragonIcon,
  ElectricIcon,
  FairyIcon,
  FightingIcon,
  FireIcon,
  FlyingIcon,
  GhostIcon,
  GrassIcon,
  GroundIcon,
  IceIcon,
  NormalIcon,
  PoisonIcon,
  PsychicIcon,
  RockIcon,
  SteelIcon,
  WaterIcon,
} from '@/assets/typesIcons'

interface SpritesProps {
  other: {
    'official-artwork': {
      front_default: string
    }
  }
}

interface PokemonProps {
  id: number
  name: string
  nameJP: string
  bio: string
  height: number
  weight: number

  sprites: SpritesProps
  types: string[]
}
function Type({ type }: { type: string }) {
  if (type === 'bug') {
    return <BugIcon />
  }
  if (type === 'dark') {
    return <DarkIcon />
  }
  if (type === 'dragon') {
    return <DragonIcon />
  }
  if (type === 'electric') {
    return <ElectricIcon />
  }
  if (type === 'fairy') {
    return <FairyIcon />
  }
  if (type === 'fighting') {
    return <FightingIcon />
  }
  if (type === 'fire') {
    return <FireIcon />
  }
  if (type === 'flying') {
    return <FlyingIcon />
  }
  if (type === 'ghost') {
    return <GhostIcon />
  }
  if (type === 'grass') {
    return <GrassIcon />
  }
  if (type === 'ground') {
    return <GroundIcon />
  }
  if (type === 'ice') {
    return <IceIcon />
  }
  if (type === 'normal') {
    return <NormalIcon />
  }
  if (type === 'poison') {
    return <PoisonIcon />
  }
  if (type === 'psychic') {
    return <PsychicIcon />
  }
  if (type === 'rock') {
    return <RockIcon />
  }
  if (type === 'steel') {
    return <SteelIcon />
  }
  if (type === 'water') {
    return <WaterIcon />
  }
}
export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonProps | null>(null)
  const [loading, setLoading] = useState(true)

  const [numberPokemon, setNumberPokemon] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(1)

  const size = 10

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true)
      const response = await api.get(`/pokemon/${numberPokemon}`)
      const responseLanguages = await api.get(
        `/pokemon-species/${numberPokemon}`,
      )

      if (response && responseLanguages) {
        const flavorTexts = responseLanguages.data.flavor_text_entries

        const englishFlavorText = flavorTexts.find(
          (flavor: { language: { name: string } }) =>
            flavor.language.name === 'en',
        )

        setPokemon({
          ...response.data,
          nameJP: responseLanguages.data.names[0].name,
          bio: englishFlavorText.flavor_text,
          types: response.data.types.map(
            (type: { type: { name: string } }) => type.type.name,
          ),
        })
      }
      setLoading(false)
    }

    loadPokemon()
  }, [numberPokemon])

  const currentColor = useMemo(() => {
    if (pokemon) {
      switch (pokemon.types[0]) {
        case 'normal':
          return 'bg-zinc-300'
        case 'fire':
          return 'bg-red-500'
        case 'water':
          return 'bg-sky-300'
        case 'electric':
          return 'bg-yellow-300'
        case 'grass':
          return 'bg-green-400'
        case 'ice':
          return 'bg-cyan-100'
        case 'fighting':
          return 'bg-orange-400'
        case 'poison':
          return 'bg-purple-500'
        case 'ground':
          return 'bg-orange-300'
        case 'flying':
          return 'bg-sky-200'
        case 'psychic':
          return 'bg-rose-500'
        case 'bug':
          return 'bg-lime-400'
        case 'rock':
          return 'bg-stone-300'
        case 'ghost':
          return 'bg-fuchsia-950'
        case 'dragon':
          return 'bg-indigo-400'
        case 'dark':
          return 'bg-violet-400'
        case 'steel':
          return 'bg-zinc-400'
        case 'fairy':
          return 'bg-pink-500'
        default:
          return 'bg-slate-500'
      }
    }

    return 'bg-slate-500'
  }, [pokemon])

  const pages = useMemo(() => {
    const pages = []
    const maxPages = currentIndex + size
    for (let i = currentIndex; i <= maxPages; i++) {
      pages.push(i)
    }

    return pages
  }, [currentIndex, size])

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, repeatDelay: 1 }}
        >
          <Logo />
        </motion.div>
      </div>
    )
  }
  return (
    <div className={`h-full min-h-screen w-full ${currentColor} p-4 lg:p-12`}>
      {pokemon && (
        <>
          <div className="flex w-full flex-col-reverse items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-row items-center gap-4 space-y-1 text-white">
              <strong className="text-xl">#{pokemon.id}</strong>
              <strong className="text-4xl capitalize">{pokemon.name}</strong>
            </div>

            <Image src={logoPokedex} width={175} height={60} alt="" />
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="relative flex flex-col-reverse lg:flex-row lg:items-end">
              <h1 className="absolute top-0 whitespace-nowrap text-6xl font-bold text-white opacity-80 lg:text-[150px]">
                {pokemon.nameJP}
              </h1>
              <div className="mt-8 flex flex-1 flex-col space-y-2">
                <span className="text-white">
                  Height: {pokemon.height / 10} M
                </span>
                <span className="text-white">
                  Weight: {Math.round(pokemon.weight * 0.1)} KG
                </span>
              </div>

              <div>
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  width={500}
                  height={400}
                  className="lg:h-400 lg:w-500 h-120 w-90"
                  alt={pokemon.name}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                {pokemon.types.map((type, index) => (
                  <Type key={index} type={type} />
                ))}
              </div>

              <div>
                <strong className="text-white">Bio</strong>
                <p className="text-white">{pokemon.bio}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 lg:flex-col  ">
              <button
                onClick={() => {
                  if (numberPokemon - 1 >= 1) {
                    setNumberPokemon(numberPokemon - 1)
                  }
                  if (currentIndex - 1 >= 1) {
                    setCurrentIndex(currentIndex - 1)
                  }
                }}
                className="cursor-pointer rounded-md px-4 py-2 hover:bg-black hover:opacity-80"
              >
                <ChevronLeft size={24} className="text-white lg:hidden" />
                <ChevronUp size={24} className="hidden text-white lg:inline" />
              </button>

              {pages.map((number) => (
                <button
                  key={number}
                  onClick={() => setNumberPokemon(number)}
                  className={`hidden w-full rounded-md bg-white px-4 py-2 text-slate-800 hover:opacity-85 lg:visible ${
                    number === numberPokemon && 'bg-slate-500 font-bold'
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => {
                  setNumberPokemon(numberPokemon + 1)
                  setCurrentIndex(currentIndex + 1)
                }}
                className=" cursor-pointer rounded-md px-4  py-2 hover:bg-black hover:opacity-80"
              >
                <ChevronRight size={24} className="text-white lg:hidden" />
                <ChevronDown
                  size={24}
                  className="hidden text-white lg:inline"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
