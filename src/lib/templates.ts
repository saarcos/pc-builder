// buildTemplates.ts

export type ComponentType =
    | 'processors'
    | 'video-cards'
    | 'motherboards'
    | 'memory'
    | 'hard-drives'
    | 'power-supplies'
    | 'coolers'

export type BuildTemplate = Partial<Record<ComponentType, number>>;

export const buildTemplates: Record<'gaming' | 'render' | 'office-integrated' | 'office-dedicated', BuildTemplate> = {
  gaming: {
    processors: 0.22,         // Buen CPU para evitar bottleneck con GPU
    'video-cards': 0.35,      // Lo más importante en gaming
    motherboards: 0.09,       // Suficiente para una decente sin gastar de más
    memory: 0.12,             // Ideal: 16GB o más
    'hard-drives': 0.08,      // SSD preferido
    'power-supplies': 0.09,   // Márgenes seguros para 80+ Bronze/Gold
    coolers: 0.05             // Básico o stock
  },
  render: {
    processors: 0.35,         // CPU potente para tareas multi-hilo
    'video-cards': 0.25,      // GPU aún importante, pero menos que en gaming
    motherboards: 0.1,
    memory: 0.15,             // 32GB ideal
    'hard-drives': 0.1,
    'power-supplies': 0.03,
    coolers: 0.02             // Puede requerirse uno bueno si es Ryzen X o Intel K
  },
  'office-integrated': {
    processors: 0.35,         // Con gráficos integrados
    motherboards: 0.2,
    memory: 0.15,
    'hard-drives': 0.15,
    'power-supplies': 0.15
  },
  'office-dedicated': {
    processors: 0.3,
    'video-cards': 0.15,      // GPU de gama baja/media
    motherboards: 0.2,
    memory: 0.15,
    'hard-drives': 0.1,
    'power-supplies': 0.1
  }
};

