//////////////////////////////////////////////////
// WATS1020 Dom Manipulation
// Custom script goes here.
//////////////////////////////////////////////////

	var voteCounts = {
        great: 0,
        greatest: 0,
        total: 0
    };
		

$( document ).ready(function() {
	var login = false;
    var userInfo = {
        firstName: 'Jerry',
        lastName: 'Brown'
    };
	$(".details").css("display", "inherit");
	$(".details").hide();
    
    // Place all your Javascript code inside this "document ready" function so
    // it does not run until the DOM is ready for Javascript manipulation.

    // TODO: Create a function to listen for clicks on the "login" button.
    //      1. When a user clicks the "login" button, hide the login
    //          form elements on the page.
    //      2. Fill the user's first and last name into `div.user-info`.
    //      (NOTE: You do not have to perform any validation on the data as
    //          a base requirement.)
	
	$("#Login").click(function(){
		$("#login-form").fadeOut();
		setTimeout(function(){$(".user-info").fadeIn();}, 400);
		//do the first and last
		$(".user-fullname").replaceWith(userInfo.firstName + " " + userInfo.lastName);
		login = true;
	});
	
	$("#Logout").click(function(){
		$(".user-info").fadeOut();
		setTimeout(function(){$("#login-form").fadeIn();}, 400);
		login = false;
	});
	

    // TODO: Create a function to listen for clicks on all the "View Details"
    // buttons so that when a user clicks a "View Details" button they see
    // the content contained in the elements with the class "details" in the
    // proper part of the screen.
    //      1. When user clicks a "view details" button, find the parent of that element.
    //      2. Within that parent, find all the elements that have the class `details`.
    //      3. Toggle visibility of all the elements within that parent with the class `details`.
    //      4. Change the text of the "view details" button to read "hide details" so the user
    //          understands they can hide the text again.
	//var showing = false;
	var learnMore = " ";
	var viewDetails = " ";
	$(".view-details").click(function(){		
		parentClass = $(this).closest("div").attr('class');
		//console.log(parentClass);
		$('.'+parentClass).children('.details').slideToggle(300, "linear");
		$('.'+parentClass).children('.details').toggleClass("details-change");
		
		if($(this).html().toString().includes("earn")){
			learnMore = $(this).html().toString();
			$(this).text("(( Minimize ))");
			console.log("learnMore" + learnMore);
		//	showing = true;
		}else if($(this).html().toString().includes("View")){
			viewDetails = $(this).html().toString();
			$(this).text("(( Hide details ))")
			console.log(viewDetails);
		//	showing = true;
		}else if($(this).html().toString().includes("inimi")){
			console.log(learnMore);
			$(this).text(learnMore);
			
		}else if($(this).html().toString().includes("ide")){
			$(this).text(viewDetails);
		};
		//need to toggle
	});

    // TODO: Create a function that listens for clicks on the voting buttons and
    // looks at the `data-vote` attribute on each button to see what was voted for,
    // then determines the updated vote breakdown to adjust the progress bars.
    //      1. Set up an event listener on the buttons with the `vote` class.
    //      2. When a button is clicked, look at the `data-vote` attribute to determine
    //          what the user is voting for ("great" or "greatest").
    //      3. Increment the counter for whichever vote talley is affected.
    //      4. Determine the respective percentages (out of 100) for each progress bar.
    //      5. Modify the `width` attribute on each progress bar to set the updated percentage.
	var voteCount = {
        great: 0,
        greatest: 0,
        total: 0
    };
	
	var great = 0;
	var greatest = 0;
	var total = 0;
	
	localStorage.setItem('voteCount', JSON.stringify(voteCount));
	
	$(".vote").click(function(){
		var localGreat = parseInt(localStorage.getItem('voteCount.great'));
		var localGOAT = parseInt(localStorage.getItem('voteCount.greatest'));
		if(login == true){
			votePick = $(this).attr('data-vote');
			if(votePick === 'greatest'){
				setTimeout(function(){$(".resultsBox").text("Vote counted for the GOAT!");}, 200);
				setTimeout(function(){$(".resultsBox").text(" ");}, 2200);
				greatest = 1 + localGOAT;	
				console.log(greatest);
				localStorage.setItem('voteCount.greatest', greatest);
			}else{
				setTimeout(function(){$(".resultsBox").text("Vote counted for great.");}, 200);
				setTimeout(function(){$(".resultsBox").text(" ");}, 2200);
				great = 1 + localGreat;
				localStorage.setItem('voteCount.great', great);
			};
			total = localGOAT + localGreat;
			greatestP = Math.floor((localGOAT/total)*100);
			greatP = 100 - greatestP;
			$('.great-progress').css("width", greatP+"%");
			$('.greatest-progress').css("width", greatestP+"%");
		}else{
			alert("Users must sign in before they can vote!");
		};
	});
});
