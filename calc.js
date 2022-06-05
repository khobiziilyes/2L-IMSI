function updateCalc(event) {
	const finalSum = lectures.reduce((acc, lecture) => {		
		const elements = lectureElements(lecture.id);

		const CC = getVal(elements.CC);
		const EXAM = getVal(elements.EXAM);

		const TOTAL = (lecture.removeCC ? EXAM : ((CC * 0.4) + (EXAM * 0.6))) || 0;

		if (event) $('#' + elements.TOTAL).val(_2DigsDiv(TOTAL));

		const curr = TOTAL * lecture.coefficient;

		return acc + curr;
	}, 0);

	$('#finalSum').html(_2DigsDiv(finalSum));
	const finalResult = _2DigsDiv(finalSum / coefficientsSum);

	$('#finalResult').html(finalResult + '/20');

	const credits = unites.map(unite => {
		const modules = unite.map(_ => lectures[_]);
		
		const results = modules.map(_ => {
			const elements = lectureElements(_.id);
			
			return {
				..._,
				total: +$('#' + elements.TOTAL).val()
			}
		});
		
		const totalCoef = results.reduce((a, b) => a + b.coefficient, 0);

		const totalCredit = (results.reduce((a, b) => a + b.total * b.coefficient, 0) >= 10 * totalCoef ? 
			results : 
			results.filter(_ => _.total >= 10)).reduce((a, b) => a + b.credit, 0);
		
		return totalCredit;
	});

	credits.forEach((_, i) => $('#unite' + i).html(_));
	$('#uniteTotal').html(credits.reduce((a, b) => a + b, 0));
}

$(() => {	
	const addedHTML = lectures.reduce((acc, lecture, i) => {
		const elements = lectureElements(lecture.id);

		const tr = `
			<tr id="moduleTr${i}">
				<th scope="row">${lecture.name}</th>
				<td>${lecture.removeCC ? '' : input(elements.CC)}</td>
				<td>${input(elements.EXAM)}</td>
				<td>${input(elements.TOTAL, 'ilyesTotal')}</td>
				<td align="right">${lecture.coefficient}</td>
			</tr>
		`;

		return acc + tr;
	}, '');

	const unitesHtml = [...unites, null].reduce((acc, unite, i) => {
		const tr = `
			<tr id="uniteTr${i}">
				<th scope="row">${unite ? ('Unite' + (i + 1)) : 'Credit total'}</th>
				<td colspan="3"></td>
				<td style="font-weight:bold;" id="unite${unite ? i : 'Total'}"></td>
			</tr>
		`;

		return acc + tr;
	}, '');

	$('#tbody').prepend(addedHTML);
	$('#tbody').append(unitesHtml);

	$('.ilyesK').on('input', _ => updateCalc(_));
	
	$('.ilyesTotal').on('input', function(event) {
		const jThis = $(this);

		const id = jThis.attr('id').split('_')[0];
		const elements = lectureElements(id);

		$('#' + elements.CC)?.val(jThis.val());
		$('#' + elements.EXAM).val(jThis.val());

		updateCalc();
	});

	unites.forEach((unite, i) => {
		const color = unitesColors[i];

		unite.forEach(module => {
			$('#moduleTr' + module).css('background-color', color);
		});

		$('#uniteTr' + i).css('background-color', color);
	});
});