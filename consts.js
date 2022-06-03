const lectures = [
	{
		id: 'ENG',
		name: 'English',
		coefficient: 1,
		removeCC: true
	},
	{
		id: 'Asserv',
		name: 'Asserv',
		coefficient: 3
	},
	{
		id: 'MDF',
		name: 'MDF',
		coefficient: 3
	},
	{
		id: 'MethodesNum',
		name: 'Methodes Num',
		coefficient: 2
	},
	{
		id: 'Proba',
		name: 'Proba',
		coefficient: 2
	},
	{
		id: 'RDM',
		name: 'RDM',
		coefficient: 3
	},
	{
		id: 'TDC',
		name: 'TDC',
		coefficient: 3
	}
];

const coefficientsSum = lectures.reduce((x, y) => x + y.coefficient, 0);

const input = (id, className = 'ilyesK') => `
	<div class="form-group">
		<input type="text" class="form-control ${className}" id="${id}" placeholder="0" inputmode="numeric" required>
	</div>
`;

function _2DigsDiv(num) {
	return (Math.round(num * 100) / 100).toFixed(2);
}

function lectureElements(id) {
	return {
		CC: id + '_CC',
		EXAM: id + '_EXAM',
		TOTAL: id + '_TOTAL'
	};
}

function getVal(id) {
	return $('#' + id)?.val()?.replace(/,/g, '.');
}