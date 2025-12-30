declare module 'minimatch' {
	export type MinimatchOptions = {
		debug?: boolean
		nobrace?: boolean
		noglobstar?: boolean
		dot?: boolean
		noext?: boolean
		nocase?: boolean
		nonull?: boolean
		matchBase?: boolean
		nocomment?: boolean
		nonegate?: boolean
		flipNegate?: boolean
		partial?: boolean
		windowsPathsNoEscape?: boolean
	}

	export function minimatch(
		target: string,
		pattern: string,
		options?: MinimatchOptions,
	): boolean

	export default minimatch
}
