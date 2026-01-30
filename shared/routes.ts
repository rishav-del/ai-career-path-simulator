import { z } from 'zod';
import { insertSimulationSchema, simulations } from './schema';

export const api = {
  simulations: {
    create: {
      method: 'POST' as const,
      path: '/api/simulations',
      input: insertSimulationSchema,
      responses: {
        201: z.custom<typeof simulations.$inferSelect>(),
        500: z.object({ message: z.string() })
      }
    },
    get: {
      method: 'GET' as const,
      path: '/api/simulations/:id',
      responses: {
        200: z.custom<typeof simulations.$inferSelect>(),
        404: z.object({ message: z.string() })
      }
    },
    list: {
      method: 'GET' as const,
      path: '/api/simulations',
      responses: {
        200: z.array(z.custom<typeof simulations.$inferSelect>())
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
