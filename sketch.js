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
	
	//input1 = createInput();
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
	// background(ranNum1, ranNum2, ranNum3);
	background(134, 216, 174);
}

function encryptText(){
	//var tempText = input1.value();
	
	encryptedAESMessage = encryptData(input1.value(), input2.value());
	document.getElementById('outputtext1').value = encryptedAESMessage;

}

function decryptText(){

	decryptedAESMessage = decryptData(input1.value(), input2.value());
	document.getElementById('outputtext1').value = decryptedAESMessage;

}

function encryptData(msg, pwd) {
    var salt = CryptoJS.lib.WordArray.random(128/8);
    var key = CryptoJS.PBKDF2(pwd, salt, {
        keySize: 512/32,
        iterations: 500
    });
    var iv = CryptoJS.lib.WordArray.random(128/8);
    var encrypted = CryptoJS.AES.encrypt(msg, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    var encryptedMessage = salt.toString()+ iv.toString() + encrypted.toString();
    return encryptedMessage;
}

function decryptData(msg, pwd) {
    var salt = CryptoJS.enc.Hex.parse(msg.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(msg.substr(32, 32))
    var encrypted = msg.substring(64);

    var key = CryptoJS.PBKDF2(pwd, salt, {
        keySize: 512/32,
        iterations: 500
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}