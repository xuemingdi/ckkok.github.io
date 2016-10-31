/*      .#@@@@@@@@@
 @@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@
 `@@@@@@@@@@@@@@@@@@@@@@@@@@##
 @@@@@@@@@@@@@@@@@@@@"

 .@@@@@@@@@@@@@@@@            |========================|
 @@@@@@@ @@@@@@@@            |CODED BY Jaider         |
 @@@@@@@  @@@@@@@           |CPDD2                   |
 @@@@@   :@@@@'            |COMPLETED <NEVER ENDING>|
                          |========================|
 `@@@@@@@@
 @@@@@@@@@@
 @@     +@@
 @' @@@` @+
 @@`@@@@ @`
 @@@@@@@@@,
 @@@@@@;
 */
var firstClicked = 0;
var page7 = 0;
var page10 = 0;
var page2 = 0;
var qn5Done = 0;
var correctDone2 = 0;
var pageNumber = 0;
var back = false;

$(document).ready(function() {

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
});

function creditsEnded() {
	document.getElementById("startPage").style.display = "block";
	document.getElementById("title").style.animation = "bounceIn 1.7s forwards";
	document.getElementById("creditsPage").style.display = "none";
	document.getElementById("closeButtonQnPopUp").style.display = "none";
}

function buttonClosePopUp() {
	if (pageNumber === 1) {
		document.getElementById("info").style.display = "none";
		document.getElementById("closeButtonPopUp").style.display = "none";
		document.getElementById("mergeClip").play();
		document.getElementById("backButton").style.display = "block";
		document.getElementById("backButton").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("repeatButton").style.display = "block";
		document.getElementById("repeatButton").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("nextButton").style.display = "block";
		document.getElementById("nextButton").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("nextButton").style.pointerEvents = "auto";
		document.getElementById("repeatButton").style.pointerEvents = "auto";
		document.getElementById("backButton").style.pointerEvents = "auto";
		if (back !== true) {
			dimButtons();
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
		setTimeout(function() {
			buttonShow();
			document.getElementById("set2").style.display = "none";
			document.getElementById("question3").style.display = "none";
			document.getElementById("submit").style.display = "none";
		}, 1200);
		pageNumber--;
		undimButtons();
		qnCorrect = 2;
	} else if (pageNumber === 6) {
		resetOptions2();
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
	} else if (pageNumber === 9) {
		resetOptions4();
		document.getElementById("set4").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
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
	} else if (pageNumber === 12) {
		if (qnCorrect === 5) {
			resetOptions2();
		} else {
			resetOptions();
		}
		document.getElementById("set5").style.animation = "zoomOut 1s forwards";
		document.getElementById("submit").style.animation = "zoomOut 1s forwards";
		document.getElementById("closeButtonQnPopUp").style.display = "none";
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
	} else if (pageNumber == 13) {
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
				resetOptions();
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
	console.log(pageNumber + "after close");
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
	} else if (pageNumber === 1) {
		document.getElementById("set1").style.animation = "";
		document.getElementById("set1").style.display = "block";
		document.getElementById("question1").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("infoPopUp").style.display = "none";
		if (document.getElementById("mergeClip").play) {
			document.getElementById("mergeClip").pause();
		}
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	} else if (pageNumber === 2) {
		document.getElementById("animationClip").load();
		document.getElementById("fourthClip").style.display = "none";
		document.getElementById("animationClip").style.display = "block";
		document.getElementById("animationClip").play();
		if (document.getElementById("fourthClip").play) {
			document.getElementById("fourthClip").pause();
		}
		if (back !== true) {
			dimButtons();
		}
		if (page2 === 1) {
			undimButtons();
		} else {
			page2 = 1;
		}
	} else if (pageNumber === 3) {
		document.getElementById("set2").style.animation = "";
		document.getElementById("set2").style.display = "block";
		document.getElementById("question3").style.display = "block";
		document.getElementById("qn3read").play();
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		if (document.getElementById("animationClip").play) {
			document.getElementById("animationClip").pause();
		}
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	} else if (pageNumber === 4) {
		document.getElementById("blank1Title").style.animation = "";
		document.getElementById("blank3Title").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("blank3Sprite").className = "blankBlink";
		document.getElementById("blank3").style.display = "block";
		document.getElementById("blank3load").play(); //audio
		document.getElementById("blank1load").pause(); //audio
		document.getElementById("blank1").style.display = "none";
	} else if (pageNumber === 5) {
		document.getElementById("blank3Title").style.animation = "";
		document.getElementById("blank3load").pause();
		document.getElementById("set3").style.animation = "";
		document.getElementById("set3").style.display = "block";
		document.getElementById("question4").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	} else if (pageNumber === 6) {
		document.getElementById("blank2").style.display = "none";
		document.getElementById("blank2load").pause();
		document.getElementById("blank3Sprite").className = "";
		document.getElementById("fifthClip").style.display = "block";
		document.getElementById("fifthClip").play();
		if (back !== true) {
			dimButtons();
		}
		if (firstClicked === 1) {
			undimButtons();
		} else {
			firstClicked = 1;
		}
		buttonShow();
	} else if (pageNumber === 7) {
		document.getElementById("fifthClip").style.display = "none";
		document.getElementById("blank4Clip").style.display = "block";
		document.getElementById("blank4Clip").play();
		document.getElementById("fifthClip").load();
		if (document.getElementById("fifthClip").play) {
			document.getElementById("fifthClip").pause();
		}
		if (back !== true) {
			dimButtons();
		}
		if (page7 === 1) {
			undimButtons();
		} else {
			page7 = 1;
		}
	} else if (pageNumber === 8) {
		document.getElementById("set4").style.animation = "";
		document.getElementById("set4").style.display = "block";
		document.getElementById("question5").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		if (document.getElementById("blank4Clip").play) {
			document.getElementById("blank4Clip").pause();
			document.getElementById("blank4Clip").currentTime = 0;
		}
		buttonHide();
	} else if (pageNumber === 9) {
		document.getElementById("table").style.display = "none";
		document.getElementById("revisionSet").style.display = "block";
		document.getElementById("tableRead").pause();
		document.getElementById("tableRead").currentTime = 0;
		//document.getElementById("repeatButton").style.display = "none";
		//document.getElementById("backButton").style.display = "none";
	} else if (pageNumber === 10) {
		document.getElementById("revisionSet").style.animation = "";
		document.getElementById("revisionSet").style.display = "none";
		document.getElementById("sixthClip").style.display = "block";
		document.getElementById("sixthClip").play();
		if (back !== true) {
			dimButtons();
		}
		if (page10 === 1) {
			undimButtons();
		} else {
			page10 = 1;
		}
		buttonShow();
	} else if (pageNumber === 11) {
		document.getElementById("set5").style.animation = "";
		document.getElementById("set5").style.display = "block";
		document.getElementById("question6").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("sixthClip").pause();
		document.getElementById("sixthClip").currentTime = 0;
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	} else if (pageNumber === 12) {
		document.getElementById("essay").style.display = "block";
		document.getElementById("essayAudio").play();
		document.getElementById("set6").style.animation = "";
		document.getElementById("set6").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		if (back !== true) {
			dimButtons();
		}
		buttonHide();
	}
	document.getElementById("submit").style.animation = "";
	pageNumber++;
	back = false;
	console.log(pageNumber + "after next");
}

function buttonBackClick() {
	back = true;
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
		qnCorrect = 2;
	} else if (pageNumber === 5) {
		document.getElementById("blank1").style.display = "block";
		document.getElementById("blank3").style.display = "none";
		document.getElementById("blank3load").pause();
		document.getElementById("blank3load").currentTime = 0;
		document.getElementById("blank1load").currentTime = 0;
		document.getElementById("blank1load").play();
	} else if (pageNumber === 6) {
		document.getElementById("blank3").style.display = "block";
		document.getElementById("blank2").style.display = "none";
		document.getElementById("blank2load").pause();
		document.getElementById("blank2load").currentTime = 0;
		document.getElementById("blank3load").currentTime = 0;
		document.getElementById("blank3load").play();
		qnCorrect = 3;
	} else if (pageNumber === 7) {
		document.getElementById("fifthClip").load();
		document.getElementById("blank2").style.display = "block";
		document.getElementById("blank3Sprite").className = "";
		document.getElementById("fifthClip").style.display = "none";
	} else if (pageNumber === 8) {
		document.getElementById("fifthClip").load();
		//document.getElementById("fifthClip").play();
		document.getElementById("blank4Clip").load();
		document.getElementById("blank4Clip").style.display = "none";
		document.getElementById("fifthClip").style.display = "block";
		qnCorrect = 4;
	} else if (pageNumber === 9) {
		document.getElementById("table").style.display = "none";
		document.getElementById("blank4Clip").style.display = "block";
		document.getElementById("tablePic").style.animation = "";
		document.getElementById("tableRead").pause();
		document.getElementById("tableRead").currentTime = 0;
		//document.getElementById("blank4Clip").play();
		qnCorrect = 4;
	} else if (pageNumber === 10) {
		document.getElementById("table").style.display = "block";
		document.getElementById("revisionSet").style.display = "none";
		document.getElementById("tableRead").currentTime = 0;
		document.getElementById("tableRead").play();
		//document.getElementById("blank4Clip").play();
		qnCorrect = 4;
	} else if (pageNumber === 11) {
		document.getElementById("sixthClip").load();
		document.getElementById("revisionSet").style.display = "block";
		document.getElementById("sixthClip").style.display = "none";
		qnCorrect = 5;
	}
	pageNumber--;
	console.log(pageNumber + " after back");
}

function buttonCorrectDone() {
	qnCorrect++;
	console.log("Total correct before if: " + qnCorrect);
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
		}
		buttonShow();
	} else if (qnCorrect === 3) {
		//close and go back to clip OR go to next clip
		document.getElementById("set2").style.display = "none";
		document.getElementById("qn3correct").pause();
		document.getElementById("qn3correct").currentTime = 0;
		document.getElementById("animationClip").style.display = "none";
		document.getElementById("blank1").style.display = "block";
		document.getElementById("blank1Title").style.animation = "fadeIn 2.3s forwards";
		document.getElementById("blank1load").play();
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
		document.getElementById("blank2load").play();
		document.getElementById("blank3").style.display = "none";
		document.getElementById("set3").style.display = "none";
		buttonShow();
		undimButtons();
		//document.getElementById("repeatButton").style.display = "none";
		//document.getElementById("backButton").style.display = "none";
	} else if (qnCorrect === 5) {
		//close and go back to clip OR go to next clip
		document.getElementById("qn5correct").pause();
		document.getElementById("qn5correct").currentTime = 0;
		document.getElementById("tableRead").play();
		document.getElementById("table").style.display = "block";
		document.getElementById("blank4Clip").style.display = "none";
		document.getElementById("set4").style.display = "none";
		if (qn5Done === 1) {
			undimButtons();
			buttonShow();
		} else {
			qn5Done = 1;
		}
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
		//go to essay
		document.getElementById("essay").style.display = "block";
		document.getElementById("essayAudio").play();
		document.getElementById("set6").style.animation = "";
		document.getElementById("set6").style.display = "block";
		document.getElementById("closeButtonQnPopUp").style.display = "block";
		document.getElementById("set5").style.display = "none";
		pageNumber++;
	} else if (qnCorrect === 10) {
		//go to next question
		document.getElementById("question11").style.display = "block";
		document.getElementById("submit").style.display = "block";
		document.getElementById("showHideEssay").style.display = "block";
	} else if (qnCorrect === 11) {
		//go to next question
		document.getElementById("question12").style.display = "block";
		document.getElementById("showHideEssay").style.display = "block";
		document.getElementById("submit").style.display = "block";

	} else if (qnCorrect === 12) {
		//go to credit
		document.getElementById("startPage").style.display = "none";
		document.getElementById("set6").style.display = "none";
		document.getElementById("end").style.display = "block";
		document.getElementById("TheEnd").style.display = "block";
		document.getElementById("endSprite").className = "endWave";
		setTimeout(function() {
			document.getElementById("endCredit").style.animation = "fadeIn 2s forwards";
			document.getElementById("TheEnd").style.animation = "fadeOut 2s forwards";
			document.getElementById("endSprite").className = "";
		}, 6000);
		setTimeout(function() {
			document.getElementById("TheEnd").style.display = "none";
			document.getElementById("endCredit").style.display = "block";
		}, 7000);
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
	if (audio.muted === false) {
		audio.muted = true;
		document.getElementById("audioOff").style.display = "block";
		document.getElementById("audioOn").style.display = "none";
	} else {
		audio.muted = false;
		document.getElementById("audioOn").style.display = "block";
		document.getElementById("audioOff").style.display = "none";
	}
}

function dimButtons() {
	document.getElementById("coverupDiv").style.display = "block";
	document.getElementById("nextButton").style.opacity = "0.65";
	document.getElementById("backButton").style.opacity = "0.65";
	document.getElementById("repeatButton").style.opacity = "0.65";
	document.getElementById("repeatButton").style.background = 'url(assets/images/repeat_gray.png)';
	document.getElementById("nextButton").style.background = 'url(assets/images/next_gray.png)';
	document.getElementById("backButton").style.background = 'url(assets/images/Back_gray.png)';
}

function undimButtons() {
	document.getElementById("coverupDiv").style.display = "none";
	document.getElementById("nextButton").style.opacity = "1";
	document.getElementById("backButton").style.opacity = "1";
	document.getElementById("repeatButton").style.opacity = "1";
	document.getElementById("repeatButton").style.background = 'url(assets/images/repeat.png)';
	document.getElementById("nextButton").style.background = 'url(assets/images/next.png)';
	document.getElementById("backButton").style.background = 'url(assets/images/Back.png)';
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
		document.getElementById("blank1load").currentTime = 0;
		document.getElementById("blank1load").play();
	} else if (pageNumber === 5) {
		document.getElementById("blank3load").currentTime = 0;
		document.getElementById("blank3load").play();
	} else if (pageNumber === 6) {
		document.getElementById("blank2load").currentTime = 0;
		document.getElementById("blank2load").play();
	} else if (pageNumber === 7) {
		document.getElementById("fifthClip").currentTime = 0;
		document.getElementById("fifthClip").play();
	} else if (pageNumber === 8) {
		document.getElementById("blank4Clip").currentTime = 0;
		document.getElementById("blank4Clip").play();
	} else if (pageNumber === 11) {
		document.getElementById("sixthClip").currentTime = 0;
		document.getElementById("sixthClip").play();
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

var qnCorrect = 0;

function buttonSubmitClick() {

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
		if ($("#optionC11Selected").is(":visible")) {
			document.getElementById("correctAnswer1").style.display = "block";
			resetOptions();
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
		}
		document.getElementById("showHideEssay").style.display = "none";
	}
	document.getElementById("question" + (qnCorrect + 1)).style.display = "none";
	document.getElementById("submit").style.pointerEvents = "none";
	document.getElementById("submit").style.display = "none";
	document.getElementById("closeButtonQnPopUp").style.display = "none";
	console.log("Total number of correct question so far : " + qnCorrect);
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
		resetOptions2();
	} else if (qnCorrect === 3) {
		resetOptions2();
	} else if (qnCorrect === 4) {
		resetOptions4();
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
		document.getElementById("showHideEssay").style.display = "none";
	} else if (qnCorrect === 10) {
		resetOptions();
		document.getElementById("showHideEssay").style.display = "none";
	} else if (qnCorrect === 11) {
		resetOptions4();
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
}

function tableEnd() {
	buttonShow();
	undimButtons();
	document.getElementById("tableRead").pause();
	document.getElementById("tableRead").currentTime = 0;
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

function buttonMenu(){}

function selectedMenu(){

}