
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        answer: 0
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        answer: 0
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "background-color", "bgcolor", "background"],
        answer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        answer: 3
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        answer: 1
    },
    {
        question: "Which is the correct CSS syntax?",
        options: ["body:color=black;", "{body;color:black;}", "body {color: black;}", "{body:color=black;}"],
        answer: 2
    },
    {
        question: "How do you add a comment in a CSS file?",
        options: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->", "' this is a comment"],
        answer: 1
    },
    {
        question: "Which JavaScript event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onmouseclick", "onmouseover", "onclick"],
        answer: 3
    }
];

// Taking references
const resultD = document.querySelector(".playarea");
const ansElem = document.querySelectorAll(".answer");
const [questionElem, option1, option2, option3, option4] = document.querySelectorAll("#question, .option1, .option2, .option3, .option4");
const submitBtn = document.querySelector("#submit");
const restartBt = document.querySelector("#reset");

let currentQuiz = 0;
let score = 0; 


// Validation for not clicked
const submitV = () => {
    let isAnyChecked = false;
    ansElem.forEach((elem) => {
        if (elem.checked) {
            isAnyChecked = true;
        }
    });
    submitBtn.disabled = !isAnyChecked; // Disable button if no option is checked
};

// Call submitV whenever an option is selected or deselected
ansElem.forEach((elem) => {
    elem.addEventListener('change', submitV);
});


// Call submitV whenever an option is selected or deselected
ansElem.forEach((elem) => {
    elem.addEventListener('change', submitV);
});



restartBt.addEventListener("click",()=>{
    location.reload();
})
// Aligning quizQuestions with HTML dynamically
const loadQuiz = () => {
    // Taking quiz data
    const { question, options } = quizQuestions[currentQuiz];
    // Setting question dynamically
    questionElem.innerText = question;
    // Setting options dynamically
    options.forEach((elem, index) => {
        window[`option${index + 1}`].innerText = elem;
    });
    // Call submitV to ensure the submit button is correctly enabled/disabled
    submitV();
};
loadQuiz();

// Getting index of selected option
const getSelectedOption = () => {
    let ansElement = Array.from(ansElem); // Making an array of it
    return ansElement.findIndex((elem) => elem.checked);
};

// Loading next quiz post submit
const clearOptions = () => {
    ansElem.forEach((elem) => {
        elem.checked = false;
    });
};


// Setting submit button
submitV();
submitBtn.addEventListener("click", () => {
    const getSelectedOptionIndex = getSelectedOption();
    console.log(getSelectedOptionIndex);
    
    // Setting score before loading next question
    if (getSelectedOptionIndex === quizQuestions[currentQuiz].answer) {
        score += 1;
        console.log(score);
    }
    
    currentQuiz++;
    if (currentQuiz < quizQuestions.length) {
        clearOptions();
        loadQuiz();
    } else {
        resultD.innerHTML = `
            <div class="result">
                <h2 style="color: blue; font-size: 24px; text-align: center;">Your Score: ${score}/${quizQuestions.length} Correct Answers</h2>
<p style="color: green; font-size: 18px; text-align: center;">Congratulations on completing the quiz!</p>
<button class="reload-button" onclick="location.reload()" style="background-color: green; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer;">Play Again</button>

            </div>`;
    }
});
