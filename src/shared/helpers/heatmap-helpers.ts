export function getHeatmapCellTitle(likelihood_str: string, impact_str: string): string {
	const moderate = [
		{ likelihood: 'very_likely', impact: 'insignificant' },
		{ likelihood: 'likely', impact: 'insignificant' },
		{ likelihood: 'likely', impact: 'minor' },
		{ likelihood: 'moderately_likely', impact: 'minor' },
		{ likelihood: 'moderately_likely', impact: 'moderate' },
		{ likelihood: 'unlikely', impact: 'moderate' },
		{ likelihood: 'unlikely', impact: 'major' },
		{ likelihood: 'very_unlikely', impact: 'major' },
		{ likelihood: 'very_unlikely', impact: 'critical' }
	];

	const major = [
		{ likelihood: 'very_likely', impact: 'minor' },
		{ likelihood: 'very_likely', impact: 'moderate' },
		{ likelihood: 'likely', impact: 'moderate' },
		{ likelihood: 'likely', impact: 'major' },
		{ likelihood: 'moderately_likely', impact: 'major' },
		{ likelihood: 'moderately_likely', impact: 'critical' },
		{ likelihood: 'unlikely', impact: 'critical' }
	];

	const minor = [
		{ likelihood: 'moderately_likely', impact: 'insignificant' },
		{ likelihood: 'unlikely', impact: 'insignificant' },
		{ likelihood: 'very_unlikely', impact: 'insignificant' },
		{ likelihood: 'unlikely', impact: 'minor' },
		{ likelihood: 'very_unlikely', impact: 'minor' },
		{ likelihood: 'very_unlikely', impact: 'moderate' }
	];

	const critical = [
		{ likelihood: 'very_likely', impact: 'major' },
		{ likelihood: 'very_likely', impact: 'critical' },
		{ likelihood: 'likely', impact: 'critical' }
	];

	for (const { likelihood, impact } of moderate) {
		if (likelihood === likelihood_str && impact === impact_str) {
			return 'Moderate';
		}
	}

	for (const { likelihood, impact } of major) {
		if (likelihood === likelihood_str && impact === impact_str) {
			return 'Major';
		}
	}

	for (const { likelihood, impact } of minor) {
		if (likelihood === likelihood_str && impact === impact_str) {
			return 'Minor';
		}
	}

	for (const { likelihood, impact } of critical) {
		if (likelihood === likelihood_str && impact === impact_str) {
			return 'Critical';
		}
	}

	return '';
}

export function getOriginalHeatmapCellTitle(likelihood_str: string, impact_str: string): string {
	const moderate = [
		{ originalLikelihood: 'very_likely', originalImpact: 'insignificant' },
		{ originalLikelihood: 'likely', originalImpact: 'insignificant' },
		{ originalLikelihood: 'likely', originalImpact: 'minor' },
		{ originalLikelihood: 'moderately_likely', originalImpact: 'minor' },
		{ originalLikelihood: 'moderately_likely', originalImpact: 'moderate' },
		{ originalLikelihood: 'unlikely', originalImpact: 'moderate' },
		{ originalLikelihood: 'unlikely', originalImpact: 'major' },
		{ originalLikelihood: 'very_unlikely', originalImpact: 'major' },
		{ originalLikelihood: 'very_unlikely', originalImpact: 'critical' }
	];

	const major = [
		{ originalLikelihood: 'very_likely', originalImpact: 'minor' },
		{ originalLikelihood: 'very_likely', originalImpact: 'moderate' },
		{ originalLikelihood: 'likely', originalImpact: 'moderate' },
		{ originalLikelihood: 'likely', originalImpact: 'major' },
		{ originalLikelihood: 'moderately_likely', originalImpact: 'major' },
		{ originalLikelihood: 'moderately_likely', originalImpact: 'critical' },
		{ originalLikelihood: 'unlikely', originalImpact: 'critical' }
	];

	const minor = [
		{ originalLikelihood: 'moderately_likely', originalImpact: 'insignificant' },
		{ originalLikelihood: 'unlikely', originalImpact: 'insignificant' },
		{ originalLikelihood: 'very_unlikely', originalImpact: 'insignificant' },
		{ originalLikelihood: 'unlikely', originalImpact: 'minor' },
		{ originalLikelihood: 'very_unlikely', originalImpact: 'minor' },
		{ originalLikelihood: 'very_unlikely', originalImpact: 'moderate' }
	];

	const critical = [
		{ originalLikelihood: 'very_likely', originalImpact: 'major' },
		{ originalLikelihood: 'very_likely', originalImpact: 'critical' },
		{ originalLikelihood: 'likely', originalImpact: 'critical' }
	];

	for (const { originalLikelihood, originalImpact } of moderate) {
		if (originalLikelihood === likelihood_str && originalImpact === impact_str) {
			return 'Moderate';
		}
	}

	for (const { originalLikelihood, originalImpact } of major) {
		if (originalLikelihood === likelihood_str && originalImpact === impact_str) {
			return 'Major';
		}
	}

	for (const { originalLikelihood, originalImpact } of minor) {
		if (originalLikelihood === likelihood_str && originalImpact === impact_str) {
			return 'Minor';
		}
	}

	for (const { originalLikelihood, originalImpact } of critical) {
		if (originalLikelihood === likelihood_str && originalImpact === impact_str) {
			return 'Critical';
		}
	}

	return '';
}
