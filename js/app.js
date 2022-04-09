/* const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
		'X-RapidAPI-Key': '9f3fb1de85msh1c34bc9201a2744p12929ajsn51c57cf1218b'
	},
	body: '[{"Text":"I would really like to drive your car around the block a few times."}]'
};

fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to=ru&api-version=3.0&profanityAction=NoAction&textType=plain', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err)); */
var currentTo;
const oneArea = document.getElementById('oneArea');
const twoArea = document.getElementById('twoArea');
const changeLanguage = document.getElementById('changeLanguage');
const clipboardLeft = document.getElementById('clipboardLeft');
const clipboardRigth = document.getElementById('clipboardRigth');

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
		'X-RapidAPI-Key': '9f3fb1de85msh1c34bc9201a2744p12929ajsn51c57cf1218b'
	},
	body: `[{"Text":"${oneArea.value}"}]`
};


mainFunc('en')
/* dictonary() */
oneLength.textContent = `${oneArea.value.length}/10000`
function mainFunc(to){
    fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to=${to}&api-version=3.0&profanityAction=NoAction&textType=plain`, options)
	.then(response => response.json())
	.then(function(json) { 
        /* console.log(json) */
        console.log(json[0].translations[0].text)
        twoArea.value = json[0].translations[0].text
    })
	.catch(err => console.error(err));
}



function dictonary(){
    fetch('https://microsoft-translator-text.p.rapidapi.com/Dictionary/Examples?to=%3CREQUIRED%3E&from=%3CREQUIRED%3E&api-version=3.0', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}



oneArea.addEventListener('input',function(){
    options.body =`[{"Text":"${oneArea.value}"}]`
    if(currentTo == undefined){
        if(document.getElementById('lang1').textContent == 'Русский'){
            currentTo = 'en'
        }
        if(document.getElementById('lang1').textContent == 'Английский'){
            currentTo = 'ru'
        }
    }
    console.log(oneArea.value,currentTo)
    mainFunc(currentTo)
    oneLength.textContent = `${oneArea.value.length}/10000`
})

changeLanguage.addEventListener('click',function(){
    if(document.getElementById('lang1').textContent == 'Русский'){
        currentTo = 'ru'
        document.getElementById('lang1').textContent = 'Английский'
        document.getElementById('lang2').textContent = 'Русский'
        reservOne = oneArea.value;
        reservTwo = twoArea.value
        oneArea.value = reservTwo
        twoArea.value = reservOne
        mainFunc(currentTo)
    }
    else if(document.getElementById('lang1').textContent == 'Английский'){
        currentTo = 'en'
        document.getElementById('lang1').textContent = 'Русский'
        document.getElementById('lang2').textContent = 'Английский'
        reservOne = oneArea.value;
        reservTwo = twoArea.value
        oneArea.value = reservTwo
        twoArea.value = reservOne
        mainFunc(currentTo)
    }
})

clipboardLeft.addEventListener('click',function(){
    oneArea.select();    
    document.execCommand("copy");
})


clipboardRigth.addEventListener('click',function(){
    twoArea.select();    
    document.execCommand("copy");
})


