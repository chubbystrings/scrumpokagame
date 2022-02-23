import mongoose from 'mongoose';
import { DATABASE_URL } from '../env'

export const connectToDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL as string);
        console.log('connected to db')
      } catch (error) {
        console.log(error)
      }
}