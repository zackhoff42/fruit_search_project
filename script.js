const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function calculateScore(a, str) {
	let total = 0;
	str = str.toLowerCase();
	a = a.toLowerCase();

	if (a.indexOf(str) == 0) {
		total += 2;
	}
	if (a.split(str).length > 1) {
		total += 1;
	}

	return total;
}

function search(str) {
	let results = [];

	results = fruit.filter((el) => el.toLowerCase().includes(str));

	results.sort((a, b) => {
		return calculateScore(b, str) - calculateScore(a, str);
	});

	return results;
}

function searchHandler(e) {
	let str = input.value.toLowerCase();
	showSuggestions(search(str), str);
}

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = '';
	let limiter = 0;

	for (let fruit of results) {
		let newSuggestion = document.createElement('li');
		newSuggestion.innerHTML = fruit.replace(new RegExp('(' + inputVal + ')', 'i'), '<b>$1</b>');

		suggestions.appendChild(newSuggestion);

		/*Used to limit the results to only 6 entries*/
		limiter++; 
		if (limiter > 5) {
			break;
		}
	}

	if (!input.value) suggestions.innerHTML = '';

}

function useSuggestion(e) {
	input.value = e.target.innerText;
	suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);