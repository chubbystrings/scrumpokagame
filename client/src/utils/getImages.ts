import {KEY } from '../types/types'

export const  getImages  = (key: KEY) => {
    const obj: Record<KEY, string> = {
        spades: '/images/spades.png',
        hearts: '/images/hearts.png',
        clubs: '/images/clubs.png',
        diamond: '/images/diamond.png'
    }

    return obj[key]
}