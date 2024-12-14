import { getContext, setContext } from 'svelte'

type TabListContextValue = {
	name: string
	tab: number
}

const key = Symbol('tab-list-context')

export function setTabListContext(value: TabListContextValue) {
	setContext(key, value)
}

export function getTabListContext(): TabListContextValue {
	return getContext(key) as TabListContextValue
}
