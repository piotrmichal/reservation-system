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
				var whichRow = target.parentNode.firstChild.textContent;
				var whichSeat = target.textContent;
				console.log(`Seat ${whichSeat} in ${whichRow} row`);
			}
			
		});
		
	});
};

pick();

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
	});

	back.addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.remove('open');
		modalConfirm.classList.remove('show');
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