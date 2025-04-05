document.addEventListener('DOMContentLoaded', function () {

    const searchButton = document.getElementById("search-btn")
    const usernameInput = document.getElementById("user-input")
    const statsContainer = document.querySelector(".stats-container")
    const easyProgressCircle = document.querySelector(".easy-progress")
    const mediumProgressCircle = document.querySelector(".medium-progress")
    const hardProgressCircle = document.querySelector(".hard-progress")
    const easyLabel = document.getElementById("easy-label")
    const mediumLabel = document.getElementById("medium-label")
    const hardLabel = document.getElementById("hard-label")
    const cardStatsContainer = document.querySelector(".stats-cards")


    function validateUsername(username) {

        if (username.trim() === "") {
            alert("Username can not be empty")
            return false;
        }
        const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_]{2,14})[a-zA-Z0-9]$/;
        const isMatching = regex.test(username)
        if (!isMatching) {
            alert("Invalid Username")
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://alfa-leetcode-api.onrender.com/${username}/solved`
        try {

            searchButton.textContent = "Searching..."
            searchButton.disabled = true;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("unable to fetch");
            }
            const parsedData = await response.json();

            displayUserData(parsedData);


        }
        catch (err) {
            alert("Error fetching user details: " + err.message);
        }
        finally {
            searchButton.textContent = "Search"
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
        console.log("progress called");

    }

    function displayUserData(parsedData) {
        //known data total questions on leetcode:

        const totalQuestions = 3313;
        const easyTotalQuestions = 828;
        const mediumTotalQuestions = 1733;
        const hardTotalQuestions = 752;

        //unknown data fetch from API

        const totalSolvedQuestions = parsedData.solvedProblem || 0;
        const easySolvedQuestions = parsedData.easySolved || 0;
        const mediumSolvedQuestions = parsedData.mediumSolved || 0;
        const hardSolvedQuestions = parsedData.hardSolved || 0;

        updateProgress(easySolvedQuestions, easyTotalQuestions, easyLabel, easyProgressCircle);
        updateProgress(mediumSolvedQuestions, mediumTotalQuestions, mediumLabel, mediumProgressCircle);
        updateProgress(hardSolvedQuestions, hardTotalQuestions, hardLabel, hardProgressCircle);



    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;

        if (!validateUsername(username)) {
            return; // Stop execution if username is invalid
        }

        fetchUserDetails(username);
    });

})