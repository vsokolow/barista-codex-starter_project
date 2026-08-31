import { v4 as uuidv4 } from 'uuid'
import { type Bean, type Recipe } from '../types/beans'
import * as repo from '../repositories/beans.repository'

// ===== GET =====

export const getAll = () => repo.findAll()

export async function getById(id: string): Promise<Bean> {
  const bean = await repo.findById(id)
  if (!bean) throw new Error('NOT_FOUND')
  return bean
}

// ===== CREATE =====

// House Standard: два дефолтных рецепта, если бариста не указал свои
function buildDefaultRecipes(): Recipe[] {
  return [
    {
      id: uuidv4(),
      method: 'V60',
      grindSize: 'EK43 - 8.5',
      waterTemp: 96,
      doseIn: 18,
      doseOut: 300,
      timeTotal: '3:00',
      steps: ['0:00 - Bloom 60g', '0:45 - Pour to 300g'],
    },
    {
      id: uuidv4(),
      method: 'Espresso',
      grindSize: 'Mythos - 3.8',
      waterTemp: 93,
      doseIn: 18,
      doseOut: 36,
      timeTotal: '28s',
      steps: [],
    },
  ]
}

// Принимаем "сырые" данные из тела запроса — не доверяем им до валидации
export async function create(input: Partial<Bean>): Promise<Bean> {
  if (!input.title || !input.country) {
    throw new Error('VALIDATION_ERROR')
  }

  const recipes =
    Array.isArray(input.recipes) && input.recipes.length > 0
      ? input.recipes
      : buildDefaultRecipes()

  const bean: Bean = {
    id: uuidv4(),
    title: input.title,
    country: input.country,
    description: input.description ?? '',
    roasterComment: input.roasterComment ?? '',
    imageUrl: input.imageUrl ?? '',
    details: input.details ?? { process: '', region: '', variety: [], scaScore: 0 },
    flavorProfile: input.flavorProfile ?? { notes: [], acidity: 0, sweetness: 0, bitterness: 0 },
    recipes,
  }

  return repo.create(bean)
}



// ===== DELETE =====

export async function remove(id: string): Promise<void> {
  const deleted = await repo.remove(id)
  if (!deleted) throw new Error('NOT_FOUND')
}
