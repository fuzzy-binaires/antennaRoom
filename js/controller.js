

//var tags = data.tags;
//var tags = [];
//var pills;// = data.pills;

var dbData;
var justAddedNewTag = false; // FOR WEIRD FORM BEHAVIOUR (SEE: addTagItem())

$(document).ready(function () {

	rsp = $.ajax
	({
		type: "GET",
		dataType: 'application/json',
		async: false,
		url: 'http://134.122.74.56/borders_flask_server/antenna_to_server',
		success: function () { alert("Thanks!"); },
		failure: function () { alert("Error!"); }
	});

	dbData = JSON.parse(rsp.responseText).data
	console.log(dbData.pills);


	buildTagsMenu();
	buildPills();

	document.getElementById("newPill-container").hidden = true;

	// ADD A ENTER KEY TO tagS	earchBox IN CASE USER INPUTS A NEW TAG
	$("#tagSearchBox").keydown(function (event) {
		if (event.keyCode == 13) {

			var inputText = $("#tagSearchBox")[0].value;
			// console.log("-|| AT KEY EVENT");
			addTagItemInForm(inputText);
			justAddedNewTag = true;

			// event.preventDefault();

			return false;
			// }
		}
	});
});


function buildTagsMenu() {

	var extractedTags = [];

	// BUILD ARRAY OUT OF PILL DATA
	dbData.pills.forEach(element => {
		element.tags.forEach(tagElement => {
			if (!extractedTags.includes(tagElement)) {
				extractedTags.push(tagElement);
			}
		});
	});

	// CREATE GUI BUTTONS
	var tagContainer = document.getElementById("tag-container");

	extractedTags.forEach(element => {
		addTagItem(tagContainer, element);
	});

}

function addTagItem(container, tagText) {

	if (!getTags().includes(tagText)) {
		var newTagElement = document.createElement("div");
		newTagElement.setAttribute("class", "tag-button");
		newTagElement.innerText = tagText;

		// newTagElement.setAttribute("onclick","filterBy('"+tagText+"');");
		newTagElement.addEventListener('click', function () {
			filterBy(tagText);
		})

		container.append(newTagElement);
	}
}

function buildPills() {

	// ON PREND LA PREMIERE (EMPTY) PILL
	var originalPill = $(".pill");
	var pillContainer = $(".pill-container");

	// ON FAIT UNE COPIE ET ON EN REMPLIT
	dbData.pills.forEach(function (element) {

		addNewPillToDOM(pillContainer, originalPill, element)

	});

	// DELETE THE ORIGINAL PILL
	originalPill.remove();


	mixPills();

}

function addNewPillToDOM(container, pillToCopy, data) {

	var newPill = pillToCopy.clone();

	newPill.find(".pill-title").text(data.title);
	newPill.find(".pill-description").text(data.description);
	newPill.find("a").attr("href", data.link);

	//console.log(newPill.find(".pill-title").text());

	// ADD PILL TO DOM
	container.append(newPill);
}

function mixPills() {
	// var pills = document.getElementsByClassName("pill");

	var pills = $(".pill");

	for (let i = 0; i < pills.length; i++) {
		// const element = pills[i];
		const element = pills.eq(i);

		var posTop = (Math.random() * 0.7) * 100;
		var posLeft = (Math.random() * 0.7) * 100;
		posTop = Math.min(Math.max(posTop, 20), 80);
		posLeft = Math.min(Math.max(posLeft, 20), 70);


		element.animate({ opacity: 0 }, 5)
			.animate({ left: (posLeft * Math.random()) + "%" }, 200 * Math.random())
			.animate({ top: (posTop * Math.random()) + "%" }, 300 * Math.random())
			.animate({ opacity: 1 }, 250)
			.animate({ left: (posLeft * Math.random()) + "%" }, 20)
			.animate({ top: (posTop * Math.random()) + "%" }, 60)
			.animate({ left: (posLeft * Math.random()) + "%" }, 20)
			.animate({ top: (posTop * Math.random()) + "%" }, 10)
			.animate({ left: posLeft + "%" }, 20)
			.animate({ top: posTop + "%" }, 20)
			.animate({ opacity: 0.1 }, 20)
			.animate({ opacity: 1 }, 40)
			.animate({ opacity: 0.1 }, 40)
			.animate({ opacity: 1 }, 40)
			.animate({ opacity: 0.1 }, 60)
			.animate({ opacity: 1 }, 10)
			.animate({ opacity: 0.5 }, 60)
			.animate({ opacity: 1 },
				{
					duration: 1000
				});

		// element.style.top = posTop + "%";
		// element.style.left = posLeft + "%";

	}
}

function rePositionPill(indexAtDB) {

	var pill = $(".pill").eq(indexAtDB);

	var posTop = (Math.random() * 0.7) * 100;
	var posLeft = (Math.random() * 0.7) * 100;
	posTop = Math.min(Math.max(posTop, 20), 80);
	posLeft = Math.min(Math.max(posLeft, 20), 70);

	pill.animate({ opacity: 1 }, 250)
		.animate({ left: (posLeft * Math.random()) + "%" }, 20)
		.animate({ top: (posTop * Math.random()) + "%" }, 30)
		.animate({ left: (posLeft * Math.random()) + "%" }, 20)
		.animate({ top: (posTop * Math.random()) + "%" }, 60)
		.animate({ left: (posLeft * Math.random()) + "%" }, 20)
		.animate({ top: (posTop * Math.random()) + "%" }, 10)
		.animate({ left: posLeft + "%" }, 20)
		.animate({ top: posTop + "%" }, 20)
		.animate({ opacity: 0.1 }, 20)
		.animate({ opacity: 1 }, 40)
		.animate({ opacity: 0.1 }, 40)
		.animate({ opacity: 1 }, 40)
		.animate({ opacity: 0.1 }, 60)
		.animate({ opacity: 1 }, 10)
		.animate({ opacity: 0.5 }, 60)
		.animate({ opacity: 1 },
			{
				duration: 1000
			});



}

function showNewPillForm() {

	var pillContainer = $("#newPill-container");
	if (pillContainer.is(":hidden")) {

		// pillContainer.show(10); CECI NE MARCHE PAS

		// CECI MARCHE BIEN
		document.getElementById("newPill-container").hidden = false;

		pillContainer.animate({ opacity: 0 }, 50)
			.animate({ opacity: 1 }, 50)
			.animate({ opacity: 0 }, 50)
			.animate({ opacity: 1 }, 50)
			.animate({ opacity: 0 }, 80)
			.animate({ opacity: 1 }, 50);

		// RESET FORM VALUES
		$("input[name='titulo']")[0].value = "";
		$("textarea[name='descripcion']")[0].value = "";
		$("textarea[name='hyperlink']")[0].value = "";
		$("#tagSearchBox")[0].value = "";
		$("#tagListInForm").empty();


		setupTagSearchBox();
	} else {

		pillContainer.animate({ opacity: 0 }, 50)
			.animate({ opacity: 1 }, 50)
			.animate({ opacity: 0 }, 50)
			.animate({ opacity: 1 }, 50)
			.animate({ opacity: 0 }, 80)
			.animate({ opacity: 1 }, 50, function () {
				// ON COMPLETE	
				document.getElementById("newPill-container").hidden = true;

			});

	}



}

function sendFormData() {

	var formObject = $("#newPillForm");

	var titleForm = $("input[name='titulo']")[0].value;
	var descriptionForm = $("textarea[name='descripcion']")[0].value;
	var hyperlinkForm = $("textarea[name='hyperlink']")[0].value;
	var tagsForm = getTagsInForm();

	if (titleForm != "" && descriptionForm != "" && hyperlinkForm != "" && tagsForm.length != 0) {
		document.getElementById("newPill-container").hidden = true;

		var newPillObject = {
			"title": titleForm,
			"description": descriptionForm,
			"link": hyperlinkForm,
			"tags": tagsForm
		}

		// --- UPDATE STUFF ---

		// ADD TO db OBJECT
		dbData.pills.push(newPillObject);

		// ADD PILL TO DOM
		addNewPillToDOM($(".pill-container"), $(".pill-container").children().first(), dbData.pills[dbData.pills.length - 1]);
		rePositionPill(dbData.pills.length - 1);

		// ADD TAG TO DOM
		tagsForm.forEach(function (element) {
			addTagItem(document.getElementById("tag-container"), element)
		});

		//mixPills();

		//event.preventDefault();

		// SAVE db.JSON, VIA PHP
		/*
		<?php
		$myFile = "data.json";
		$fh = fopen($myFile, 'w') or die("can't open file");
		$stringData = $_GET["data"];
		fwrite($fh, $stringData);
		fclose($fh)
	?>
	*/

		/*
		 * Essentially need to do this:
		 *  curl -X POST -H 'Content-Type: application/json' -H "Accept: application/json"  http://134.122.74.56/borders_flask_server/hello -d '{"name": "bob"}'
		 */ 
		$.ajax
		({
			type: "POST",
			dataType: 'application/json',
			async: false,
			url: 'http://134.122.74.56/borders_flask_server/antenna_to_server',
			data: { data: JSON.stringify(dbData) },
			success: function () { alert("Thanks!"); },
			failure: function () { alert("Error!"); }
		});
	} else {
		alert("Be kind... fill out all fields... Merci beaucoup.!!");
	}
}

function getTagsInForm() {

	var formTags = [];
	if ($("#tagListInForm").children().length != 0) {
		$("#tagListInForm").children().each(function (index, element) {
			if (!formTags.includes(element.textContent)) {
				formTags.push(element.textContent);
			}
		});
	}

	return formTags;
}

function setupTagSearchBox() {
	// SEARCH BOX FUNCTIONALITY IN JQueryUI	

	// tags = getTags();

	$(function () {
		$("#tagSearchBox").autocomplete({
			source: getTags(),
			selectFirst: true,
			select: function (event, ui) {
				var seleccion = ui.item.value;
				// console.log("-|| AT AUTOCOMPLETE EVENT");
				if (!justAddedNewTag) addTagItemInForm(seleccion);
				justAddedNewTag = false;
				ui.item.value = "";
				//console.log("|| Seleccionaste ==> " + seleccion);
			}
		});
	});
}

function addTagItemInForm(seleccion) {

	// INFO: THERE'S A "ENTER" KEY CHECK AT THE TOP OF THE PAGE
	// FOR WHEN THE USER INPUTS A NEW TAG, AND A boolean justAddedNewTag
	// TO HANDLE DOUBLE SELECTION BTW keyCheck and autoComplete

	if (seleccion.trim() != "" && !tagAlreadyEntered(seleccion)) {
		var newTagElement = document.createElement("div");
		newTagElement.setAttribute("class", "tag-button");
		newTagElement.innerText = seleccion;

		$("#tagListInForm").append(newTagElement);

		$("#tagSearchBox")[0].value = "";
	}

	justAddedATagInTheForm = false;

}

function tagAlreadyEntered(tagText) {
	return getTagsInForm().includes(tagText);
}

function getTags() {

	var tags = [];
	var tagContainer = document.getElementById("tag-container").children;

	for (let i = 1; i < tagContainer.length; i++) { // STARTS AT 1 TO IGNORE THE "+ ADD" BUTTON
		var element = tagContainer[i];
		//console.log(element.innerText);
		tags.push(element.innerText);
	}

	return tags;
}

function filterBy(tagName) {
	console.log("At filter");

	//var tags = $("#tag-container").children();

	//  UPDATE TAG DOM STATE
	var thisTag = $("#tag-container div:contains('" + tagName + "')");
	if (thisTag.hasClass("tag-button-selected")) {
		//thisTag.addClass("tag-button");
		thisTag.removeClass("tag-button-selected");
	} else {
		thisTag.addClass("tag-button-selected");
		//thisTag.removeClass("tag-button");
	}


	// GET WHICH TAGS ARE ACTIVE
	var activeTags = [];
	$("#tag-container div").each(function (index, element) {
		if ($(element).hasClass("tag-button-selected")) {
			activeTags.push($(element).text());
		}
	})



	// WHAT PILLS END UP BEING SELECTED
	var selectedPills = [];
	dbData.pills.forEach(function (pillElement, index) {
		activeTags.forEach(function (tagElement) {
			if (pillElement.tags.includes(tagElement)) {
				console.log("--|| Pill" + index + " HAS:" + tagElement)

				selectedPills.push(index);

			}
		})
	})

	// THIS MAGICALLY REMOVES ALL DUPLICATES
	var uniquePills = [...new Set(selectedPills)];

	hidePills(uniquePills);


}

function hidePills(activePills) {



	for (let i = 0; i < $(".pill-container").children().length; i++) {

		var opacity = 0;

		// IF DESELECTING AL TAGS
		if (activePills.length >= 1) {
			if (activePills.includes(i)) {
				opacity = 1;
			} else {
				// $(".pill-container").children().eq(i).hide();
			}
		} else {
			opacity = 1;
		}




		$(".pill-container").children().eq(i).animate({ opacity: 0 }, 50)
			.animate({ opacity: 1 }, 50)
			.animate({ opacity: 0 }, 50)
			.animate({ opacity: 1 }, 50)
			.animate({ opacity: 0 }, 80)
			.animate({ opacity: opacity }, 50);

	}
}
