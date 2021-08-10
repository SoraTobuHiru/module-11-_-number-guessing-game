let minValue;
let maxValue;
let dialogNumber;
let questionNumber;

document.querySelector(".rangeNumberSign").hidden = true;
document.querySelector(".secondaryCard").hidden = true;

// "Играть снова!" button (btnRetry)
document.getElementById('btnRetry').addEventListener('click', () => {
    document.querySelector(".initialCard").hidden = false;
    document.querySelector(".rangeNumberSign").hidden = true;
    document.querySelector(".secondaryCard").hidden = true;
    document.querySelector(".card-footer").hidden = false;

    initialMinNumber.value = '';
    initialMaxNumber.value = '';
    initialRange.innerText = '';
    questionNumberField.innerText = '';
    dialogField = '';
    questionNumber = 1;
    
    gameRun = true;
});

// "Играем!" button (initialBtnStart)
document.getElementById('initialBtnStart').addEventListener('click', () => {
    document.querySelector(".initialCard").hidden = true;
    document.querySelector(".rangeNumberSign").hidden = false;
    document.querySelector(".secondaryCard").hidden = false;
    document.querySelector(".card-footer").hidden = true;

    questionNumber = 1;

    minValue = parseInt(initialMinNumber.value);
    maxValue = parseInt(initialMaxNumber.value);
        if (isNaN(minValue) || minValue < -999) { minValue = -999 };
        if (isNaN(maxValue) || maxValue > 999) { maxValue = 999 };
    
    initialRange = document.getElementById('initialRange');
    initialRange.innerText = `от ${minValue} до ${maxValue}`;

    dialogNumber = Math.floor((minValue + maxValue) / 2);
    dialogField = document.getElementById('dialogField');
    dialogField.innerText = `Вы загадали число\n ${numberToText(dialogNumber)}?`;
    questionNumberField = document.getElementById('questionNumberField');
    questionNumberField.innerText = '1';

    gameRun = true;
});

// multichoice answers
function multiAnswers() {
    phraseRandom = Math.round(Math.random()*2);
    switch (phraseRandom){
        case 0:
            return `Как вариант - ${numberToText(dialogNumber)}`;
        case 1: 
            return `Вангую, что это число ${numberToText(dialogNumber)}?`;
        case 2:
            return `Быть может, это ${numberToText(dialogNumber)}?`;   
    }
};

// transforming numbers into text
function numberToText(dialogNumber){
    let ones = {
        1: "один",
        2: "два",
        3: "три",
        4: "четыре",
        5: "пять",
        6: "шесть",
        7: "семь",
        8: "восемь",
        9: "девять"
    };

    let abnormal = {
        10: "десять",
        11: "одиннадцать",
        12: "двенадцать",
        13: "тринадцать",
        14: "четырнадцать",
        15: "пятнадцать",
        16: "шестнадцать",
        17: "семнадцать",
        18: "восемнадцать",
        19: "девятнадцать"
    };

    let tens = {
        2: "двадцать",
        3: "тридцать",
        4: "сорок",
        5: "пятьдесят",
        6: "шестьдесят",
        7: "семьдесят",
        8: "восемьдесят",
        9: "девяносто"
    };

    let hundreds = {
        1: "сто",
        2: "двести",
        3: "триста",
        4: "четыреста",
        5: "пятьсот",
        6: "шестьсот",
        7: "семьсот",
        8: "восемьсот",
        9: "девятьсот"
    }

    let text = ``;
    let number = dialogNumber;
    key = 0;

    if (number === 0) { text = `0` }
    
    if (number < 0) {
        text += `минус `;
        number = number * (-1); // Math.abs?
    } 
    
    if (number >= 100) {
        key = Math.floor(number / 100);
        number = number - key * 100;
        text += hundreds[key] + ` `;
    }
    
    if (number >= 10 && number < 20) {
            text += abnormal[number] + ` `;
    }   else if (number < 10 && number > 0) {
                text += ones[number] + ` `;
        }   else if (number >= 20) {
                    key = Math.floor(number / 10);
                    number = number - key * 10;
                    text += tens[key] + ` `;
            }   

    return text.length<20 ? text : dialogNumber;
};

// "Больше" button (btnOver)
document.getElementById('btnOver').addEventListener('click', () => {
    if (gameRun){
        if (minValue === maxValue){
            phraseRandom = Math.round( Math.random());
            answerPhrase = (phraseRandom === 1) ?
                `У вас пчелы неправильные \n\u{1F914}` :
                `Я сдаюсь \n\u{1F92F}`;

            dialogField.innerText = answerPhrase;
            gameRun = false;
            document.querySelector(".card-footer").hidden = false;
        } else {
            minValue = dialogNumber + 1;
            dialogNumber = Math.floor((minValue + maxValue) / 2);
            questionNumber++;
            questionNumberField.innerText = questionNumber;
            dialogField.innerText = multiAnswers();
            numberToText(dialogNumber);
        }
    }
});

// "Меньше" button (btnLess)
document.getElementById('btnLess').addEventListener('click', () => {
    if (gameRun){
        if (dialogNumber === minValue){
            phraseRandom = Math.round( Math.random());
            answerPhrase = (phraseRandom === 1) ?
                `У вас пчелы неправильные \n\u{1F914}` :
                `Я сдаюсь \n\u{1F92F}`;

            dialogField.innerText = answerPhrase;
            gameRun = false;
            document.querySelector(".card-footer").hidden = false;
        } else {
            maxValue = dialogNumber - 1;
            dialogNumber  = Math.floor((minValue + maxValue) / 2);
            questionNumber++;
            questionNumberField.innerText = questionNumber;
            dialogField.innerText = multiAnswers();
            numberToText(dialogNumber);
        }
    }
});

// "Верно" button (btnEqual) and self-admiring phrases after winning:)
function winPhrase(){
    phraseRandom = Math.round(Math.random()*2);
    switch (phraseRandom){
        case 0:
            return `Казино всегда выигрывает! \n\u{1F60E}`;
        case 1: 
            return `Я угадал эту песню всего c ${questionNumber} нот!`;
        case 2:
            return `Я угадал, ура! (с ${questionNumber} раза!)`;
    }   
};

document.getElementById('btnEqual').addEventListener('click', () => {
    if (gameRun){
        questionNumber = questionNumberField.innerText;
        dialogField.innerText = winPhrase();
        gameRun = false;
        document.querySelector(".card-footer").hidden = false;
    }
});