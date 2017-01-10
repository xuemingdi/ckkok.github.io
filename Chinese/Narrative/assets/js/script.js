/*      .#@@@@@@@@@
 @@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@
 `@@@@@@@@@@@@@@@@@@@@@@@@@@##
 @@@@@@@@@@@@@@@@@@@@"

 .@@@@@@@@@@@@@@@@              |========================|
 @@@@@@@ @@@@@@@@              |CODED BY Jaider         |
 @@@@@@@  @@@@@@@             |CPDD2                   |
 @@@@@   :@@@@'           	 |COMPLETED <NEVER ENDING>|
 |========================|
 `@@@@@@@@
 @@@@@@@@@@
 @@     +@@
 @' @@@` @+
 @@`@@@@ @`
 @@@@@@@@@,
 @@@@@@;
 */

var firstClicked = 0, page2 = 0, qnCorrect = 0, pageNumber = 0 , correctDone2 = 0, tableDone = 0, page6 = 0, page9 = 0;
var back = false, menu = false,m1 = false, m2 = false, m3 = false, m4 = false, m5 = false, m6 = false, fromMenu = false, dict = false;

$(document).ready(function() {

	selectedMenu();
	menuBGClick();

	$(window).resize(function() {
		$('#wrapper').css({
			position: 'absolute',
			left: ($(window).width() - $('#wrapper').outerWidth()) / 2,
			top: ($(window).height() - $('#wrapper').outerHeight()) / 2
		});

		var wrapper = 720;
		var windowHeight = window.innerHeight;
		var newHeight = (windowHeight / wrapper);

		if (wrapper >= windowHeight) {

			document.getElementById("wrapper").style.transform = "scale(" + newHeight + ")";
			// document.getElementById("wrapper").style.transformOrigin = "top";
		} else if (wrapper <= windowHeight) {
			document.getElementById("wrapper").style.transform = "scale(1)"
		}
	});
	// To initially run the function:
	$(window).resize();
	// executes when HTML-Document is loaded and DOM is ready
	$("#done1").mouseover(function(e) {
		document.getElementById("done1").className = "blinkSparkleTwo";
	});
	$("#done1").mouseout(function(e) {
		document.getElementById("done1").className = "";
	});
	$("#resubmit").mouseover(function(e) {
		document.getElementById("resubmit").className = "blinkSparkle";
	});
	$("#resubmit").mouseout(function(e) {
		document.getElementById("resubmit").className = "";
	});
	$("#submit").mouseover(function(e) {
		document.getElementById("submit").className = "blinkSparkle";
	});
	$("#submit").mouseout(function(e) {
		document.getElementById("submit").className = "";
	});

	$("#menuButton").mouseover(function(e) {
		document.getElementById("cover2").style.display = "none";
		document.getElementById("menuButton").className = "menuSlideRight";
	});

	$("#menuButton").mouseout(function(e) {
		if(menu === true){
		}else {
			document.getElementById("cover2").style.display = "block";
			document.getElementById("menuButton").className = "menuSlideLeft";
		}
	});
});

function creditsEnded() {
	document.getElementById("startPage").style.display = "block";
	document.getElementById("title").style.animation = "bounceIn 1.7s forwards";
	document.getElementById("creditsPage").style.display = "none";
	document.getElementById("closeButtonQnPopUp").style.display = "none";
}

function buttonClosePopUp() {
	document.getElementById("glossaryBtn").style.display = "none";
	document.getElementById("submit").style.top = "575px";
	document.getElementById("submit").style.left = "505px";
	if (pageNumber === 1) {
		document.getElementById("info").style.display = "none";
		document.getElementById("closeButtonPopUp").style.display = "none";
		document.getElementById("mergeClip").play();
		document.getElementById("objectiveAudio").pause();
		document.getElementById("backButton").style.display = "block";
		document.getElementById("backButton").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("repeatButton").style.display = "block";
		document.getElementById("repeatButton").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("nextButton").style.display = "block";
		document.getElementById("nextButton").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("nextButton").style.pointerEvents = "auto";
		document.getElementById("repeatButton").style.pointerEvents = "auto";
		document.getElementById("backButton").style.pointerEvents = "auto";
		document.getElementById("mergeClip").setAttribute("controls","controls");
		m1 = true;
		if (back !== true) {
			dimButtons();
			document.getElementById("menuButton").style.pointerEvents = "none";
		}
		if (fromMenu === true)
		{
			undimButtons();
		}
		setTimeout(function() {
			document.getElementById("backButton").style.animation = "";
			document.getElementById("repeatButton").style.animation = "";
			document.getElementById("nextButton").style.animation = "";
			document.getElementById("closeButtonPopUp").style.animation = "";
		}, 900);
	} else if (pageNumber === 2) {
		resetOptions();
		document.getElementById("set1").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonPopUp").style.animation = "";
		document.getElementById("infoPopUp").style.animation = "";
		document.getElementById("mergeClip").setAttribute("controls","controls");
		setTimeout(function() {
			buttonShow();
			document.getElementById("set1").style.display = "none";
			document.getElementById("question2").style.display = "none";
			document.getElementById("submit").style.display = "none";
		}, 1200);
		pageNumber--;
		undimButtons();
		qnCorrect = 0;
	} else if (pageNumber === 4) {
		resetOptions2();
		document.getElementById("set2").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
		document.getElementById("qn3read").pause();
		document.getElementById("qn3read").currentTime = 0;
		document.getElementById("optionA3").style.pointerEvents = "none";
		document.getElementById("optionB3").style.pointerEvents = "none";
		document.getElementById("submit").style.pointerEvents = "none";
		document.getElementById("animationClip").setAttribute("controls","controls");
		setTimeout(function() {
			buttonShow();
			document.getElementById("set2").style.display = "none";
			document.getElementById("question3").style.display = "none";
			document.getElementById("submit").style.display = "none";
		}, 1200);
		pageNumber--;
		undimButtons();
		document.getElementById("glossaryBtn").style.display = "block";
		qnCorrect = 2;
	} else if (pageNumber === 5) {
		resetOptions2();
		document.getElementById("blank3").style.display = "none";
		document.getElementById("blank3load").pause();//audio
		document.getElementById("blank3load").currentTime = 0; //audio
		document.getElementById("set3").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
		setTimeout(function() {
			buttonShow();
			document.getElementById("set3").style.display = "none";
			document.getElementById("question4").style.display = "none";
			document.getElementById("submit").style.display = "none";
		}, 1200);
		pageNumber--;
		undimButtons();
		qnCorrect = 3;
	} else if (pageNumber === 8) {
		resetOptions4();
		document.getElementById("set4").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("blank4Clip").setAttribute("controls","controls");
		setTimeout(function() {
			buttonShow();
			document.getElementById("set4").style.display = "none";
			document.getElementById("submit").style.display = "none";
		}, 1200);
		pageNumber--;
		undimButtons();
		document.getElementById("repeatButton").style.display = "none";
		document.getElementById("backButton").style.display = "none";
		qnCorrect = 4;
	} else if (pageNumber === 11) {
		if (qnCorrect === 5) {
			resetOptions2();
		} else {
			resetOptions();
		}
		document.getElementById("set5").style.animation = "zoomOut 1s forwards";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("sixthClip").setAttribute("controls","controls");
		setTimeout(function() {
			buttonShow();
			document.getElementById("set5").style.display = "none";
			document.getElementById("question7").style.display = "none";
			document.getElementById("question8").style.display = "none";
			document.getElementById("question9").style.display = "none";
			document.getElementById("submit").style.display = "none";
		}, 1200);
		pageNumber--;
		undimButtons();
		qnCorrect = 5;
	} else if (pageNumber == 12) {
		document.getElementById("glossaryBtn").style.display = "block";
		if ($("#essay").is(":visible") == true) {
			$(function() {
				$("#essayScroll").scrollTop(0);
			});
			document.getElementById("essayAudio").pause();
			document.getElementById("essayAudio").currentTime = 0;
			document.getElementById("essay").style.display = "none";
			document.getElementById("question" + (qnCorrect + 1)).style.display = "block";
			document.getElementById("showHideEssay").style.display = "block";
			document.getElementById("closeButtonQnPopUp").style.display = "none";
			document.getElementById("submit").style.display = "block";
		} else {
			if (qnCorrect === 9) {
				resetOptions6();
			} else if (qnCorrect === 10) {
				resetOptions2();
			} else if (qnCorrect === 11) {
				resetOptions4();
			}
			document.getElementById("set6").style.animation = "zoomOut 1s forwards";
			document.getElementById("submit").style.animation = "zoomOut 1s forwards";
			setTimeout(function() {
				buttonShow();
				document.getElementById("set6").style.display = "none";
				document.getElementById("question10").style.display = "none";
				document.getElementById("question11").style.display = "none";
				document.getElementById("question12").style.display = "none";
				document.getElementById("submit").style.display = "none";
			}, 600);
			document.getElementById("essay").style.display = "none";
			document.getElementById("showHideEssay").style.display = "none";
			document.getElementById("closeButtonQnPopUp").style.display = "none";
			pageNumber--;
			buttonShow();
			undimButtons();
			qnCorrect = 9;
		}
	}
}
function buttonNextClick() {

	if (pageNumber === 0) {
		document.getElementById("title").style.animation = "";
		document.getElementById("titleSet").style.display = "none";
		document.getElementById("mergeClip").style.display = "block";
		document.getElementById("info").style.display = "block";
		document.getElementById("infoPopUp").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("nextButton").style.display = "none";
		document.getElementById("closeButtonPopUp").style.display = "block";
		document.getElementById("closeButtonPopUp").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("audioInfoOff").style.display = "block";
		document.getElementById("audioInfoOff").style.animation = "fadeIn 2.3s forwards";
	} else if (pageNumber === 1) {
		document.getElementById("set1").style.animation = "";
		document.getElementById("set1").style.display = "block";
		document.getElementById("question1").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("infoPopUp").style.display = "none";
		document.getElementById("mergeClip").pause();
		document.getElementById("mergeClip").removeAttribute("controls");
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
		m2 = true;
	} else if (pageNumber === 2) {
		document.getElementById("animationClip").load();
		document.getElementById("fourthClip").style.display = "none";
		document.getElementById("animationClip").style.display = "block";
		document.getElementById("animationClip").play();
		document.getElementById("animationClip").setAttribute("controls","controls");
		document.getElementById("fourthClip").pause();
		document.getElementById("glossaryBtn").style.display = "block";
		if (back !== true) {
			dimButtons();
			document.getElementById("menuButton").style.pointerEvents = "none";
		}
		if (page2 === 1) {
			undimButtons();
		} else {
			page2 = 1;
		}
	} else if (pageNumber === 3) {
		document.getElementById("set2").style.animation = "";
		document.getElementById("set2").style.display = "block";
		document.getElementById("submit").style.top = "478px";
		document.getElementById("submit").style.left = "793px";
		document.getElementById("question3").style.display = "block";
		document.getElementById("qn3read").play();
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("animationClip").pause();
		document.getElementById("animationClip").removeAttribute("controls");
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	} else if (pageNumber === 4) {
		document.getElementById("blank1Title").style.animation = "";
		document.getElementById("blank3Title").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("blank3").style.display = "block";
		document.getElementById("blank3Sprite").className = "blankBlink";
		document.getElementById("blank3load").play(); //audio
		document.getElementById("blank1load").pause(); //audio
		document.getElementById("blank3Title").style.animation = "";
		document.getElementById("set3").style.animation = "";
		document.getElementById("set3").style.display = "block";
		document.getElementById("question4").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("submit").style.top = "485px";
		document.getElementById("submit").style.left = "764px";
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
		setTimeout(function() {
			document.getElementById("blank3Title").style.animation = "";
		}, 1000);
	} else if (pageNumber === 5) {
		document.getElementById("blank2").style.display = "none";
		document.getElementById("blank2load").pause();
		document.getElementById("blank3Sprite").className = "";
		document.getElementById("fifthClip").style.display = "block";
		document.getElementById("fifthClip").play();
		document.getElementById("fifthClip").setAttribute("controls","controls");

		if (back !== true) {
			dimButtons();
			document.getElementById("menuButton").style.pointerEvents = "none";
		}
		if (firstClicked === 1) {
			undimButtons();
		} else {
			firstClicked = 1;
		}
		buttonShow();
	} else if (pageNumber === 6) {
		document.getElementById("fifthClip").style.display = "none";
		document.getElementById("blank4Clip").style.display = "block";
		document.getElementById("blank4Clip").play();
		document.getElementById("blank4Clip").setAttribute("controls","controls");
		document.getElementById("fifthClip").load();
		document.getElementById("fifthClip").pause();
		document.getElementById("glossaryBtn").style.display = "block";
		if (back !== true) {
			dimButtons();
			document.getElementById("menuButton").style.pointerEvents = "none";
		}
		if (page6 === 1) {
			undimButtons();
		} else {
			page6 = 1;
		}
	} else if (pageNumber === 7) {
		document.getElementById("set4").style.animation = "";
		document.getElementById("set4").style.display = "block";
		document.getElementById("question5").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("glossaryBtn").style.display = "none";
		document.getElementById("blank4Clip").removeAttribute("controls");
		if (document.getElementById("blank4Clip").play) {
			document.getElementById("blank4Clip").pause();
			document.getElementById("blank4Clip").currentTime = 0;
		}
		buttonHide();
	} else if (pageNumber === 8) {
		document.getElementById("table").style.display = "none";
		document.getElementById("revisionSet1").style.display = "block";
		document.getElementById("tableRead").pause();
		document.getElementById("tableRead").currentTime = 0;
		document.getElementById("revision1").style.animation = "fadeIn 2.3s forwards";
		setTimeout(function() {
			document.getElementById("revision1").style.animation = "";
		}, 1000);
		m5 = true;
		//document.getElementById("repeatButton").style.display = "none";
		//document.getElementById("backButton").style.display = "none";
	} else if (pageNumber === 9) {
		document.getElementById("revisionSet1").style.animation = "";
		document.getElementById("revisionSet1").style.display = "none";
		document.getElementById("sixthClip").style.display = "block";
		document.getElementById("sixthClip").play();
		document.getElementById("sixthClip").setAttribute("controls","controls");

		if (back !== true) {
			dimButtons();
		}
		if (page9 === 1) {
			undimButtons();
		} else {
			page9 = 1;
			document.getElementById("menuButton").style.pointerEvents = "none";
		}
		buttonShow();
	} else if (pageNumber === 10) {
		document.getElementById("set5").style.animation = "";
		document.getElementById("set5").style.display = "block";
		document.getElementById("question6").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("sixthClip").pause();
		document.getElementById("sixthClip").currentTime = 0;
		document.getElementById("sixthClip").removeAttribute("controls");
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	} else if (pageNumber === 11) {
		document.getElementById("essay").style.display = "block";
		document.getElementById("essayAudio").play();
		document.getElementById("set6").style.animation = "";
		document.getElementById("set6").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("revisionSet2").style.display = "none";
		document.getElementById("sixthClip").style.display = "none";
		document.getElementById("glossaryBtn").style.display = "block";
		buttonHide();
	} else if (pageNumber === 12) {
		document.getElementById("startPage").style.display = "none";
		document.getElementById("TheEnd").style.display = "none";
		document.getElementById("end").style.display = "block";
	}
	document.getElementById("submit").style.animation = "";
	pageNumber++;
	back = false;
}

function buttonBackClick() {
	back = true;
	document.getElementById("submit").style.top = "575px";
	document.getElementById("submit").style.left = "505px";
	if (pageNumber === 1) {
		document.getElementById("closeButtonPopUp").style.display = "block";
		document.getElementById("closeButtonPopUp").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("nextButton").style.animation = "fadeOut 1.7s forwards";
		document.getElementById("repeatButton").style.animation = "fadeOut 1.7s forwards";
		document.getElementById("backButton").style.animation = "fadeOut 1.7s forwards";
		document.getElementById("info").style.display = "block";
		document.getElementById("infoPopUp").style.display = "block";
		document.getElementById("infoPopUp").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("mergeClip").load();
		document.getElementById("nextButton").style.pointerEvents = "none";
		document.getElementById("repeatButton").style.pointerEvents = "none";
		document.getElementById("backButton").style.pointerEvents = "none";
		setTimeout(function() {
			document.getElementById("nextButton").style.display = "none";
			document.getElementById("repeatButton").style.display = "none";
			document.getElementById("backButton").style.display = "none";
		}, 1200);
		pageNumber++;
	} else if (pageNumber === 2) {
		document.getElementById("fourthClip").load();
		document.getElementById("fourthClip").style.display = "none";
		document.getElementById("mergeClip").style.display = "block";
		document.getElementById("mergeClip").load();
		//document.getElementById("mergeClip").play();
		qnCorrect = 0;
	} else if (pageNumber === 3) {
		document.getElementById("animationClip").load();
		document.getElementById("animationClip").style.display = "none";
		document.getElementById("fourthClip").style.display = "block";
		document.getElementById("fourthClip").load();
		document.getElementById("glossaryBtn").style.display = "none";
		//document.getElementById("fourthClip").play();
		qnCorrect = 2;
	} else if (pageNumber === 4) {
		document.getElementById("animationClip").load();
		//document.getElementById("animationClip").play();
		document.getElementById("blank1").style.display = "none";
		document.getElementById("animationClip").style.display = "block";
		document.getElementById("optionA3").style.pointerEvents = "auto";
		document.getElementById("optionB3").style.pointerEvents = "auto";
		document.getElementById("blank1load").pause();
		document.getElementById("blank1load").currentTime = 0;
		document.getElementById("submit").style.pointerEvents = "none";
		document.getElementById("glossaryBtn").style.display = "block";
		qnCorrect = 2;
	} else if (pageNumber === 5) {
		document.getElementById("blank1Title").style.animation = "fadeIn 2.3s";
		document.getElementById("blank1").style.display = "block";
		document.getElementById("blank2").style.display = "none";
		document.getElementById("blank2load").pause();
		document.getElementById("blank2load").currentTime = 0;
		document.getElementById("blank1load").currentTime = 0;
		document.getElementById("blank1load").play();
		setTimeout(function() {
			document.getElementById("blank1Title").style.animation = "";
		}, 1000);
		qnCorrect = 3;
	} else if (pageNumber === 6) {
		document.getElementById("fifthClip").load();
		document.getElementById("blank2").style.display = "block";
		document.getElementById("blank2Title").style.animation = "fadeIn 2.3s";
		document.getElementById("blank3Sprite").className = "";
		document.getElementById("fifthClip").style.display = "none";
		document.getElementById("blank2load").currentTime = 0;
		document.getElementById("blank2load").play();
		setTimeout(function() {
			document.getElementById("blank2Title").style.animation = "";
		}, 1000);
	} else if (pageNumber === 7) {
		document.getElementById("fifthClip").load();
		//document.getElementById("fifthClip").play();
		document.getElementById("blank4Clip").load();
		document.getElementById("blank4Clip").style.display = "none";
		document.getElementById("fifthClip").style.display = "block";
		document.getElementById("glossaryBtn").style.display = "none";
		qnCorrect = 4;
	} else if (pageNumber === 8) {
		document.getElementById("table").style.display = "none";
		document.getElementById("blank4Clip").style.display = "block";
		document.getElementById("tablePic").style.animation = "";
		document.getElementById("tableRead").pause();
		document.getElementById("tableRead").currentTime = 0;
		document.getElementById("glossaryBtn").style.display = "block";
		//document.getElementById("blank4Clip").play();
		qnCorrect = 4;
	} else if (pageNumber === 9) {
		document.getElementById("table").style.display = "block";
		document.getElementById("revisionSet1").style.display = "none";
		document.getElementById("tableRead").currentTime = 0;
		document.getElementById("tableRead").play();
		document.getElementById("tablePic").style.animation = "fadeInDown 1.8s forwards";
		setTimeout(function() {
			document.getElementById("tablePic").style.animation = "";
		}, 2000);
		//document.getElementById("blank4Clip").play();
		qnCorrect = 5;
	} else if (pageNumber === 10) {
		setTimeout(function() {
			document.getElementById("revision1").style.animation = "";
		}, 1000);
		document.getElementById("revision1").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("sixthClip").load();
		document.getElementById("revisionSet1").style.display = "block";
		document.getElementById("sixthClip").style.display = "none";
		qnCorrect = 5;
	} else if (pageNumber === 11) {
		document.getElementById("sixthClip").load();
		document.getElementById("revisionSet2").style.display = "none";
		document.getElementById("sixthClip").style.display = "block";
		qnCorrect = 5;
	}
	else if (pageNumber === 12){
		document.getElementById("revisionSet2").style.display = "block";
		document.getElementById("wrongAnswerBackground3").style.display = "none";
		document.getElementById("wrongAnswerBackground2").style.display = "block";
		document.getElementById("TheEnd").style.display = "none";
		document.getElementById("repeatButton").style.display = "block";
		qnCorrect = 9;
	}
	pageNumber--;
}

function buttonCorrectDone() {
	qnCorrect++;
	if (qnCorrect === 1) {
		//pop up 2nd question
		document.getElementById("question2").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("qn1correct").pause();
		document.getElementById("qn1correct").currentTime = 0;
	} else if (qnCorrect === 2) {
		//close and go back to clip OR go to next clip
		document.getElementById("mergeClip").style.display = "none";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("fourthClip").style.display = "block";
		document.getElementById("fourthClip").play();
		document.getElementById("set1").style.display = "none";
		document.getElementById("qn2correct").pause();
		document.getElementById("qn2correct").currentTime = 0;
		if (correctDone2 === 1) {
			undimButtons();
		} else {
			correctDone2 = 1;
			dimButtons();
			document.getElementById("menuButton").style.pointerEvents = "none";
		}
		buttonShow();
	} else if (qnCorrect === 3) {
		//close and go back to clip OR go to next clip
		document.getElementById("set2").style.display = "none";
		document.getElementById("qn3correct").pause();
		document.getElementById("qn3correct").currentTime = 0;
		document.getElementById("glossaryBtn").style.display = "none";
		document.getElementById("animationClip").style.display = "none";
		document.getElementById("blank1").style.display = "block";
		document.getElementById("blank1Title").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("blank1load").play();
		document.getElementById("submit").style.top = "575px";
		document.getElementById("submit").style.left = "505px";
		setTimeout(function() {
			document.getElementById("blank1Title").style.animation = "";
		}, 1000);
		buttonShow();
		undimButtons();
		//document.getElementById("backButton").style.display = "none";
		//document.getElementById("repeatButton").style.display = "none";
	} else if (qnCorrect === 4) {
		//close and go back to clip OR go to next clip
		document.getElementById("qn4correct").pause();
		document.getElementById("qn4correct").currentTime = 0;
		document.getElementById("blank2").style.display = "block";
		document.getElementById("blank2Title").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("glossaryBtn").style.display = "none";
		document.getElementById("blank2load").currentTime = 0;
		document.getElementById("blank2load").play();
		document.getElementById("blank3").style.display = "none";
		document.getElementById("blank1").style.display = "none";
		document.getElementById("set3").style.display = "none";
		buttonShow();
		undimButtons();
		document.getElementById("submit").style.top = "575px";
		document.getElementById("submit").style.left = "505px";
		setTimeout(function() {
			document.getElementById("blank2Title").style.animation = "";
		}, 1000);
		//document.getElementById("repeatButton").style.display = "none";
		//document.getElementById("backButton").style.display = "none";
	} else if (qnCorrect === 5) {
		//close and go back to clip OR go to next clip
		document.getElementById("glossaryBtn").style.display = "none";
		document.getElementById("qn5correct").pause();
		document.getElementById("qn5correct").currentTime = 0;
		document.getElementById("tableRead").play();
		document.getElementById("table").style.display = "block";
		document.getElementById("tablePic").style.animation = "fadeInDown 1.8s forwards ";
		document.getElementById("blank4Clip").style.display = "none";
		document.getElementById("set4").style.display = "none";
		setTimeout(function() {
			document.getElementById("tablePic").style.animation = "";
		}, 2000);
		if(m4 === true)
		{buttonShow();undimButtons();}
	} else if (qnCorrect === 6) {
		//go to next question
		document.getElementById("question7").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
	} else if (qnCorrect === 7) {
		//go to next question
		document.getElementById("question8").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
	} else if (qnCorrect === 8) {
		//go to next question
		document.getElementById("question9").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
	} else if (qnCorrect === 9) {
		//go to revision2
		document.getElementById("revision2").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("revisionSet2").style.display = "block";
		document.getElementById("set5").style.display = "none";
		setTimeout(function() {
			document.getElementById("revision2").style.animation = "";
		}, 1000);
		buttonShow();
		undimButtons();
		m6 = true;
	} else if (qnCorrect === 10) {
		//go to next question
		document.getElementById("question11").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("showHideEssay").style.display = "block";
		document.getElementById("glossaryBtn").style.display = "block";
	} else if (qnCorrect === 11) {
		//go to next question
		document.getElementById("question12").style.display = "block";
		document.getElementById("showHideEssay").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("glossaryBtn").style.display = "block";
	} else if (qnCorrect === 12) {
		//go to credit
		document.getElementById("sixthClip").style.display = "none";
		document.getElementById("set6").style.display = "none";
		document.getElementById("TheEnd").style.display = "block";
		document.getElementById("endSprite").className = "endWave";
		buttonShow();undimButtons();
		document.getElementById("repeatButton").style.display = "none";
	}

	document.getElementById("correctAnswer1").style.display = "none";
	document.getElementById("correctAudio").pause();
	document.getElementById("correctAudio").currentTime = 0;
}

function buttonHide() {
	document.getElementById("backButton").style.display = "none";
	document.getElementById("repeatButton").style.display = "none";
	document.getElementById("nextButton").style.display = "none";
}

function buttonShow() {
	document.getElementById("backButton").style.display = "block";
	document.getElementById("repeatButton").style.display = "block";
	document.getElementById("nextButton").style.display = "block";
}

function buttonSoundClick() {
	var audio = document.getElementById("essayAudio");
	var infoAudio = document.getElementById("objectiveAudio");
	if (audio.muted === false) {
		audio.muted = true;
		document.getElementById("audioOff").style.display = "block";
		document.getElementById("audioOn").style.display = "none";
	} else {
		audio.muted = false;
		document.getElementById("audioOn").style.display = "block";
		document.getElementById("audioOff").style.display = "none";
	}
	if ($("#audioInfoOff").is(":visible")) {
		infoAudio.play();
		document.getElementById("audioInfoOff").style.animation = "";
		document.getElementById("audioInfoOff").style.display = "none";
		document.getElementById("audioInfoOn").style.display = "block";
	} else {
		infoAudio.pause();
		document.getElementById("audioInfoOff").style.animation = "";
		document.getElementById("audioInfoOn").style.display = "none";
		document.getElementById("audioInfoOff").style.display = "block";
	}
}

function dimButtons() {
	document.getElementById("coverupDiv").style.display = "block";
	document.getElementById("nextButton").style.opacity = "0.65";
	document.getElementById("backButton").style.opacity = "0.65";
	document.getElementById("repeatButton").style.opacity = "0.65";
	document.getElementById("repeatButton").className = "grayScaleRepeat";
	document.getElementById("backButton").className = "grayScaleBack";
	document.getElementById("nextButton").className = "grayScaleNext";
}

function undimButtons() {
	document.getElementById("coverupDiv").style.display = "none";
	document.getElementById("nextButton").style.opacity = "1";
	document.getElementById("backButton").style.opacity = "1";
	document.getElementById("repeatButton").style.opacity = "1";
	document.getElementById("repeatButton").className = "nograyScaleRepeat";
	document.getElementById("backButton").className = "nograyScaleBack";
	document.getElementById("nextButton").className = "nograyScaleNext";
	document.getElementById("menuButton").style.pointerEvents = "auto";
}

function buttonRepeatClick() {
	//dimButtons();
	if (pageNumber === 1) {
		document.getElementById("mergeClip").currentTime = 0;
		document.getElementById("mergeClip").play();
	} else if (pageNumber === 2) {
		document.getElementById("fourthClip").currentTime = 0;
		document.getElementById("fourthClip").play();
	} else if (pageNumber === 3) {
		document.getElementById("animationClip").currentTime = 0;
		document.getElementById("animationClip").play();
	} else if (pageNumber === 4) {
		setTimeout(function () {
			document.getElementById("blank1Title").style.animation = "";
		}, 1000);
		//setTimeout(function() {
		document.getElementById("blank1load").currentTime = 0;
		document.getElementById("blank1load").play();
		document.getElementById("blank1Title").style.animation = "";
		document.getElementById("blank1Title").style.animation = "fadeIn 2.3s forwards";
		//	}, 2000);
	} else if (pageNumber === 5) {
		setTimeout(function () {
			document.getElementById("blank2Title").style.animation = "";
		}, 1000);
		document.getElementById("blank2Title").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("blank2load").currentTime = 0;
		document.getElementById("blank2load").play();
	} else if (pageNumber === 6) {
		document.getElementById("fifthClip").currentTime = 0;
		document.getElementById("fifthClip").play();
	} else if (pageNumber === 7) {
		document.getElementById("blank4Clip").currentTime = 0;
		document.getElementById("blank4Clip").play();
	} else if (pageNumber === 8) {

		document.getElementById("tablePic").style.animation = "fadeInDown 1.8s forwards ";
		setTimeout(function () {
			document.getElementById("tablePic").style.animation = "";
		}, 2000);
		document.getElementById("tableRead").currentTime = 0;
		document.getElementById("tableRead").play();
	} else if (pageNumber === 9) {
		setTimeout(function () {
			document.getElementById("revision1").style.animation = "";
		}, 1000);
		document.getElementById("revision1").style.animation = "fadeIn 2.3s forwards";
	} else if (pageNumber === 10) {
		document.getElementById("sixthClip").currentTime = 0;
		document.getElementById("sixthClip").play();
	} else if (pageNumber === 11) {
		setTimeout(function () {
			document.getElementById("revision2").style.animation = "";
		}, 1000);
		document.getElementById("revision2").style.animation = "fadeIn 2.3s forwards";
	}
}

function optionAClick() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionA2Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionA4Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionBClick() {
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionB2Click() {
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionB4Click() {
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionCClick() {
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionC4Click() {
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionD4Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionA6Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionB6Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionC6Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionD6Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionE6Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionF6Click() {
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionA12Click() {
	if ($("#optionA12").is(":visible")) {
		document.getElementById("optionA12Selected").style.display = "block";
		document.getElementById("optionA12").style.display = "none";
	} else {
		document.getElementById("optionA12Selected").style.display = "none";
		document.getElementById("optionA12").style.display = "block";
	}
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionB12Click() {
	if ($("#optionB12").is(":visible")) {
		document.getElementById("optionB12Selected").style.display = "block";
		document.getElementById("optionB12").style.display = "none";
	} else {
		document.getElementById("optionB12Selected").style.display = "none";
		document.getElementById("optionB12").style.display = "block";
	}
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionC12Click() {
	if ($("#optionC12").is(":visible")) {
		document.getElementById("optionC12Selected").style.display = "block";
		document.getElementById("optionC12").style.display = "none";
	} else {
		document.getElementById("optionC12Selected").style.display = "none";
		document.getElementById("optionC12").style.display = "block";
	}
	document.getElementById("submit").style.pointerEvents = "auto";
}

function optionD12Click() {
	if ($("#optionD12").is(":visible")) {
		document.getElementById("optionD12Selected").style.display = "block";
		document.getElementById("optionD12").style.display = "none";
	} else {
		document.getElementById("optionD12Selected").style.display = "none";
		document.getElementById("optionD12").style.display = "block";
	}
	document.getElementById("submit").style.pointerEvents = "auto";
}


function buttonSubmitClick() {
	document.getElementById("glossaryBtn").style.display = "none";
	if (qnCorrect === 0) {
		if ($("#optionC1Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			document.getElementById("qn1correct").play();
			document.getElementById("correctAudio").play();
			resetOptions();
		} else {
			document.getElementById("wrongAnswer").style.display = "block";
			document.getElementById("wrongAudio").play();
			document.getElementById("qn1wrong").play();
			document.getElementById("wrongAnswerBackground2").style.display = "none";
			document.getElementById("wrongAnswerBackground1").style.display = "block";
		}
	} else if (qnCorrect === 1) {
		if ($("#optionB2Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			document.getElementById("qn2correct").play();
			resetOptions();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
			document.getElementById("qn2wrong").play();
		}
		document.getElementById("wrongAnswerBackground1").style.display = "none";
		document.getElementById("wrongAnswerBackground2").style.display = "block";
	} else if (qnCorrect === 2) {
		document.getElementById("qn3read").pause();
		document.getElementById("qn3read").currentTime = 0;
		if ($("#optionA3Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			document.getElementById("qn3correct").play();
			resetOptions2();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
	} else if (qnCorrect === 3) {
		document.getElementById("blank3load").pause();
		document.getElementById("blank3load").currentTime = 0;
		if ($("#optionB4Selected").is(":visible")) {
			document.getElementById("qn4correct").play();
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions2();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
	} else if (qnCorrect === 4) {
		if ($("#optionB5Selected").is(":visible")) {
			document.getElementById("qn5correct").play();
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions4();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
			document.getElementById("qn5wrong").play();
		}
	} else if (qnCorrect === 5) {
		if ($("#optionA6Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions2();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
	} else if (qnCorrect === 6) {
		if ($("#optionC7Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
	} else if (qnCorrect === 7) {
		if ($("#optionB8Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
	} else if (qnCorrect === 8) {
		if ($("#optionB9Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
	} else if (qnCorrect === 9) {
		if ($("#optionE10Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions6();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
		document.getElementById("showHideEssay").style.display = "none";
	} else if (qnCorrect === 10) {
		if ($("#optionB11Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions2();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
		}
		document.getElementById("showHideEssay").style.display = "none";
	} else if (qnCorrect === 11) {
		if ($("#optionA12Selected").is(":visible") && $("#optionB12Selected").is(":visible") && $("#optionC12Selected").is(":visible") && $("#optionD12Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions4();
			document.getElementById("correctAudio").play();
		} else {
			document.getElementById("wrongAudio").play();
			document.getElementById("wrongAnswer").style.display = "block";
			document.getElementById("wrongAnswerBackground2").style.display = "none";
			document.getElementById("wrongAnswerBackground3").style.display = "block";
		}
		document.getElementById("showHideEssay").style.display = "none";
	}
	document.getElementById("question" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("submit").style.pointerEvents = "none";
	document.getElementById("submit").style.display = "none";
	document.getElementById("closeButtonQnPopUp").style.display = "none";
}

function buttonResubmit() {
	if (qnCorrect === 0) {
		resetOptions();
		document.getElementById("qn1wrong").pause();
		document.getElementById("qn1wrong").currentTime = 0;
	} else if (qnCorrect === 1) {
		resetOptions();
		document.getElementById("qn2wrong").pause();
		document.getElementById("qn2wrong").currentTime = 0;
	} else if (qnCorrect === 2) {
		document.getElementById("glossaryBtn").style.display = "block";
		resetOptions2();
	} else if (qnCorrect === 3) {
		document.getElementById("glossaryBtn").style.display = "block";
		resetOptions2();
	} else if (qnCorrect === 4) {
		resetOptions4();
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("qn5wrong").pause();
		document.getElementById("qn5wrong").currentTime = 0;
	} else if (qnCorrect === 5) {
		resetOptions2();
	} else if (qnCorrect === 6) {
		resetOptions();
	} else if (qnCorrect === 7) {
		resetOptions();
	} else if (qnCorrect === 8) {
		resetOptions();
	} else if (qnCorrect === 9) {
		resetOptions6();
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("showHideEssay").style.display = "none";
	} else if (qnCorrect === 10) {
		resetOptions2();
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("showHideEssay").style.display = "none";
	} else if (qnCorrect === 11) {
		resetOptions4();
		document.getElementById("glossaryBtn").style.display = "block";
		document.getElementById("showHideEssay").style.display = "none";
	}
	document.getElementById("question" + (qnCorrect + 1)).style.display = "block";
	if ($("#set6").is(":visible")) {
		document.getElementById("showHideEssay").style.display = "block";
	} else {
		document.getElementById("closeButtonQnPopUp").style.display = "block";
	}
	document.getElementById("wrongAnswer").style.display = "none";
	document.getElementById("wrongAudio").pause();
	document.getElementById("wrongAudio").currentTime = 0;
	document.getElementById("submit").style.display = "block";
}

function resetOptions() {
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
}

function resetOptions2() {
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
}

function resetOptions4() {
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
}

function resetOptions6() {
	document.getElementById("optionC" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionB" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionA" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionC" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionA" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionB" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionD" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionD" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionE" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionE" + (qnCorrect + 1)).style.display = "block";
	document.getElementById("optionF" + (qnCorrect + 1) + "Selected").style.display = "none";
	document.getElementById("optionF" + (qnCorrect + 1)).style.display = "block";
}

function clipEnded() {
	undimButtons();
	buttonShow();
	if(pageNumber === 7)
	{
		m3 = true;
	}
}

function tableEnd() {
	buttonShow();
	undimButtons();
	document.getElementById("tableRead").pause();
	document.getElementById("tableRead").currentTime = 0;
	undimButtons();
	buttonShow();
	m4 = true;
}


function qn3End() {
	document.getElementById("optionA" + (qnCorrect + 1)).style.pointerEvents = "auto";
	document.getElementById("optionB" + (qnCorrect + 1)).style.pointerEvents = "auto";
	document.getElementById("qn3read").pause();
	document.getElementById("qn3read").currentTime = 0;
}

function showHideEssay() {
	document.getElementById("essay").style.display = "block";
	document.getElementById("question" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("showHideEssay").style.display = "none";
	document.getElementById("essayAudio").currentTime = 0;
	document.getElementById("essayAudio").play();
	document.getElementById("closeButtonQnPopUp").style.display = "block";
	document.getElementById("submit").style.display = "none";
}

function buttonMenu() {
	if (menu === false) {
		document.getElementById("menuOptions").style.display = "block";
		document.getElementById("menuOptions").style.animation = "fadeInDown 0.8s forwards";
		document.getElementById("menuBG").style.display = "block";
		menu = true;
		//showHideAvailability();
	}else {
		document.getElementById("menuOptions").style.display = "none";
		document.getElementById("menuBG").style.display = "none";
		document.getElementById("menuOptions").style.animation = "";
		menu = false;
	}
}

function selectedMenu(){
	$(".menuItem").click(function(event) {
		resetQn();
		hideAllPages();
		document.getElementById("menuButton").className = "menuSlideLeft";
		document.getElementById("glossaryBtn").style.display = "none";

		switch(event.target.id){
			case "Menu1":
				document.getElementById("mergeClip").style.display = "block";
				document.getElementById("info").style.display = "block";
				document.getElementById("infoPopUp").style.display = "block";
				document.getElementById("infoPopUp").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("closeButtonPopUp").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("closeButtonPopUp").style.display = "block";
				document.getElementById("mergeClip").removeAttribute("controls");
				setTimeout(function() {
					document.getElementById("infoPopUp").style.animation = "";
					document.getElementById("closeButtonPopUp").style.animation = "";
				}, 1800);
				buttonHide();undimButtons();
				pageNumber = 1;
				qnCorrect = 0;
				fromMenu = true;
				break;

			case "Menu2":
				document.getElementById("mergeClip").style.display = "block";
				document.getElementById("closeButtonPopUp").style.display = "none";
				document.getElementById("mergeClip").play();
				document.getElementById("mergeClip").setAttribute("controls","controls");
				document.getElementById("backButton").style.display = "block";
				document.getElementById("backButton").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("repeatButton").style.display = "block";
				document.getElementById("repeatButton").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("nextButton").style.display = "block";
				document.getElementById("nextButton").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("nextButton").style.pointerEvents = "auto";
				document.getElementById("repeatButton").style.pointerEvents = "auto";
				document.getElementById("backButton").style.pointerEvents = "auto";
				document.getElementById("closeButtonQnPopUp").style.display = "none";
				document.getElementById("submit").style.display = "none";
				undimButtons();
				pageNumber = 1;
				qnCorrect = 0;
				break;

			case "Menu3":
				document.getElementById("mergeClip").style.display = "none";
				document.getElementById("closeButtonQnPopUp").style.display = "none";
				document.getElementById("glossaryBtn").style.display = "block";
				document.getElementById("blank4Clip").style.display = "block";
				document.getElementById("wrongAnswerBackground2").style.display = "block";
				document.getElementById("blank4Clip").play();
				document.getElementById("blank4Clip").setAttribute("controls","controls");
				buttonShow();undimButtons();
				pageNumber = 7;
				qnCorrect = 4;
				break;

			case "Menu4":
				document.getElementById("tableRead").play();
				document.getElementById("table").style.display = "block";
				document.getElementById("tablePic").style.animation = "fadeInDown 1.8s forwards ";
				document.getElementById("wrongAnswerBackground2").style.display = "block";
				buttonShow();undimButtons();
				setTimeout(function() {
					document.getElementById("tablePic").style.animation = "";
				}, 2000);
				pageNumber = 8;
				qnCorrect = 5;
				break;

			case "Menu5":
				setTimeout(function() {
					document.getElementById("revision1").style.animation = "";
				}, 1000);
				document.getElementById("revision1").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("wrongAnswerBackground2").style.display = "block";
				document.getElementById("revisionSet1").style.display = "block";
				document.getElementById("tableRead").pause();
				document.getElementById("tableRead").currentTime = 0;
				buttonShow();undimButtons();
				pageNumber = 9;
				qnCorrect = 5;
				break;

			case "Menu6":
				setTimeout(function() {
					document.getElementById("revision2").style.animation = "";
				}, 1000);
				document.getElementById("revision2").style.animation = "fadeIn 2.3s forwards";
				document.getElementById("wrongAnswerBackground2").style.display = "block";
				document.getElementById("revisionSet2").style.display = "block";
				buttonShow();undimButtons();
				pageNumber = 11;
				qnCorrect = 9;
				break;
		}
	});
}

function menuBGClick(){
	$(".noClick").click(function(event) {
		document.getElementById("menuOptions").style.display = "none";
		document.getElementById("menuBG").style.display = "none";
		document.getElementById("menuButton").className = "menuSlideLeft";
		menu = false;
	});
}

function hideAllPages() {
	document.getElementById("menuOptions").style.display = "none";
	document.getElementById("menuBG").style.display = "none";
	menu = false;

	document.getElementById("titleSet").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("revisionSet1").style.display = "none";
	document.getElementById("revisionSet2").style.display = "none";
	document.getElementById("correctAnswer1").style.display = "none";
	document.getElementById("wrongAnswer").style.display = "none";
	document.getElementById("wrongAnswerBackground1").style.display = "none";
	document.getElementById("wrongAnswerBackground2").style.display = "none";
	document.getElementById("wrongAnswerBackground3").style.display = "none";
	document.getElementById("blank1").style.display = "none";
	document.getElementById("blank2").style.display = "none";
	document.getElementById("blank3").style.display = "none";
	document.getElementById("set1").style.display = "none";
	document.getElementById("set2").style.display = "none";
	document.getElementById("set3").style.display = "none";
	document.getElementById("set4").style.display = "none";
	document.getElementById("set5").style.display = "none";
	document.getElementById("set6").style.display = "none";
	document.getElementById("mergeClip").style.display = "none";
	document.getElementById("fourthClip").style.display = "none";
	document.getElementById("animationClip").style.display = "none";
	document.getElementById("fifthClip").style.display = "none";
	document.getElementById("sixthClip").style.display = "none";
	document.getElementById("blank4Clip").style.display = "none";
	document.getElementById("table").style.display = "none";
	document.getElementById("submit").style.display = "none";
	document.getElementById("question2").style.display = "none";
	document.getElementById("TheEnd").style.display = "none";

	document.getElementById("mergeClip").pause();
	document.getElementById("fourthClip").pause();
	document.getElementById("fifthClip").pause();
	document.getElementById("sixthClip").pause();
	document.getElementById("blank4Clip").pause();
	document.getElementById("animationClip").pause();

	document.getElementById("mergeClip").currentTime = 0;
	document.getElementById("fourthClip").currentTime = 0;
	document.getElementById("fifthClip").currentTime = 0;
	document.getElementById("sixthClip").currentTime = 0;
	document.getElementById("blank4Clip").currentTime = 0;
	document.getElementById("animationClip").currentTime = 0;

	document.getElementById("essayAudio").pause();
	document.getElementById("essayAudio").currentTime = 0;
	document.getElementById("qn1correct").pause();
	document.getElementById("qn1correct").currentTime = 0;
	document.getElementById("qn1wrong").pause();
	document.getElementById("qn1wrong").currentTime = 0;
	document.getElementById("qn2correct").pause();
	document.getElementById("qn2correct").currentTime = 0;
	document.getElementById("qn2wrong").pause();
	document.getElementById("qn2wrong").currentTime = 0;
	document.getElementById("qn3correct").pause();
	document.getElementById("qn3correct").currentTime = 0;
	document.getElementById("qn3read").pause();
	document.getElementById("qn3read").currentTime = 0;
	document.getElementById("qn4correct").pause();
	document.getElementById("qn4correct").currentTime = 0;
	document.getElementById("qn5correct").pause();
	document.getElementById("qn5correct").currentTime = 0;
	document.getElementById("qn5wrong").pause();
	document.getElementById("qn5wrong").currentTime = 0;
	document.getElementById("qn5read").pause();
	document.getElementById("qn5read").currentTime = 0;
	document.getElementById("tableRead").pause();
	document.getElementById("tableRead").currentTime = 0;
	document.getElementById("blank1load").pause();
	document.getElementById("blank1load").currentTime = 0;
	document.getElementById("blank2load").pause();
	document.getElementById("blank2load").currentTime = 0;
	document.getElementById("blank3load").pause();
	document.getElementById("blank3load").currentTime = 0;
	document.getElementById("correctAudio").pause();
	document.getElementById("correctAudio").currentTime = 0;
	document.getElementById("wrongAudio").pause();
	document.getElementById("wrongAudio").currentTime = 0;
	document.getElementById("objectiveAudio").pause();
	document.getElementById("objectiveAudio").currentTime = 0;

	document.getElementById("closeButtonPopUp").style.display = "none";
	document.getElementById("closeButtonQnPopUp").style.display = "none";
	document.getElementById("submit").style.top = "575px";
	document.getElementById("submit").style.left = "505px";
}

function buttonDictionary() {
	document.getElementById("sheilaVidDict").style.display = "none";
	document.getElementById("qn3Dict").style.display = "none";
	document.getElementById("qn4Dict").style.display = "none";
	document.getElementById("qn5Dict").style.display = "none";
	document.getElementById("essayDictScroll").style.display = "none";
	if (dict === false) {
		dict = true;
		document.getElementById("dictionary").style.animation = "fadeIn 1s";
		document.getElementById("dictionary").style.display = "block";
		if (pageNumber === 3) {
			document.getElementById("sheilaVidDict").style.display = "block";
			document.getElementById("animationClip").pause();
		} else if (pageNumber === 4) {
			document.getElementById("qn3Dict").style.display = "block";
		} else if (pageNumber === 5) {
			document.getElementById("qn4Dict").style.display = "block";
		} else if (pageNumber === 7) {
			document.getElementById("essayDictScroll").style.display = "block";
			document.getElementById("blank4Clip").pause();

			$(function () {
				$("#essayDictScroll").scrollTop(0);
			});
			document.getElementById("qn5Dict").style.display = "block";
		} else if (pageNumber === 12) {
			document.getElementById("essayDictScroll").style.display = "block";
			$(function () {
				$("#essayDictScroll").scrollTop(0);
			});
			document.getElementById("essayDict").style.display = "block";
		}
		setTimeout(function () {
			document.getElementById("dictionary").style.animation = "";
		}, 800);
	}
	else {
		dict = false;
		if (pageNumber === 3) {
			document.getElementById("animationClip").play();
		}
		if (pageNumber === 7) {
			document.getElementById("blank4Clip").play();
		}
		setTimeout(function () {
			document.getElementById("dictionary").style.animation = "";
			document.getElementById("dictionary").style.display = "none";
		}, 800);
		document.getElementById("dictionary").style.animation = "fadeOut 1s";
	}
}

function resetQn(){
	if(pageNumber === 2){
		if(document.getElementById("set1").style.display === "block") {
			resetOptions();
			document.getElementById("question2").style.display = "none";
		}
	}
	else if (pageNumber === 4 || pageNumber === 6) {
		if (document.getElementById("set2").style.display === "block" || document.getElementById("set3").style.display === "block") {
			resetOptions2();
			document.getElementById("question3").style.display = "none";
			document.getElementById("question4").style.display = "none";
		}
	}
	else if (pageNumber === 8){
		if(document.getElementById("table").style.display === "none"){
			resetOptions4();
		}
	}
	else if (pageNumber === 11) {
		if (document.getElementById("set5").style.display === "block") {
			if (qnCorrect === 5) {
				resetOptions2();
			} else {
				resetOptions();
			}
			document.getElementById("question7").style.display = "none";
			document.getElementById("question8").style.display = "none";
			document.getElementById("question9").style.display = "none";
		}
	}
	else if (pageNumber === 12) {
		if (document.getElementById("set6").style.display === "block") {
			if (qnCorrect === 9) {
				resetOptions6();
			} else if (qnCorrect === 10) {
				resetOptions2();
			} else if (qnCorrect === 11) {
				resetOptions4();
			}
			document.getElementById("question10").style.display = "none";
			document.getElementById("question11").style.display = "none";
			document.getElementById("question12").style.display = "none";
		}
	}
}