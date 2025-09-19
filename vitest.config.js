import { defineConfig } from 'vitest/config';

export default defineConfig({\n  test: {\n    coverage: {\n      provider: \'v8\',\n      reporter: [\'text\', \'json\', \'html\'],\n    },\n    environment: \'node\',\n    transformMode: {\n      web: [/\.js$/],\n    },\n  },\n  resolve: {\n    extensions: [\'.js\', \'.ts\', \'.jsx\', \'.tsx\', \'.json\'],\n  },\n});
