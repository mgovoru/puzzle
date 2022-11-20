let body = document.querySelector('body');
let intervalID;
let win = false;
let count = 0;
let arrayRandomField = [];

//функция создания добавления элемента
function createElement(parent, child, classElement, element) {
	child = document.createElement(element);
	child.classList.add(classElement);
	parent.append(child);
	return child;
}

//создаем контейнер и меню кнопок
let container;
container = createElement(body, container, 'container', 'div');
let nav;
nav = createElement(container, nav, 'nav', 'nav');

// добавляем кнопку к списку кнопок
function addButton(text) {
	let li;
	li = createElement(nav, li, 'item', 'li');
	let button;
	button = createElement(li, button, 'button', 'button');
	button.innerHTML = text;
}




//добавляем все кнопки
addButton('Shuffle and start');
addButton('Stop');
addButton('Save');
addButton('Results');
addButton('Sound');

//добавляем количество ходов и время
let steps = 0;
let s = 0;
let timeMinutes = 0;
let timeSeconds = 0;
let game;
game = createElement(container, game, 'game', 'div');
let moves;
moves = createElement(game, moves, 'moves', 'div');
moves.innerHTML = `moves: ${steps}`;
let time;
time = createElement(game, time, 'time', 'div');
time.innerHTML = `time: ${timeMinutes} : ${timeSeconds} `;


let columns;
let rows;
let arrayRandom = [];
window.addEventListener('load', () => {
	if (getLocalStorage()) {
		arraySave = Object.values(getLocalStorage());
		console.log(arraySave);
		if (arraySave.length > 0) {
			console.log('yes');
			console.log(array);
			console.log(arraySave);
			columns = Math.floor(Math.sqrt(arraySave.length));
			rows = columns;
			//выводим поле на экран
			createField(columns, rows);
			console.log(columns, rows);
			while (arrayRandomField.push([]) < rows);
			fillFieldSave(columns, rows, arraySave);
			tableListen();
			s = 0;
			//считаем минуты
			minutesSeconds();
			span0.innerHTML = `${columns}х${rows}`;
		}
	} else {
		columns = 4;
		rows = 4;
		//выводим поле на экран
		arrayRandomField = arrayRandomNumbers(columns, rows);
		createField(columns, rows);
		fillField(columns, rows);
		tableListen();
		s = 0;
		//считаем минуты
		minutesSeconds();
		span0.innerHTML = `${columns}х${rows}`;
	}
}
);

// сохранить массив игры в данный момент
function saveField(columns, rows) {
	let arrayToSave = [];
	cells = document.querySelectorAll('.cell');
	console.log(cells);
	for (let i = 0; i < (rows * columns); i++) {
		console.log(cells[i].innerHTML);
		if (cells[i].innerHTML != '') {
			arrayToSave[i] = cells[i].innerHTML;
		} else { arrayToSave[i] = 0; }
	}
	return arrayToSave;
}
//заполнить поле из сохраненного массива
function fillFieldSave(columns, rows, array) {
	clearClassEmpty();
	cells = document.querySelectorAll('.cell');
	let l = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			cells[l].innerHTML = array[l];
			arrayRandomField[i][j] = array[l];
			if (array[l] == 0) {
				cells[l].innerHTML = '';
				arrayRandomField[i][j] = 0;
				cells[l].classList.add('emptytd');
			}
			cells[l].addEventListener(`click`, (event) => {
				clearClass();
				event.target.classList.add(`selected`);
				let arrayCell = defineIj(event.target);
				moveCell(arrayCell[0], arrayCell[1]);
			})
			l++;
		}
	}
}



//функция перемешивания массива
function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}
//функция проверки на решаемость 
function checkDesition(arrayDesition, columns, rows) {
	let desition = false;
	let count = 0; let l = 0;
	for (let i = 0; i < (columns * rows); i++) {
		if (arrayDesition[i] == 0) { l = i; continue; } else {
			for (let j = (i + 1); j < (columns * rows); j++) {
				if (arrayDesition[j] == 0) { continue; }
				else {
					if (arrayDesition[i] > arrayDesition[j]) { count++; }
				}
			}
		}
	} console.log(count);
	l = Math.floor(l / columns);
	console.log(l);
	if ((count % 2 == 0) && (columns % 2 != 0)) { desition = true; }
	if ((((count + l) % 2) != 0) && (columns % 2 == 0)) { desition = true; }
	console.log(desition);
	return desition;
}


// создаем массив повторений случайных значений
function arrayRandomNumbers(columns, rows) {
	arrayRandom = [];
	arrayRandomField = [];
	for (let m = 0; m < (rows * columns); m++) {
		arrayRandom[m] = m;
	}
	shuffle(arrayRandom);
	while (!checkDesition(arrayRandom, columns, rows)) { shuffle(arrayRandom); }
	//arrayRandom.sort(() => Math.random() - 0.5);
	
	while (arrayRandomField.push([]) < rows);
	let amount = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			arrayRandomField[i][j] = arrayRandom[amount];
			amount++;
		}
	}
	return arrayRandomField;
}


let empty;
let selected;


// добавляем таблицу - создаем элементы
let table;
let box;
box = createElement(container, box, 'box', 'div');


function createField(columns, rows) {
	table = createElement(box, table, 'table', 'table');
	for (let i = 0; i < rows; i++) {
		let tr;
		tr = createElement(table, tr, 'tr', 'tr');
		for (let j = 0; j < columns; j++) {
			let cell;
			cell = createElement(tr, cell, 'cell', 'td');
			cell.innerHTML = '';
			cell.draggable = true;
		}
	}
}
//определяем i и j
function defineIj(element) {
	let arr = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			if (element.innerHTML == arrayRandomField[i][j]) { arr[0] = i; arr[1] = j; }
		}

	}
	return arr;
}


//функция новой игры - записываем в таблицу новые значения
function fillField(columns, rows) {
	arrayRandomField = arrayRandomNumbers(columns, rows);
	cells = document.querySelectorAll('.cell');
	let l = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			cells[l].innerHTML = arrayRandomField[i][j];
			if (arrayRandomField[i][j] == 0) {
				cells[l].innerHTML = '';
				cells[l].classList.add('emptytd');
			}
			cells[l].addEventListener(`click`, (event) => {
				clearClass();
				event.target.classList.add(`selected`);
				let arrayCell = defineIj(event.target);
				moveCell(arrayCell[0], arrayCell[1]);
			})
			l++;
		}
	}
}




let cells;




// cоздаем список результатов
let listResults;
listResults = createElement(container, listResults, 'results', 'ol');
let listResultsFind = document.querySelector('.results');
listResultsFind.classList.add('unvisible');
for (let i = 0; i < 10; i++) {
	listResults[i] = createElement(listResults, listResults[i], 'result', 'li');
}


//подключаем прослушку к таблице drag and drop
function tableListen() {
	table.addEventListener(`dragstart`, (event) => {
		clearClass();
		event.target.classList.add(`selected`);
	})

	table.addEventListener(`dragover`, (event) => {
		event.preventDefault();
		const active = document.querySelector(`.selected`);
		const current = event.target;
		const isMove = active !== current &&
			current.classList.contains(`emptytd`) && (!active.classList.contains(`emptytd`));
		if (isMove) {
			setTimeout(() => {
				let array = defineIj(active);
				moveCell(array[0], array[1]);
			}, 500);
		}

	})

	table.addEventListener(`dragend`, (event) => {
	})
}


//очищаем классы
function clearClass() {
	empty = document.querySelector('.emptytd');
	for (let i = 0; i < cells.length; i++) {
		cells[i].classList.remove('selected');
	}
	empty.classList.remove('selected');
}
function clearClassEmpty() {
	empty = document.querySelector('.emptytd');
	if (empty) { empty.classList.remove('emptytd'); }
}
// увеличиваем количество шагов
function addSteps() {
	steps++;
	if (moves) { moves.innerHTML = `moves: ${steps}`; }
}



//функция решающая перемешана ли клетка закончилась ли игра или ячейку переместить нельзя 
function moveCell(i, j) {

	if (moveCellDirection(i, j, 'up') ||
		moveCellDirection(i, j, 'down') ||
		moveCellDirection(i, j, 'left') ||
		moveCellDirection(i, j, 'right')) {
		addSteps();
		if (isMusic == true) { music(); }

	}
	// 
	if (checkGame()) {
		win = true;
		alert(`Hooray! You solved the puzzle in ${time.innerHTML} and ${moves.innerHTML} moves!`);
	}
}
// звук при перетаскивании ячеек
const audio = new Audio();
audio.src = `./1.mp3`;
let isMusic = false;
function music() {
	audio.play();
}


// проверка выиграна ли игра
function checkGame() {
	let n = 1; let check = false;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			if (!(arrayRandomField[i][j] == n)) { check = false; return false; } else { check = true; }

		}
	}
	if (!(arrayRandomField[rows][columns] == 0)) { return false; } else return true;
}


// функция перерисовывания ячеек
function moveCellDirection(i, j, direction) {
	empty = document.querySelector('.emptytd');
	selected = document.querySelector('.selected');
	let rowDirection = 0; let columnDirection = 0;
	if (direction == 'up') { rowDirection = - 1; }
	if (direction == 'down') { rowDirection = 1; }
	if (direction == 'left') { columnDirection = - 1; }
	if (direction == 'right') { columnDirection = 1; }
	if ((((i + rowDirection) < rows) && ((j + columnDirection) < columns)) && (((i + rowDirection) >= 0) && ((j + columnDirection) >= 0))) {
		if (arrayRandomField[i + rowDirection][j + columnDirection] == 0) {
			arrayRandomField[i + rowDirection][j + columnDirection] = arrayRandomField[i][j];
			arrayRandomField[i][j] = 0;
			selected.innerHTML = '';
			selected.classList.add('emptytd');
			empty.classList.remove('emptytd');
			empty.innerHTML = arrayRandomField[i + rowDirection][j + columnDirection];
			selected.classList.remove('selected');
			empty.classList.remove('selected');
			return true;
		}
	} else return false;
}

// отслеживаем клик на кнопкаx
let navButton = document.querySelector('.nav');
let array;
let resultsGames = [];
count = 0;
navButton.addEventListener('click', (event) => {
	if (event.target.innerHTML == 'Shuffle and start') {
		let result = {};
		result.id = count;
		result.moves = moves.innerHTML;
		result.times = time.innerHTML;
		if (win == true) { result.win = 'win'; }
		else { result.win = 'no win'; }


		if (count > 10) { resultsGames.shift(); }
		resultsGames.push(result);
		console.log(resultsGames);
		count++;
		setLocalStorageResults(resultsGames);
		clearClassEmpty();
		fillField(columns, rows);
		tableListen();
		clearInterval(intervalID);
		minutesSeconds();
		steps = 0;
		if (moves) { moves.innerHTML = `moves: ${steps}`; }
	}
	if (event.target.innerHTML == 'Sound') {
		if (isMusic == false) { isMusic = true; }
		else {
			isMusic = false;
		}
		event.target.classList.toggle('coral');
	}
	if (event.target.innerHTML == 'Save') {
		array = saveField(columns, rows);
		setLocalStorage(array);
	}
	if ((event.target.innerHTML == 'Results') && (listResultsFind.classList.contains('unvisible'))) {
		let listfromStorage = getLocalStorageResults();
		console.log(listfromStorage.length);
		for (let i = 0; i < listfromStorage.length; i++) {
			listResults[i].innerHTML = `game   
			${listfromStorage[i].id}   ${listfromStorage[i].moves}   ${listfromStorage[i].times}   ${listfromStorage[i].win}`;
		}
		listResultsFind.classList.remove('unvisible');
	}
})
listResultsFind.addEventListener('click', () => {
	listResultsFind.classList.add('unvisible');
})


// считаем и записываем время
function minutesSeconds() {
	s = 0; timeMinutes = 0;
	//time.innerHTML = `time: 0:0`;
	intervalID = setInterval(timeCount, 1000);
	function timeCount() {
		timeSeconds = s;
		if (s >= 60) {
			timeMinutes = Math.floor(s / 60);
			timeSeconds = s % 60;
		}
		time.innerHTML = `time: ${timeMinutes} : ${timeSeconds} `;
		s++;
	}
	intervalID;
}


// добавляем возможные размеры
let frameSize;
frameSize = createElement(container, frameSize, 'frame-size', 'div');
frameSize.innerHTML = `frame size:`

let otherSize;
otherSize = createElement(container, otherSize, 'other-size', 'div');
otherSize.innerHTML = `other size:`;

let span0;
span0 = createElement(frameSize, span0, 'size-0', 'span');
let span3;
span3 = createElement(otherSize, span3, 'size-3', 'span');
let span4;
span4 = createElement(otherSize, span4, 'size-4', 'span');
let span5;
span5 = createElement(otherSize, span5, 'size-5', 'span');
let span6;
span6 = createElement(otherSize, span6, 'size-6', 'span');
let span7;
span7 = createElement(otherSize, span7, 'size-7', 'span');
let span8;
span8 = createElement(otherSize, span8, 'size-8', 'span');

let currentSize = `3х3`;

span3.innerHTML = `3х3`;
span4.innerHTML = `4х4`;
span5.innerHTML = `5х5`;
span6.innerHTML = `6х6`;
span7.innerHTML = `7х7`;
span8.innerHTML = `8х8`;

// узнаем размер поля
let arraySizes = otherSize.querySelectorAll('span');

for (let t = 0; t < arraySizes.length; t++) {
	arraySizes[t].addEventListener('click', () => {
		rows = t + 3;
		columns = t + 3;
		span0.innerHTML = `${arraySizes[t].innerHTML}`;
		table.remove();
		createField(columns, rows);
		// выводим в поле значения таблицы
		fillField(columns, rows);
		tableListen();
		//считаем минуты

		clearInterval(intervalID);
		minutesSeconds();

		steps = 0;
		if (moves) { moves.innerHTML = `moves: ${steps}`; }

	});
}
// запоминаем игру
function setLocalStorage(array) {
	localStorage['array'] = JSON.stringify(array);
}

function getLocalStorage() {
	if (localStorage['array']) {
		array = JSON.parse(localStorage['array']);
		return array;
	}
}
let arraySave;



//сохранить десять последних результатов
function setLocalStorageResults(results) {
	localStorage['results'] = JSON.stringify(results);
}

function getLocalStorageResults() {
	if (localStorage['results']) {
		let results = JSON.parse(localStorage['results']);
		return results;
	}
}
