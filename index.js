/*let stringArray=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
                 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
                 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '0', '1', '2',
                 '3', '4', '5', '6', '7', '8', '9'];
*/
/**
 * Simple Caesar Cypher routine, converts the string to array, 
 * takes each individual ascii value, adds 1 to it then converts that
 * back to a character and adds to the new array that in turn is joined
 * together back into a string to be placed into the cypher text.
 */
function doTheMath() {
    let cypherTheText = document.getElementById("radioCypher").checked;    
    let cypherKey = document.getElementById("cypherKey");
    if (cypherTheText === true) {
        sourceText = document.getElementById("plainText");
        destinationText = document.getElementById("textCyphered");
    } else {
        sourceText = document.getElementById("textCyphered");
        destinationText = document.getElementById("plainText");
    }
    let newText = Array();

    // Work out what method of cypher/decypher we are going to use!
    let cypherType = 0; // 0 is default add 1 remove 1, 1 is single number key entered in the cypher key box, 3 is multiple keys based off comma separated numbers. 
    if (cypherKey.value === "") {
        String(sourceText.value).split("").forEach(element => newText.push(String.fromCharCode(Number(element.charCodeAt(0))+(cypherTheText===true?1:-1))) );        
    } else {
        if (isNaN(cypherKey.value) === true)
        {
            let cypherArray = Array();
            String(cypherKey.value).split(",").forEach(element => {
                if (isNaN(element)) {
                    alert("Must be numbers.");
                    cypherKey.focus();
                    return false;
                } else {
                    if (Number(element) < 100 && Number(element) > 0) {
                        cypherArray.push(Number(element));
                    } else {
                        alert("Must be numbers.");
                        cypherKey.focus();                        
                        return false;
                    }
                }
                //cypherArray.push(Number(element.charCodeAt(0)));
            });            
            let currCypherKeyPos = 0;            
            String(sourceText.value).split("").forEach(element => {                                
                newText.push(String.fromCharCode(Number(element.charCodeAt(0))+(cypherTheText===true?cypherArray[currCypherKeyPos]:-cypherArray[currCypherKeyPos])));                
                //newText.push(String.(Number(element.charCodeAt(0))+(cypherTheText===true?cypherArray[currCypherKeyPos]:-cypherArray[currCypherKeyPos])));        
                console.log(cypherArray[currCypherKeyPos]+ "::");
                console.log(String.fromCharCode(Number(element.charCodeAt(0))+(cypherTheText===true?cypherArray[currCypherKeyPos]:-cypherArray[currCypherKeyPos])));
                currCypherKeyPos += 1; 
                if (currCypherKeyPos > (cypherArray.length-1)) {
                    currCypherKeyPos = 0;
                }
            });            
        } else {
            let cypherNumber = Number(cypherKey.value);
            if (cypherNumber < 100 && cypherNumber > 0) {
                String(sourceText.value).split("").forEach(element => newText.push(String.fromCharCode(Number(element.charCodeAt(0))+(cypherTheText===true?cypherNumber:-cypherNumber))) );        
            } else {
                alert("Cypher key must be between 1 and 99");
                cypherKey.focus();
                return false;
            }
        }
    } 
    destinationText.value = newText.join("");        
}

function getCodeFromCharArray() {

}

function setToCypher() {
    let radioOption = document.getElementById("radioCypher");
    radioOption.checked = true;
}

function setToDeCypher() {
    let radioOption = document.getElementById("radioDeCypher");
    radioOption.checked = true;
}