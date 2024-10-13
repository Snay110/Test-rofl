gi
const body = document.querySelector('body');
const container = document.querySelector('.container');
const test_1 = document.getElementById('gari');
const test_2 = document.getElementById('vis');
const test_3 = document.getElementById('iSAn');
const questionnaires = [
	// Test 1
	{
		"Изучал Статику?": {
			"Да": {
				answer: "Горизонт"
			},
			"Нет": {
				"Готов учить Передний вис?": {
					"Да": {
						answer: "Не пи*ди Горизонт"
					},
					"Нет": {
						answer: "Ну так чё ты выёбываешься? Иди трень"
					}
				}
			}
		}
	},
	// Test 2
	{
		"Ты тупой?": {
			"Да": {
				"Есть друзья?": {
					"Да": {
						"Тоже тупые?": {
							"Да": {
								answer: "Статика"
							},
							"Нет": {
								answer: "Хз тогда чё ты тут делаешь. Ну пусть будет Статика"
							}
						}
					},
					"Нет": {
						answer: "Статика"
					}
				}
			},
			"Нет": {
				"Давно стал тупым?": {
					"Да": {
						answer: "Ну а говоришь, что не тупой. Статика"
					},
					"Нет": {
						answer: "Ну начни с Статика:)"
					}
				}
			}
		}
	},
	// Test 3
	{
		"Красавец?": {
			"Да": {
				answer: "Блин, капец я рад за тебя! :)"
			},
			"Нет": {
				answer: "Понимаю"
			}
		}
	}
]
let questionnaireClone = structuredClone(questionnaires);

body.addEventListener('click', (el) => {
    if (el.target.classList[0] == 'modal__window-close') {
        closeModalWindow();
    }

    if (el.target.classList[0] == 'submitBtn') {
        el.preventDefault();
        const question = document.getElementById('question').textContent;
        const reply = document.getElementsByName('choice');

        let currObj = questionnaireClone.find(i => Object.keys(i)[0] == question);
        let selected;
        for (let i = 0; i < reply.length; i++) {
            if (reply[i].checked) {
                selected = reply[i];
            }
        }
        if (selected.value === 'yes') {
            closeModalWindow();
            let newQuestion = currObj[question]["Да"];
            if ('answer' in newQuestion) questionnaireClone = structuredClone(questionnaires);
            let arrIndex = questionnaireClone.indexOf(currObj);
            questionnaireClone[arrIndex] = newQuestion;
            startQuestionnaire(newQuestion);
        } else {
            closeModalWindow();
            let newQuestion = currObj[question]["Нет"];
            if ('answer' in newQuestion) questionnaireClone = structuredClone(questionnaires);
            let arrIndex = questionnaireClone.indexOf(currObj);
            questionnaireClone[arrIndex] = newQuestion;
            startQuestionnaire(newQuestion);
        }
    }
});

test_1.addEventListener('click', (el) => {
    startQuestionnaire(questionnaires[0]);
});

test_2.addEventListener('click', (el) => {
    startQuestionnaire(questionnaires[1]);
});
test_3.addEventListener('click', (el) => {
    startQuestionnaire(questionnaires[2]);
});

function startQuestionnaire(Questionnaire) {
    const question = Object.keys(Questionnaire)[0];
    const answer = [];

    if ('answer' in Questionnaire[question]) {
        openModalWindow(Questionnaire[question].answer);
    } else {
        for (let key in Questionnaire[question]) {
            answer.push(key); 
        }
        openModalWindow(question, answer);
    }
}

async function showResult(question) {
    const result = document.createElement('h1');
    result.innerText = question;
    result.style.fontFamily = 'Montserrat';
    result.style.textAlign = 'center';
    result.style.margin = '150px auto';
    return result;
}

async function openModalWindow(question, answer = null) {
    lockBg();
    const window = document.createElement('div');
    window.classList.add('modal__window');
    const crossBtn = "<img src='https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000' />";
    window.innerHTML = crossBtn;

    if (answer) {
        const form = createForm(question, answer);
        window.appendChild(form);
    } else {
        const result = await showResult(question);
        window.appendChild(result);
        closeModalWindow();
    }
    body.appendChild(window);
}

function closeModalWindow() {
    const window = document.querySelector('.modal__window');
    body.removeChild(window);
    unLockBJ();
}

function createForm(question, answer) {
    const form = document.createElement('form');
    const questionTitle = document.createElement('h3');
    questionTitle.classList.add('question');
    questionTitle.setAttribute('id', 'question');
    questionTitle.innerText = question;

    const answerGroup = document.createElement('div');
    answerGroup.classList.add('form__list');
    for (let i = 0; i < answer.length; i++) {
        const answerItem = document.createElement('div');
        answerItem.classList.add('form__list-item');

        const itemInput = document.createElement('input');
        itemInput.setAttribute('type', 'radio');
        itemInput.setAttribute('name', 'choice');
        itemInput.setAttribute('value', answer[i]);
        itemInput.setAttribute('id', 'choice_' + i);

        const itemLabel = document.createElement('label');
        itemLabel.setAttribute('for', 'choice_' + i);
        itemLabel.innerText = answer[i];

        answerItem.appendChild(itemInput);
        answerItem.appendChild(itemLabel);
        answerGroup.appendChild(answerItem);
    }

    const btn = document.createElement('button');
    btn.classList.add('submitBtn');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('id', 'submit_btn');
    btn.innerText = 'Ответить';

    form.appendChild(questionTitle);
    form.appendChild(answerGroup);
    form.appendChild(btn);

    return form;
}

function lockBg() {
    const shadow = document.createElement('div');
    shadow.classList.add('shadow');
    container.appendChild(shadow);
}

function unLockBJ() {
    const shadow = document.querySelector('.shadow');
    container.removeChild(shadow);
}


