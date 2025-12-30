type ThemeInfoProps = {
	theme: string
}

export function ThemeInfo({ theme }: ThemeInfoProps) {
	return (
		<div className="space-y-2">
			<p className="text-xs font-medium text-muted-foreground">TEMAS PRINCIPAIS</p>
			<p className="text-sm text-foreground/70">
				{theme}
			</p>
		</div>
	)
}
