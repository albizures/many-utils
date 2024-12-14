import { getContext, setContext } from 'svelte'

export type Orientation = 'horizontal' | 'vertical'

export type AddPaneArgs = {
	container: HTMLDivElement
	onResize: (change: number) => void
	size: () => number
}

export type SplitPaneContextValue = {
	elements: Array<HTMLDivElement>
	orientation: Orientation
	addPane: (args: AddPaneArgs) => number
	resize: (prev: number, next: number, change: number) => void
	removePane: (container: HTMLDivElement) => void
}
type SplitpanesGetter = () => SplitPaneContextValue

const splitKey = Symbol('splitpane-context')

export function setSplitpanesContext(value: SplitpanesGetter) {
	setContext(splitKey, value)
}

export function getSplitpanesContext(): SplitPaneContextValue {
	return (getContext(splitKey) as SplitpanesGetter)()
}

export type PaneContextValue = {
	index: number
	width: number
}

type PaneGetter = () => PaneContextValue

const paneKey = Symbol('pane-context')

export function setPaneContext(value: PaneGetter) {
	setContext(paneKey, value)
}

export function getPaneContext(): PaneContextValue {
	return (getContext(paneKey) as PaneGetter)()
}
