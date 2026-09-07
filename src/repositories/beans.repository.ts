import { promises as fs } from 'fs'
import path from 'path'
import { type Bean } from '../types/beans'

const DATA_DIR = path.join(process.cwd(), 'data', 'beans')

// ======== GET =========

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

// ======== CREATE =========

export async function create(bean: Bean): Promise<Bean> {
  const fullPath = path.join(DATA_DIR, `${bean.id}.json`)
  await fs.writeFile(fullPath, JSON.stringify(bean, null, 2), 'utf-8')
  return bean
}

async function findFileById(id: string): Promise<string | null> { // не экспортируется = private
  const files = await fs.readdir(DATA_DIR)
  for (const f of files) {
    if (!f.endsWith('.json')) continue
    const fullPath = path.join(DATA_DIR, f)
    const bean = await readBean(fullPath)
    if (bean.id === id) return fullPath
  }
  return null
}

// ======== UPDATE =========

export async function update(id: string, bean: Bean): Promise<Bean | null> {
  const fullPath = await findFileById(id)
  if (!fullPath) return null
  await fs.writeFile(fullPath, JSON.stringify(bean, null, 2), 'utf-8')
  return bean
}

// ======== DELETE =========

export async function remove(id: string): Promise<boolean> {
  const fullPath = await findFileById(id)
  if (!fullPath) return false
  await fs.unlink(fullPath)
  return true
}

