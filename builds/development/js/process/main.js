/* ==============================================================
// in search get from json to list
============================================================== */
var search = document.getElementById("search");
search.addEventListener('keyup', function(event){

	//clear results if the value is blank or starts with space
	if (!this.value.trim()) {
		clearUpdate();
		return;
	}

	var searchField = document.getElementById("search").value;
	var myExp = new RegExp(searchField, "i");

	function fetchfile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
			var data = JSON.parse(this.responseText);
			if (callback) callback(data);
        }
    };
    httpRequest.open('GET', path, true);
    httpRequest.send();
	}
	fetchfile('https://restcountries.eu/rest/v1', function(data){
		var output = '<ul id="searchresults">';
		$.each(data, function(key, val) {
			if ((val.name.search(myExp) != -1) || (val.capital.search(myExp) != -1)) {
				output += '<li tabindex="1">';
				output += val.name + ', ' + val.capital;
				output += '</li>';
			}
		});
		output += '</ul>';
		$('#update').html(output);
	});
});
/* ==============================================================
//Add item to history on click an item in the sugested items
============================================================== */
var update = document.getElementById('update');
update.addEventListener("click", function(event) {
	if(event.target && event.target.nodeName == "LI") {
		var searchString = event.target.innerText;
		createSearchResult(searchString);
		clearUpdate();
		emptyInput();
	}
});
/* ==============================================================
// EVENTS: Add item to history on Enter on the search input fields
============================================================== */
var search = document.getElementById("search");
search.addEventListener('keydown', function(event){
	if(event.keyCode == 13){ //Enter Key
		var searchString = search.value;

		if (search.value) { // if not empty
			createSearchResult(searchString);
			clearUpdate();
			emptyInput();
		}
    }
});
/* ==============================================================
//creating the list history
============================================================== */
function createSearchResult(searchString) {
    var ul = document.getElementById('history');

    var li = document.createElement('li');

	var h2 = document.createElement('h2');
	h2.innerText = searchString;
	li.appendChild(h2);

    li.appendChild(dateStamp());
    li.appendChild(createRemoveButton());

    ul.appendChild(li);
}
/* ==============================================================
//Clear sugestions
============================================================== */
function clearUpdate() {
	var update = document.getElementById('update');
	while (update.firstChild) update.removeChild(update.firstChild);
}
/* ==============================================================
//Clear Input
============================================================== */
function emptyInput() {
	var search = document.getElementById("search");
	search.value = '';
}
/* ==============================================================
//Timestamp string
============================================================== */
function timeStampHistory() {
    var now = new Date();
    var day = (now.getDate() < 10 ? '0' : '') + now.getDate();
    var month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
    var year = now.getFullYear();
    var hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
    var minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}
function dateStamp() {
	var stamp = document.createElement('time');
	stamp.innerText = timeStampHistory();
	return stamp;
}
/* ==============================================================
//Remove button and its Functionality
============================================================== */
function createRemoveButton() {
    var button = document.createElement('button');
    button.className = "remove-item";
    button.addEventListener('click', function(event) {
        event.target.parentNode.remove(this);
    });
    return button;
};
/* ==============================================================
//Listeners
============================================================== */








// var search = document.getElementById("search");
// search.addEventListener('keydown', function(event){
// 	if(event.keyCode == 40){ //down Key
// 		var firstList = document.getElementsByTagName("li")[0];
// 		firstList.classList.add("selected");
//     }
// });










// $('#search').on('keydown', function(e){
// 	var $listItems = $('#update li');
//     var key = e.keyCode,
//         $selected = $listItems.filter('.selected'),
//         $current;

//     $listItems.removeClass('selected');


// 		var menu = $('#searchresults');

// 		if ( key == 40 ) // Down key
// 		{
// 			if ( ! $selected.length || $selected.is(':last-child') ) {
// 				$current = $listItems.eq(0);
// 			}
// 			else {
// 				$current = $selected.next();
// 			}

// 			$current.addClass('selected');
// 		}

// 		if ( key == 38 ) // Up key
// 		{
// 			if ( ! $selected.length || $selected.is(':first-child') ) {
// 				$current = $listItems.last();
// 			}
// 			else {
// 				$current = $selected.prev();
// 			}
// 			$current.addClass('selected');
// 		}

// });





// $("#search").keydown(function(){
//     $("input").css("background-color", "yellow");
// 	var what = $('.selected').text();
// 	console.log(what);
// 	if(event.keyCode == 13){ //Enter Key
// 		var searchString = what;
// 			createSearchResult(searchString);
// 			clearUpdate();
// 			emptyInput();

//     }
// });
