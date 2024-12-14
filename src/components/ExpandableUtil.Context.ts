import { getContext, setContext } from 'svelte'

export type ExpandableUtilStatus = 'expanded' | 'collapsed'

export type ExpandableUtilContextValue = {
	status: ExpandableUtilStatus
	toggle: () => void
}

const key = Symbol('expandable-util-context')

export function setExpandableUtilContext(value: ExpandableUtilContextValue) {
	setContext(key, value)
}

export function getExpandableUtilContext(): ExpandableUtilContextValue {
	return getContext(key) as ExpandableUtilContextValue
}
