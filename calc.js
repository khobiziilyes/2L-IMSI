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
}

$(() => {
	$('#myModal').modal('show');
	
	const addedHTML = lectures.reduce((acc, lecture) => {
		const elements = lectureElements(lecture.id);

		const tr = `
			<tr>
				<th scope="row">${lecture.name}</th>
				<td>${lecture.removeCC ? '' : input(elements.CC)}</td>
				<td>${input(elements.EXAM)}</td>
				<td>${input(elements.TOTAL, 'ilyesTotal')}</td>
				<td align="right">${lecture.coefficient}</td>
			</tr>
		`;

		return acc + tr;
	}, '');

	$('#tbody').prepend(addedHTML);

	$('.ilyesK').on('input', _ => updateCalc(_));
	
	$('.ilyesTotal').on('input', function(event) {
		const jThis = $(this);

		const id = jThis.attr('id').split('_')[0];
		const elements = lectureElements(id);

		$('#' + elements.CC)?.val(jThis.val());
		$('#' + elements.EXAM).val(jThis.val());

		updateCalc();
	});
});