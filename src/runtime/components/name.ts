import { computed } from 'vue'
import { stringToIcon } from '@iconify/utils/lib/icon/name'
import type { NuxtIconRuntimeOptions } from '../../types'
import { useAppConfig } from '#imports'
import { resolveName } from './resolve-name'

export type IconifyIconCustomizeCallback = (
  content: string,
  name?: string,
  prefix?: string,
  provider?: string,
) => string

export function useResolvedName(getName: () => string) {
  const options = useAppConfig().icon as NuxtIconRuntimeOptions

  return computed(() => resolveName(getName(), options))
}

export function resolveCustomizeFn(
  customize: IconifyIconCustomizeCallback | boolean | null | undefined,
  globalCustomize: IconifyIconCustomizeCallback | undefined,
):
    IconifyIconCustomizeCallback | undefined {
  if (customize === false) return undefined
  if (customize === true || customize === null) return globalCustomize
  return customize
}

// CSS mode builds icons with `getIconCSS`, which only passes the body to `customise`.
// Bind the name the same way SVG mode (`@iconify/vue`) passes it.
export function withIconName(customize: IconifyIconCustomizeCallback, name: string): (content: string) => string {
  const icon = stringToIcon(name)
  return content => customize(content, icon?.name, icon?.prefix, icon?.provider)
}
