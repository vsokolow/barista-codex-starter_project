import { promises as fs } from 'fs'
import path from 'path'
import { type Bean } from '../types/beans'

const DATA_DIR = path.join(process.cwd(), 'data', 'beans')

async function readBean(fullPath: string): Promise<Bean> {   // не экспортируется = private
  return JSON.parse(await fs.readFile(fullPath, 'utf-8')) as Bean
}

export async function findAll(): Promise<Bean[]> {
  const files = await fs.readdir(DATA_DIR)
  return Promise.all(files.filter(f => f.endsWith('.json')).map(f => readBean(path.join(DATA_DIR, f))))
}

export async function findById(id: string): Promise<Bean | null> {
  return (await findAll()).find(b => b.id === id) ?? null
}