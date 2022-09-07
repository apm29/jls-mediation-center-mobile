import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  shortcuts: [
    [
      'toolbar',
      'bg-gray-100/60 min-h-12 shadow border-b rounded-t-lg flex items-center justify-end px-2 py-1',
    ],
    [
      'scrollable',
      'scrollbar scrollbar-rounded scrollbar-w-6px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4'
    ]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetScrollbar(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
