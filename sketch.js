let ranNum1;
let ranNum2;
let ranNum3;

let input1;
let input2;
let output1;

let button1;
let button2;

let inputMessage;
let encryptedAESMessage;
let decryptedAESMessage;

function setup() {
	
	canvas = createCanvas(windowWidth, windowHeight);
	ranNum1 = random(255);
	ranNum2 = random(255);
	ranNum3 = random(255);
	
	input1 = createElement('textarea', 'your text here');
	input1.position(10,10);
	input1.size(400, 100);
	input1.style('resize', 'none');
	
	input2 = createElement('textarea', 'your key here');
	input2.position(10,120);
	input2.size(400, 100);
	input2.style('resize', 'none');
	
	button1 = createButton('encrypt');
	button1.position(420,10);
	button1.mousePressed(encryptText);
	
	button2 = createButton('decrypt');
	button2.position(420,40);
	button2.mousePressed(decryptText);
	
	output1 = createElement('textarea', 'encrypted / decrypted message here');
	output1.position(10,230);
	output1.size(400, 100);
	output1.style('resize', 'none');
	output1.id('outputtext1');
	
}

function draw() {
	background(134, 216, 174);
}

function encryptText(){
	encryptedAESMessage = CryptoJS.AES.encrypt(input1.value(), input2.value());
	document.getElementById('outputtext1').value = encryptedAESMessage;
}

function decryptText(){
	decryptedAESMessage = CryptoJS.AES.decrypt(input1.value(), input2.value());
	document.getElementById('outputtext1').value = decryptedAESMessage.toString(CryptoJS.enc.Utf8);
}