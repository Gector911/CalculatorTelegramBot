
exports.Operations = Operations;
exports.GetCalculatorKeyboard = GetCalculatorKeyboard;

// -------------JSON calculator keyboard ------------------
function GetCalculatorKeyboard (){
  return {
        "inline_keyboard": [
            [{ text: 'AC', callback_data: 'AC'}, { text: '+', callback_data: '+'}, { text: '-', callback_data: '-'}],
            [{ text: '1', callback_data: '1'}, { text: '2', callback_data: '2'}, { text: '3', callback_data: '3'}],
            [{ text: '4', callback_data: '4'}, { text: '5', callback_data: '5'}, { text: '6', callback_data: '6'}],
            [{ text: '7', callback_data: '7'}, { text: '8', callback_data: '8'}, { text: '9', callback_data: '9'}],
	    	                [{ text: '0', callback_data: '0'}, { text: '=', callback_data: '='}]
        ]
    };
  }
//------------------------------------------------

// ------check last symbol------------------
function CheckLastSymbol (str){
  if( isNaN(str[str.length-1])) {return str.substring(0,str.length-1);}
  else return str;
}
//------------------------------------------------

// ------calculator logic------------------
function Operations (text, value){

	if( text == '0' && !isNaN(value)) {return value;}
  else if( text[text.length-1] == '0' && isNaN(text[text.length-2]) && !isNaN(value) ) {
    return text.substring(0, text.length-1) + value;}

	switch (value){

	case 'AC': return '0';
  case '+' : return CheckLastSymbol(text)+value;
  case '-' : return CheckLastSymbol(text)+value;
  case '=' : return eval(CheckLastSymbol(text));
	default  : return text+value;}
}

//------------------------------------------------
