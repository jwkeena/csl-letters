// Initialize Materialize components via jQuery
// All search options
$(document).ready(function () {
    $(".tabs").tabs();
});

// All tooltips
$(document).ready(function () {
    $(".tooltipped").tooltip({
        delay: 50,
        html: true
    });
});

// Modals
$(document).ready(function () {
    $(".modal").modal();
});

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
        document.getElementById("footer").style.bottom = "0";
    } else {
        document.getElementById("header").style.top = "-75px";
        document.getElementById("footer").style.bottom = "-75px";
    };
    prevScrollpos = currentScrollPos;
};

// Recipient search to populate autocomplete
$(document).ready(function () {

    // Collect all recipients when page loads
    let recipients = [];
    for (let i = 0; i < letters.length; i++) {
        recipients.push(letters[i].recipient);
    };

    // https://gomakethings.com/removing-duplicates-from-an-array-with-vanilla-javascript/
    let uniqueRecipients = recipients.filter(function (item, index) {
        return recipients.indexOf(item) >= index;
    });
    uniqueRecipients.sort();

    // Format properly for Materialize autocomplete
    let uniqueRecipientsJSON = {};
    for (let i = 0; i < uniqueRecipients.length; i++) {
        let key = uniqueRecipients[i];
        uniqueRecipientsJSON[key] = null;
    };

    // Populate Materialize autocomplete with all available recipients
    $('input.autocomplete1').autocomplete({
        data: uniqueRecipientsJSON
    });

});

// Archival search to populate autocomplete
$(document).ready(function () {

    // Collect all locations when page loads
    let locations = [];
    for (let i = 0; i < letters.length; i++) {
        locations.push(letters[i].archivalLocation)
    };

    // https://gomakethings.com/removing-duplicates-from-an-array-with-vanilla-javascript/
    let uniqueLocations = locations.filter(function (item, index) {
        return locations.indexOf(item) >= index;
    });
    uniqueLocations.sort();

    // Format properly for Materialize autocomplete
    let uniqueLocationsJSON = {};
    for (let i = 0; i < uniqueLocations.length; i++) {
        let key = uniqueLocations[i];
        uniqueLocationsJSON[key] = null;
    }

    $('input.autocomplete2').autocomplete({
        data: uniqueLocationsJSON
    });
});

$(".scroll-to-top").on("click", function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    return false;
});

// Press enter to initate search
function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        document.getElementById("search").click();
    };
};

// Previous and next results
function nextResult() {
    if (isRandomLetter === true) {
        let thisLetterID = parseInt($("#letter-id").text().slice(1));
        let letterID = thisLetterID + 1;

        if (letterID > 3208) {            $("#volumes").css("color", "red");
            alert("This is the last letter.")
        } else {
            $("#letter-id").text("#" + letterID);
            $("#letter-recipient").text("to " + letters[letterID - 1].recipient);
            $("#letter-year").text("(" + letters[letterID - 1].year + ")");
            $("#letter-volume").text("- Vol." + letters[letterID - 1].volume);
            $("#letter-archive").text(" (" + letters[letterID - 1].archivalLocation + ")");
    
            let letter = letters[letterID - 1];
            let text = createFootnoteLinks(letter, letterID - 1);
            $("#letter-content").html(text);
        };

    } else {
        let currentResultNumber = parseInt($("#letter-result-number").text());
        let nextResultNumber = currentResultNumber + 1;
        let nextResult = $("[data-result-number=" + nextResultNumber + "]");
        let nextResultLetterID = nextResult.attr("data-letter-id");
    
        if (nextResultLetterID === undefined) {
            alert("There are no more results.");
        } else {
            let letterID = nextResultLetterID;
            $("#letter-result-number").text(nextResultNumber + ".");
            $("#letter-id").text("#" + letters[letterID - 1].id);
            $("#letter-recipient").text("to " + letters[letterID - 1].recipient);
            $("#letter-year").text("(" + letters[letterID - 1].year + ")");
            $("#letter-volume").text("- Vol." + letters[letterID - 1].volume);
            $("#letter-archive").text(" (" + letters[letterID - 1].archivalLocation + ")");
    
            let letter = letters[letterID - 1];
            let text = createFootnoteLinks(letter, letterID - 1);
            $("#letter-content").html(text);
        };
    };
};

function previousResult() {
    if (isRandomLetter === true) {
        let thisLetterID = parseInt($("#letter-id").text().slice(1));
        let letterID = thisLetterID - 1;

        if (letterID < 1) {
            alert("This is the first letter.")
        } else {
            $("#letter-id").text("#" + letterID);
            $("#letter-recipient").text("to " + letters[letterID - 1].recipient);
            $("#letter-year").text("(" + letters[letterID - 1].year + ")");
            $("#letter-volume").text("- Vol." + letters[letterID - 1].volume);
            $("#letter-archive").text(" (" + letters[letterID - 1].archivalLocation + ")");
    
            let letter = letters[letterID - 1];
            let text = createFootnoteLinks(letter, letterID - 1);
            $("#letter-content").html(text);
        };

    } else {
        let currentResultNumber = parseInt($("#letter-result-number").text());
        let previousResultNumber = currentResultNumber - 1;
        let previousResult = $("[data-result-number=" + previousResultNumber + "]");
        let previousResultLetterID = previousResult.attr("data-letter-id");
    
        if (previousResultLetterID === undefined) {
            alert("This is the first result.");
        } else {
            let letterID = previousResultLetterID;
            $("#letter-result-number").text(previousResultNumber + ".");
            $("#letter-id").text("#" + letters[letterID - 1].id);
            $("#letter-recipient").text("to " + letters[letterID - 1].recipient);
            $("#letter-year").text("(" + letters[letterID - 1].year + ")");
            $("#letter-volume").text("- Vol." + letters[letterID - 1].volume);
            $("#letter-archive").text(" (" + letters[letterID - 1].archivalLocation + ")");
    
            let letter = letters[letterID - 1];
            let text = createFootnoteLinks(letter, letterID - 1);
            $("#letter-content").html(text);
        };
    };

};

// Toggling strict search
let isStrictSearch = false;

function toggleStrictSearch() {
    if (isStrictSearch === true) {
        isStrictSearch = false;
        $("#strict-search-toggle-desktop").attr("src", "assets/lock-open.png");
        $("#strict-search-toggle-mobile").attr("src", "assets/lock-open.png");
        M.toast({html: 'Strict search OFF (partial matches accepted)', displayLength: 1000})

    } else {
        isStrictSearch = true;
        $("#strict-search-toggle-desktop").attr("src", "assets/lock-closed.png");
        $("#strict-search-toggle-mobile").attr("src", "assets/lock-closed.png");
        M.toast({html: 'Strict search ON (whole word matches only)', displayLength: 1000})
    };
};


let searchIsValid = true;
let volumeIsSelected = true;
let yearIsSelected = true;

// Validate search boolean toggle
$(document.body).on("click", function () {
    if (volumeIsSelected && yearIsSelected) {
        $("#search-validate").attr("src", "./assets/green-check.png");
        searchIsValid = true;
    } else {
        $("#search-validate").attr("src", "./assets/red-x.png");
        searchIsValid = false;
    }
});

function validateSearch() {
    if (!searchIsValid) {
        if (!volumeIsSelected && !yearIsSelected) {
            alert("Select at least one year and one volume to search.");
        } else if (!volumeIsSelected) {
            alert("Select at least one volume to search.");
        } else if (!yearIsSelected) {
            alert("Select at least one year to search.");
        }
        return false;
    } else {
        return true;
    }
};


// Script for checking/unchecking all year tickboxes
// Followed by search parameter footer updates
let areAllSelected = true;

function selectOrDeselectAll() {
    let items = document.getElementsByName('year-tick');

    if (areAllSelected === true) {
        areAllSelected = false;
        yearIsSelected = false;
        $("#years").attr("data-tooltip", "no years selected!");
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = false;
        }
        yearsToBeSearched = [];
    } else {
        areAllSelected = true;
        yearIsSelected = true;
        $("#years").text("all years");
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = true;
        }
        yearsToBeSearched = [1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963]
    };
};

// Getting volume information from tickboxes
let volumesToBeSearched = [1, 2, 3]
$(".volume-tick").on("click", function () {
    if (this.checked === true) { // Cannot use $ when using .checked method
        volumesToBeSearched.push(parseInt($(this).val())); // Must use $ when using .val() method
        volumesToBeSearched.sort(function (a, b) {
            return a - b;
        });
    } else {
        let index = volumesToBeSearched.indexOf(parseInt($(this).val()));
        volumesToBeSearched.splice(index, 1);
        yearsToBeSearched.sort(function (a, b) {
            return a - b;
        });
    };

    // Updating search parameters in footer
    let vols = volumesToBeSearched.toString();
    $("#volumes").css("color", "white");
    volumeIsSelected = true;
    switch (vols) {
        case "1,2,3":
            $("#volumes").text("all volumes");
            break;
        case "1,2":
            $("#volumes").text("vols: I, II");
            break;
        case "1":
            $("#volumes").text("vol: I");
            break;
        case "2,3":
            $("#volumes").text("vols: II, III");
            break;
        case "1,3":
            $("#volumes").text("vols: I, III");
            break;
        case "2":
            $("#volumes").text("vol: II");
            break;
        case "3":
            $("#volumes").text("vol: III");
            break;
        default:
            $("#volumes").text("no volume selected!");
            $("#volumes").css("color", "red");
            volumeIsSelected = false;
    };
});

// Getting year information from tickboxes
let yearsToBeSearched = [1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963]
$(".year-tick").on("click", function () {

    let items = document.getElementsByName('year-tick');
    let whichAreChecked = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i].checked === true) {
            whichAreChecked.push(items[i])
        }
    }
    if (whichAreChecked.length === 59) {
        document.getElementById("select-or-deselect-all").checked = true;
    }
    if (whichAreChecked.length < 59) {
        document.getElementById("select-or-deselect-all").checked = false;
    }

    yearIsSelected = true;
    $("#years").text("years (hover)");
    $("#years").css("color", "white");

    let year = parseInt($(this).next().text()); // Grabs year of next sibling span and coerces it into a number
    if (this.checked === true) {
        yearsToBeSearched.push(year);
        yearsToBeSearched.sort(function (a, b) {
            return a - b;
        });
    } else {
        let index = yearsToBeSearched.indexOf(year);
        yearsToBeSearched.splice(index, 1);
        yearsToBeSearched.sort(function (a, b) {
            return a - b;
        });
    };

    // Updating search parameters in footer
    if (yearsToBeSearched.length === 0) {
        $("#years").text("no year selected!");
        $("#years").css("color", "red");
        $("#years").attr("data-tooltip", "no years selected!");
        yearIsSelected = false;
    } else if (document.getElementById("select-or-deselect-all").checked === true) {
        $("#years").attr("data-tooltip", "all years");
    } else {
        let newArray = [];
        for (i = 0; i < yearsToBeSearched.length; i++) {
            newArray.push(yearsToBeSearched[i]);
            if (i % 4 === 3) {
                newArray.push("<br>");
            }
        };
        $("#years").attr("data-tooltip", newArray.toString());
    }
});

// Event listeners for updating other search parameters in footer
$("input").keyup(function () {
    let searchPhrase = $("#search-phrase").val()

    if (!searchPhrase.replace(/\s/g, '').length) { // Checks for white space only; otherwise, it shows the searchPhrase
        $("#terms").text("no search terms")
    } else {
        $("#terms").text(searchPhrase);
    };
});

let isSearchingLetters = true;
$("input[type=radio][name=group1]").change(function () {
    if (this.value === "letters") {
        isSearchingLetters = true;
        $("#type").text("searching letters");
    } else {
        isSearchingLetters = false;
        $("#type").text("searching footnotes");
    }
});

$("input.autocomplete1").on('autocompletechange change', function () {
    let text = $(this).val().toLowerCase();
    let nullCheckText = isEmptyOrSpaces(text);
    if (nullCheckText) {
        $("#recipient").text("all recipients");
    } else {
        $("#recipient").text($(this).val().toLowerCase());
    }
});

$("input.autocomplete2").on('autocompletechange change', function () {
    $("#archives").text($(this).val().toLowerCase());
});

function resetAllInputs() {

    searchIsValid = true;
    volumeIsSelected = true;
    yearIsSelected = true;

    // Re-check all years
    let years = document.getElementsByClassName("year-tick");
    for (let i = 0; i < years.length; i++) {
        years[i].checked = true;
    }
    areAllSelected = true;

    // Reset all years in memory
    yearsToBeSearched = [1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963]

    // Re-check all volumes
    let volumes = document.getElementsByName("volume-tick");
    for (let i = 0; i < volumes.length; i++) {
        volumes[i].checked = true;
    }

    // Reset all volumes in memory
    volumesToBeSearched = [1, 2, 3]

    // Reset search results
    $("#number-of-results").text(" ");
    $("#search-results").empty();

    // Reset text inputs
    $("#autocomplete-recipient").val("");
    $("#autocomplete-archive").val("");
    $("#search-phrase").val("");

    // Reset fixed footer
    $("#terms").text("no search terms");
    $("#type").text("searching letters");
    $("#volumes").text("all volumes");
    $("#volumes").css("color", "white");
    $("#years").attr("data-tooltip", "all years");
    $("#years").css("color", "white");
    $("#recipient").text("all recipients");
    $("#archives").text("all archives");
};

function printLetterResults(letterID, resultNumber) {

    let a = $("<a>");
    a.attr("href", "#!");
    a.attr("data-letter-id", letterID);
    a.attr("data-result-number", resultNumber);
    a.addClass("collection-item letter-match");

    let firstWordsOfLetter = letters[letterID - 1].content.slice(0, 80);
    a.text(resultNumber + ". #" + letterID + " to " + letters[letterID - 1].recipient + " (" + letters[letterID - 1].year + ")" + " - Vol. " + letters[letterID - 1].volume + ': "' + firstWordsOfLetter + '..."');

    $("#search-results").append(a);

};

function volumeFilter(letterID) {
    if (volumesToBeSearched.includes(letters[letterID - 1].volume)) {
        return true;
    } else {
        return false;
    };
};

function yearFilter(letterID) {
    if (yearsToBeSearched.includes(letters[letterID - 1].year)) {
        return true;
    } else {
        return false;
    };
};

function archivalFilter(archiveQuery, letterID) {
    if (archiveQuery === letters[letterID - 1].archivalLocation) {
        return true;
    } else {
        return false;
    };
};

function recipientFilter(recipientQuery, letterID) {
    if (recipientQuery === letters[letterID - 1].recipient) {
        return true;
    } else {
        return false;
    };
};

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^\s*$/) !== null;
};

function regexSearch(matches, searchPhrase) {

    let numberOfMatches = 0;
    // Pull a substring from each letter using the matches array passed in
    for (let i = 0; i < matches.length; i++) {

        let letter = letters[matches[i] - 1].content;
        let letterID = matches[i];
        let indices = [];

        let myRegEx;
        if (isStrictSearch) {
            myRegEx = new RegExp("\\b" + searchPhrase + "\\b", "gi"); // Must use the constructor syntax to pass variable into RegEx instance
            // \b is a word boundary on the left of the word
            // g is global search, i is case insensitive. But this removes the bolding
        } else {
            myRegEx = new RegExp("\\b" + searchPhrase, "gi"); // Must use the constructor syntax to pass variable into RegEx instance
        }

        let tempArray;
        while ((tempArray = myRegEx.exec(letter)) !== null) {
            indices.push(tempArray.index);
        };

        for (let i = 0; i < indices.length; i++) {

            numberOfMatches++;
            let letterSnippet;
            if (indices[i] > 100) {
                letterSnippet = letter.slice((indices[i] - 50), (indices[i] + 150));
            } else {
                letterSnippet = letter.slice(0, 200);
            };

            // Build new string from letterSnippet and add the necessary html
            let myRegEx2 = new RegExp(searchPhrase, "ig");
            let capturedWord = myRegEx2.exec(letterSnippet)[0] // Capturing the exact word match, whether capitalized or not -- https://stackoverflow.com/questions/3409520/javascript-get-only-the-variable-part-of-a-regex-match
            letterSnippet = letterSnippet.replace(myRegEx2, "<b>" + capturedWord + "</b>");
            letterSnippet = "..." + letterSnippet + "...";

            // Print the results
            let a = $("<a>");
            a.attr("href", "#!");
            a.attr("data-letter-id", letterID);
            a.attr("data-result-number", numberOfMatches);
            a.addClass("collection-item letter-match");
            a.html(numberOfMatches + ". #" + letterID + " to " + letters[letterID - 1].recipient + " (" + letters[letterID - 1].year + ")" + " - Vol. " + letters[letterID - 1].volume + ': "' + letterSnippet + '..."');
            $("#search-results").append(a);
        };
    };
    $("#number-of-results").text(numberOfMatches);

};

// Run word search
$("#search").on("click", function () {

    isRandomLetter = false;

    let validationSearchCheck = validateSearch();
    if (!validationSearchCheck) {
        return;
    };

    $("#search-results").empty();
    $("#footnote-text-display").empty();

    // Grab search parameters from user input
    let searchPhrase = $("#search-phrase").val();
    let recipient = $("#autocomplete-recipient").val();
    let archive = $("#autocomplete-archive").val();

    // Find matching letters with search phrase first (no need for regex yet), store id in an array
    let matches = [];
    for (let i = 0; i < letters.length; i++) {

        let letterContent = letters[i].content.toLowerCase();
        let searchPhraseLower = searchPhrase.toLowerCase();

        if (letterContent.includes(searchPhraseLower)) {
            matches.push(letters[i].id);
        };
    };

    // Initialize temporary variable to be used over and over
    let filteredMatches = [];

    // Volume filter: cut out of array all the letterIDs that aren't in the searched volumes
    if (volumesToBeSearched.length < 3) { // Only run this search if there are any volumes to be culled
        for (let i = 0; i < matches.length; i++) {
            if (volumeFilter(matches[i])) {
                filteredMatches.push(matches[i]);
                // matches.splice(i, 1);
            };
        };
        // Reset variables to be used again next filter (since using splice inside the loop mutates the elements in an unexpected way)
        matches = filteredMatches;
        filteredMatches = [];
    }

    // Year filter
    if (!areAllSelected) { // Only run if there are years to be culled        
        for (let i = 0; i < matches.length; i++) {
            if (yearFilter(matches[i])) {
                filteredMatches.push(matches[i]);
            };
        };
        matches = filteredMatches;
        filteredMatches = [];
    }

    // Recipient filter
    let nullCheckRecipient = isEmptyOrSpaces(recipient);
    if (!nullCheckRecipient) { // Only if there IS something in the recipient input, weed out non-matches
        for (let i = 0; i < matches.length; i++) {
            if (recipientFilter(recipient, matches[i])) {
                filteredMatches.push(matches[i]);
            };
        };
        matches = filteredMatches;
        filteredMatches = [];
    };

    // Archives filter
    let nullCheckArchive = isEmptyOrSpaces(archive);
    if (!nullCheckArchive) { // Only if there IS something in the recipient input, weed out non-matches
        for (let i = 0; i < matches.length; i++) {
            if (archivalFilter(archive, matches[i])) {
                filteredMatches.push(matches[i]);
            };
        };
        matches = filteredMatches;
        filteredMatches = [];
    };

    // Check if there are any results
    if (matches.length === 0) {
        alert("No matching letters.")
    } else {

        // Regex multiple matches filter
        let nullCheckSearchPhrase = isEmptyOrSpaces(searchPhrase);
        if (!nullCheckSearchPhrase) { // if there IS a searchPhrase, check for multiple matches in the same letter
            regexSearch(matches, searchPhrase);
        } else { // just print all the results in the filtered matches array
            $("#number-of-results").text(matches.length);
            for (let i = 0; i < matches.length; i++) {
                printLetterResults(matches[i], (i + 1));
            };
        };
    };

});

// Event delegation for creation of search results to display entire letter
$(document.body).on("click", ".letter-match", function () {

    let letterID = ($(this).data("letter-id"));
    $("#letter-result-number").text($(this).data("result-number") + ".");
    $("#letter-id").text("#" + letters[letterID - 1].id);
    $("#letter-recipient").text("to " + letters[letterID - 1].recipient);
    $("#letter-year").text("(" + letters[letterID - 1].year + ")");
    $("#letter-volume").text("- Vol." + letters[letterID - 1].volume);
    $("#letter-archive").text(" (" + letters[letterID - 1].archivalLocation + ")");

    let letter = letters[letterID - 1];
    let text = createFootnoteLinks(letter, letterID - 1);
    $("#letter-content").html(text);

    isRandomLetter = false;
    document.getElementById("results-modal-button").click();
});

function createFootnoteLinks(letter, letterIndex) {
    let letterID = letterIndex + 1 // Because the index is passed in, not the id
    let allFootnotes = [];

    for (i = 0; i < letter.footnotes.length; i++) {
        allFootnotes.push(letter.footnotes[i].id);
    };

    // Encase all footnotes in brackets in new array
    // https://www.geeksforgeeks.org/javascript-array-map-method/
    // https://www.freecodecamp.org/forum/t/explain-array-prototype-map-call/165936
    let bracketFootnotesArray = Array.prototype.map.call(allFootnotes, function (item) {
        return "[" + item + "]";
    });

    // Wrap all bracketed footnotes in a tags in a second new array
    let aLinkedFootnotesArray = Array.prototype.map.call(bracketFootnotesArray, function (item) {
        return "<a class='footnote tooltipped' href='#/' data-tooltip='' data-letter-id='" + letterID + "'>" + item + "</a>";
    });

    // Replace text with html tags just constructed
    let text = letter.content;
    for (i = 0; i < bracketFootnotesArray.length; i++) {
        text = text.replace(bracketFootnotesArray[i], aLinkedFootnotesArray[i]);
    };

    return text;
};

$(document.body).on("mouseover", ".footnote", function () {
    // Initialize newly generated tooltips
    $('.tooltipped').tooltip({
        delay: 50,
        html: true
    });

    // Get the right footnote to store in the tooltip
    let letterID = $(this).attr("data-letter-id");
    let footnoteWithBrackets = $(this).text();
    let footnoteNumber = footnoteWithBrackets.slice(1, -1);
    footnoteNumber = parseInt(footnoteNumber);
    let footnoteIndex = letters[letterID - 1].footnotes.findIndex(x => x.id === footnoteNumber); // https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
    let footnoteText = letters[letterID - 1].footnotes[footnoteIndex].content;
    $(this).attr("data-tooltip", footnoteText);
});

// Random letter picker
let isRandomLetter = false;
$(".random").on("click", function () {

    isRandomLetter = true;

    let validationSearchCheck = validateSearch();
    if (!validationSearchCheck) {
        return;
    };

    numOfLetters = letters.length;
    randomNumber = Math.floor(Math.random() * (numOfLetters - 1));
    randomLetter = letters[randomNumber];

    $("#letter-result-number").text("");
    $("#letter-id").text("#" + randomLetter.id);
    $("#letter-recipient").text("to " + randomLetter.recipient);
    $("#letter-year").text("(" + randomLetter.year + ")");
    $("#letter-volume").text("- Vol. " + randomLetter.volume);
    let text = createFootnoteLinks(randomLetter, randomNumber);

    // Display html just created
    $("#letter-content").html(text);

    // Slow scroll to letter display
    document.getElementById("results-modal-button").click();
});

// Get ordered list of recipients
$("#recipient").on("click", function () {
    let recipients = [];
    for (let i = 0; i < letters.length; i++) {
        recipients.push(letters[i].recipient);
    };

    // https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    let counts = {};
    recipients.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    // Alphabetically ordered object list of recipients and number of letters
    console.log(counts);

    // Numerically sorted list of recipients and number of letters
    let countsArray = [];
    for (let i = 0; i < Object.keys(counts).length; i++) {
        let maxKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        console.log(maxKey + ": " + counts[maxKey]);
        countsArray.push(maxKey + ": " + counts[maxKey]);
        delete counts[maxKey];
    };

    console.log(countsArray);
    for (let i = 0; i < countsArray.length; i++) {
        console.log(counts[i] + "\n");
    };
});

// Get ordered list of archival locations
$("#archive").on("click", function () {
    let archive = [];
    for (i = 0; i < letters.length; i++) {
        archive.push(letters[i].archivalLocation);
    };

    // https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    let counts = {};
    archive.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    console.log(counts);

    // Numerically sorted list of archival locations
    let countsArray = [];
    for (let i = 0; i < Object.keys(counts).length; i++) {
        let maxKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        console.log(maxKey + ": " + counts[maxKey]);
        countsArray.push(maxKey + ": " + counts[maxKey]);
        delete counts[maxKey];
    };

    console.log(countsArray);
    for (let i = 0; i < countsArray.length; i++) {
        console.log(counts[i] + "\n");
    };
});

$("#regex-test").on("click", function () {

    let letter = letters[2531].content;
    let indices = [];

    let myRegEx = /English*/g;
    let tempArray;
    while ((tempArray = myRegEx.exec(letter)) !== null) {
        indices.push(tempArray.index);
        console.log(tempArray);
        let message = "Found " + tempArray[0] + ". Next match starts at " + myRegEx.lastIndex;
        console.log(message);
    };

    for (let i = 0; i < indices.length; i++) {
        console.log(letter[indices[i]]);
    };

});