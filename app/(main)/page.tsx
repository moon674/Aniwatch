'use client'
import { useRef, useState } from 'react'
import { easeInOut, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from '@tanstack/react-query';
import { getAnimeSearchSuggestions } from '@/services/aniwatch/api';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@nextui-org/react';
import { Icon, SearchCard, ThemeSwitcher, } from '@/components'

export default function Home() {
	const { scrollY } = useScroll()
    const [isOpen, setOpen] = useState(true)
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 1000)
    const { data: searchResults, isLoading } = useQuery({ queryKey: [`search-${debouncedSearch}`], queryFn: () => getAnimeSearchSuggestions(debouncedSearch), enabled: !!debouncedSearch && debouncedSearch !== '' })
    const router = useRouter()

    const inputRef = useRef<HTMLInputElement>(null)

    const onFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (search !== '') {
            {
                router.push(`/search?q=${search}`)
                setSearch('')
                inputRef.current?.blur()
                setOpen(false)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
  return (
    <>
    <div className="min-h-screen bg-slate-900">
  <div className="bg-slate-900 min-h-[86vh] container max-w-screen-md px-4 mx-auto sm:px-8">
    <div className="mx-auto pt-32 text-center text-white">
        <div className="text-4xl">
          <h1 className="font-bold">Aniwatch - Watch Free Anime Series and Movies Online</h1>
        </div>
    </div>
    
    <div className="text-center mt-12"><a href="https://blog.mypurtech.com/" target="_blank" className="px-4 py-3 m-5 text-lg font-bold text-white no-underline bg-blue-600 rounded-lg">» Visit Aniwatch</a></div>
    
    <motion.div
                        animate={isOpen ? "open" : "close"}
                        initial="close"
                        className='rounded-lg mt-10 p-5 flex flex-col items-center  bg-card border-primary h-full'>
                        <form onSubmit={onFormSubmit} className='flex flex-wrap justify-center w-full p-3 rounded-lg md:flex-nowrap bg-slate-800'>
                            <input
                                ref={inputRef}
                                name="search"
                                className='relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input   text-base px-3.5 py-2.5 shadow-sm bg-gray-900  text-white ring-inset  ring-gray-700 focus:ring-primary-400 rounded-lg md:rounded-r-none ring-0 focus:ring-0  selection:bg-slate-700 placeholder-gray-100'
                                placeholder='Search anime...'
                                value={search}
                                onChange={handleChange}
                            />
                        </form>
                        {isOpen && <div className='flex my-2 flex-col justify-center'>
                            {isLoading
                                ? <div className='w-full h-full flex items-center justify-center'><CircularProgress aria-label="Loading..." /></div>
                                : (!searchResults
                                    ? ""
                                    : (searchResults?.suggestions.length === 0
                                        ? <div className='ml-5 text-foreground text-sm'>No results!</div>
                                        : <div className='w-full my-5 h-full'>
                                            {searchResults?.suggestions.map((anime, index) => <SearchCard key={index} anime={anime} />)}
                                        </div>))}
                        </div>}
                    </motion.div>
    
    <div className="py-8">
      <main className="container max-w-screen-md px-4 mx-auto sm:px-8">
        <div className="p-6 my-6 shadow-md bg-slate-800 rounded-xl md-content">
          <div className="prose text-white">
            <p>
              Explore <strong className="text-blue-600">Aniwatch</strong>, the best platform to stream anime online. Enjoy a vast collection of anime series and movies in high quality, with subtitles and dubs. Aniwatch is your ultimate anime streaming solution!
            </p>
            
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
    </>
  );
}
