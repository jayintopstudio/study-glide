import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'

export default defineConfig([
  globalIgnores(['dist', '.next', 'node_modules']),
  js.configs.recommended,
])
