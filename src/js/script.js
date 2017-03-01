var seats = document.querySelector('.seats');

function create() {
	var fragm = document.createDocumentFragment(),
		num = 16;

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
			if (j === 4 || j === 12)  {
				seat.classList.add('space');
			}
		}

		fragm.appendChild(row);
	};

	seats.appendChild(fragm);
};

create();

function checkSelected() {
	var next = document.getElementById('next');

	if (document.querySelector('.chosen')) {
		next.classList.add('active');
	} else {
		next.classList.remove('active');
	}
};

function select() {
	var row = document.getElementsByClassName('row');
	[].forEach.call(row, function(e) {
		e.addEventListener('click', function(e){
			var target = e.target;
			
			if (target.classList.contains('reserved')) {
				return false;
			} else if (target.classList.contains('seat')) {
				target.classList.toggle('chosen');
			}

			target.childNodes.forEach(checkSelected); 
		});
	});
};

select();

function selectedSeats() {
	var chosenSeat = document.getElementsByClassName('chosen'),
		heading = document.querySelector('header'),
		information = document.createElement('span'),
		whichSeat = [],
		whichRow = [];

	for (var i = 0; i < chosenSeat.length; i++) {
		whichSeat.push(chosenSeat[i].textContent);
		whichRow.push(chosenSeat[i].parentNode.firstChild.textContent);
		information.textContent += `Seat: ${whichSeat[i]} row: ${whichRow[i]}, `;
	}
	heading.appendChild(information);
}

(function checkName() {
	var name = document.getElementById('name').addEventListener('blur', function() {
		var reg = new RegExp('^[a-zA-Z]{3,}$', 'g');

		if (!reg.test(this.value)) {
            this.classList.add('invalid');
        } else {
            this.classList.remove('invalid');
        }
	}, false)
})();

(function checkPhone() {
	var phone = document.getElementById('phone').addEventListener('blur', function() {
		var reg = /^([0-9]{3}[\s-])([0-9]{3}[\s-])[0-9]{3}$/;

		if (!reg.test(this.value)) {
            this.classList.add('invalid');
        } else {
            this.classList.remove('invalid');
        }
	}, false)
})();

function confirm() {
	var btnNext = document.getElementById('next'),
		modal = document.querySelector('.modal'),
		modalConfirm = document.querySelector('.confirm'),
		back = document.querySelector('.back'),
		confirmBtn = document.querySelector('.confirmBtn'),
		modalSummary = document.querySelector('.summary'),
		okBtn = document.querySelector('.summary .confirmBtn'),
		chosenSeat = document.getElementsByClassName('chosen'),
		reserved = document.getElementsByClassName('reserved');

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

		clearInfo();
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
		clearInfo();

		[].forEach.call(chosenSeat, function(el) {
			el.classList.add('reserved');
		});

		[].forEach.call(reserved, function(el) {
			el.classList.remove('chosen');
		});
		checkSelected();
	});
};

confirm();

function clearInfo() {
	var information = document.querySelector('header span');
	var heading = document.getElementsByTagName('header')[0].removeChild(information);
	document.getElementById('phone').value = '';
	document.getElementById('name').value = '';
};