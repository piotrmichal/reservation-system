(function reservation() {
	var seats = document.querySelector('.seats');
	
	document.addEventListener('keydown', function(e) {
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.preventDefault();
		}
	});

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

	function confirm() {
		var btnNext = document.getElementById('next'),
			modal = document.querySelector('.modal'),
			modalConfirm = document.querySelector('.confirm'),
			back = document.querySelector('.back'),
			confirmBtn = document.querySelector('.confirmBtn'),
			modalSummary = document.querySelector('.summary'),
			okBtn = document.querySelector('.summary .confirmBtn'),
			chosenSeat = document.getElementsByClassName('chosen'),
			reserved = document.getElementsByClassName('reserved'),
			name = document.getElementById('name'),
			phone = document.getElementById('phone'),
			nameValue,
			phoneValue;

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
			name.classList.remove('invalid');
			phone.classList.remove('invalid');

			clearInfo();
		});

		function checkName() {
			var reg = new RegExp('^[a-zA-Z]{3,}$', 'g');

			if (!reg.test(name.value)) {
	            name.classList.add('invalid');
	            nameValue = false;
	            return;
	        } else {
	            name.classList.remove('invalid');
	            nameValue = true;
	        }
		};

		function checkPhone() {
			var reg = /^([0-9]{9})$/;

			if (!reg.test(phone.value)) {
	            phone.classList.add('invalid');
	            phoneValue = false;
	            return;
	        } else {
	            phone.classList.remove('invalid');
	            phoneValue = true;
	        }
		};

		name.addEventListener('blur', checkName);
		phone.addEventListener('blur', checkPhone);

		confirmBtn.addEventListener('click', function(e) {
			e.preventDefault();
			checkName();
			checkPhone();

			if (nameValue && phoneValue) {
				modalConfirm.classList.remove('show');
				modalSummary.classList.add('show');
			} else 
				return;
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
})();