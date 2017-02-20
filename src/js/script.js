var seats = document.querySelector('.seats');

function create() {
	var fragm = document.createDocumentFragment(),
		num = 20;

	for (var i = 1; i <= 9; i++) {
		var row = document.createElement('div');
		var p = document.createElement('p');
		row.classList.add('row');
		p.textContent = `${i}`;
		row.appendChild(p);
		for (var j = 1; j <= num; j ++) {
			var seat = document.createElement('div');
			seat.classList.add('seat');
			seat.textContent = j;
			row.appendChild(seat);
			if (j === 6 || j === 14)  {
				seat.classList.add('space');
			}
		}

		fragm.appendChild(row);
	};

	seats.appendChild(fragm);
};

create();

function pick() {
	var row = document.getElementsByClassName('row');
	[].forEach.call(row, function(e) {
		e.addEventListener('click', function(e){
			var target = e.target;
			if (target.classList.contains('seat')) {
				target.classList.toggle('chosen');
			}			
		});	
	});
};

pick();

function selectedSeats() {
	var chosenSeat = document.getElementsByClassName('chosen');
	var heading = document.querySelector('header');
	var information = document.createElement('span');
	var whichSeat = [];
	var whichRow = [];
	console.log(information);

	for (var i = 0; i < chosenSeat.length; i++) {
		whichSeat.push(chosenSeat[i].textContent);
		whichRow.push(chosenSeat[i].parentNode.firstChild.textContent);
		information.textContent += `Seat: ${whichSeat[i]} row: ${whichRow[i]}, `;
	}
	heading.appendChild(information);
	
}

function confirm() {
	var btnNext = document.getElementById('next'),
		modal = document.querySelector('.modal'),
		modalConfirm = document.querySelector('.confirm'),
		back = document.querySelector('.back'),
		confirmBtn = document.querySelector('.confirmBtn'),
		modalSummary = document.querySelector('.summary'),
		okBtn = document.querySelector('.summary .confirmBtn');

	btnNext.addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.add('open');
		modalConfirm.classList.add('show');

		selectedSeats();
		
	});

	back.addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.remove('open');
		modalConfirm.classList.remove('show');

		(function clearInfo() {
			var information = document.querySelector('header span');
			var heading = document.getElementsByTagName('header')[0].removeChild(information);
		})();
	});

	confirmBtn.addEventListener('click', function(e) {
		e.preventDefault();
		modalConfirm.classList.remove('show');
		modalSummary.classList.add('show');
	});

	okBtn.addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.remove('open');
		modalSummary.classList.remove('show');
		modalConfirm.classList.remove('show');
	});
};

confirm();