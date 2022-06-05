const unitesColors = ['#f7efd2', '#eed7a1', '#cd8b62'];

const unites = [
	[0, 3, 4],
	[1, 6],
	[2, 5]
];

const lectures = [
	{
		id: 'ENG',
		name: 'English',
		coefficient: 1,
		removeCC: true,
		credit: 2
	},
	{
		id: 'Asserv',
		name: 'Asserv',
		coefficient: 3,
		credit: 5
	},
	{
		id: 'MDF',
		name: 'MDF',
		coefficient: 3,
		credit: 5
	},
	{
		id: 'MethodesNum',
		name: 'Methodes Num',
		coefficient: 2,
		credit: 4
	},
	{
		id: 'Proba',
		name: 'Proba',
		coefficient: 2,
		credit: 4
	},
	{
		id: 'RDM',
		name: 'RDM',
		coefficient: 3,
		credit: 5
	},
	{
		id: 'TDC',
		name: 'TDC',
		coefficient: 3,
		credit: 5
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