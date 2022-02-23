import  'dotenv/config'
export const BITLY_TOKEN = process.env.BITLY_TOKEN
export const NODE_ENV = process.env.NODE_ENV
export const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.LOCAL_DB
export const PRODUCTION_URL = process.env.PRODUCTION_URL