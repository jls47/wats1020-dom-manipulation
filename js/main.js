//////////////////////////////////////////////////
// WATS1020 Dom Manipulation
// Custom script goes here.
//////////////////////////////////////////////////

//	var voteCounts = {
//        great: 0,
//        greatest: 0,
//        total: 0
//s    };
		//ALRIGHT!  Here it begins!

$( document ).ready(function() {
	//Here we establish a login boolean for use in different functions.
	var login = false;
	//Here's the user info!
    var userInfo = {
        firstName: 'Jerry',
        lastName: 'Brown'
    };
	//Turning off the CSS display settings.
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
	
	//The login function!
	$("#Login").click(function(){
		//Fading out the login form.  Fancy!
		$("#login-form").fadeOut();
		//Setting the userinfo to come in right as the login form fades out.
		setTimeout(function(){$(".user-info").fadeIn();}, 400);
		//Setting the user info to the first and last name
		$(".user-fullname").replaceWith(userInfo.firstName + " " + userInfo.lastName);
		//Lastly, here's the boolean being changed.
		login = true;
	});
	
	//The logout function!
	$("#Logout").click(function(){
		//fading out the user info and fading in the login form right after.
		$(".user-info").fadeOut();
		setTimeout(function(){$("#login-form").fadeIn();}, 400);
		//booleans!
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
	
	//Establishing empty variables for the button text.
	var learnMore = " ";
	var viewDetails = " ";
	
	//View details buttons!
	$(".view-details").click(function(){		
		//grabbing the parent class of the buttons.
		parentClass = $(this).closest("div").attr('class');
		//fancy css!
		$('.'+parentClass).children('.details').slideToggle(300, "linear");
		//The buttons change depending on what text is already in the button.  Differences established for learn/view.
		if($(this).html().toString().includes("earn")){
			learnMore = $(this).html().toString();
			$(this).text("(( Minimize ))");
			console.log("learnMore" + learnMore);
		}else if($(this).html().toString().includes("View")){
			viewDetails = $(this).html().toString();
			$(this).text("(( Hide details ))")
			console.log(viewDetails);
		}else if($(this).html().toString().includes("inimi")){
			console.log(learnMore);
			$(this).text(learnMore);
			
		}else if($(this).html().toString().includes("ide")){
			$(this).text(viewDetails);
		};
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
	
	//establishing this scumbag object.
	var voteCount = {
        great: 0,
        greatest: 0,
        total: 0
    };
	
	//trying to set the attributes to local storage.  Turns out somehow these are not stored when incremented.
	localStorage.setItem("great", 0);
	localStorage.setItem("greatest", 0);
	localStorage.setItem("total: ", 0);
	
	//last resort.  Simply resetting the vote.  Godsake.
	var great1 = 0;
	var greatest1 = 0;
	var total1 = 0;
	
	
	localStorage.setItem('voteCount', JSON.stringify(voteCount));
	//Where it fell apart.  Could not for the life of me get the damned object to return any values to me.
	
	//var retrievedObject = JSON.parse(localStorage.getItem('voteCount.great'));
	//console.log("great + " + Number(localStorage.getItem('great')));
	
	//establishing the click function.
	$(".vote").click(function(){
		//var localGreat = parseInt(localStorage.getItem('voteCount.great'));
		//var localGreat = parseInt(localStorage.getItem('great'));
		//console.log(localStorage.getItem('voteCount.great'));
		//var localGOAT = parseInt(localStorage.getItem('voteCount.greatest'));
		//var localGOAT = parseInt(localStorage.getItem('greatest'));
		
		//If the user is logged in they can vote.
		if(login == true){
			//Figuring out which button the user pressed.  And displaying a message.
			votePick = $(this).attr('data-vote');
			if(votePick === 'greatest'){
				setTimeout(function(){$(".resultsBox").text("Vote counted for the GOAT!");}, 200);
				setTimeout(function(){$(".resultsBox").text(" ");}, 2200);
				//greatest1 = 1 + localGOAT;	
				//console.log(greatest1);
				//console.log(localStorage.getItem('greatest'));
				//localStorage.setItem('voteCount.greatest', greatest.toString());
				//localStorage.setItem('greatest', greatest1.toString());
				//Incrementing the vote count.
				greatest1 += 1;
			}else{
				setTimeout(function(){$(".resultsBox").text("Vote counted for great.");}, 200);
				setTimeout(function(){$(".resultsBox").text(" ");}, 2200);
				//great1 = 1 + localGreat;
				//localStorage.setItem('voteCount.great', great1.toString());
				//localStorage.setItem('great', great1.toString());
				great1 += 1;
			};
			//total1 = localGOAT + localGreat;
			//totaling up the votes.
			total1 = great1 + greatest1;
			//greatestP = Math.floor((localGOAT/total1)*100);
			//gathering the percentages.
			greatestP = Math.floor((greatest1/total1)*100);
			greatP = 100 - greatestP;
			//And modifying the CSS of the bars so that they show percentages!
			$('.great-progress').css("width", greatP+"%");
			$('.greatest-progress').css("width", greatestP+"%");
		}else{
			alert("Users must sign in before they can vote!");
		};
	});
});
