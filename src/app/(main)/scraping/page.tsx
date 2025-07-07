"use client"
import axios from 'axios'
import React from 'react'

export default function Scraper() {
    const scrapeData = async () => {
        const response = await axios.post('/api/scraper', {});
        console.log(response.data)
    }
    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-72px)]'>
            <button onClick={scrapeData} className='p-4 bg-emerald-400 cursor-pointer border-2'>Actualizar datos</button>
        </div>
    )
}
