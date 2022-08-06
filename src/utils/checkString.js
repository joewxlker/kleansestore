
export const checkString = (type, varOne) => {
    if (varOne === undefined) return
    // console.log(type,varOne)
    let bool = false;
    const specialChar = ['!', ' ', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '1',
        '2', '3', '4', '5', '6', '7', '8', '9', '0', '~', '`', '-', '=', '<', ',', '.', '.', '>',
        '/', '?', ';', ':', '"', "'", '[', ']', '|', '\\']
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'y', 'Z']
    
    if (type === 'firstname' || type === 'lastname') {
        // console.log(`checking ${varOne} @ ${type} `,varOne.length)
        if (varOne.length > 2 && varOne.length < 20) {
            for (let v in varOne) {
                for (let k in specialChar) {
                    if (varOne[v] === specialChar[k]) {
                        // console.log(`${varOne} contains special characters`);
                        bool = true
                    } //error
                }
            }
        }
        else {
            // console.log(`${varOne} is too short`);
            bool = true
        }//error
    }

    let emailCheckOne;
    let emailCheckTwo;
    if (type === 'email') {
        // console.log(`checking ${varOne} @ ${type} `,)
        for (let v in varOne) {
            if (varOne[v] === '@') emailCheckOne = true; //error
            if (varOne[v] === '.') emailCheckTwo = true; //error
            if (varOne[v] === ' ') bool = true;
        }
        if (emailCheckOne === true && emailCheckTwo === true) bool = false //no error
        else bool = true //error
    }
    
    if (type === 'password') {
        // console.log(`checking ${varOne} @ ${type} `,)
        bool = passwordCheck(specialChar,uppercase,varOne)
    }
    
    if (type === 'dateofbirth') {
        console.log(`checking ${varOne} @ ${type} `,)
        if (varOne === 'Day' || varOne === 'Month' || varOne === 'Year') bool = true
        else bool = false
    }

    if (bool === false) {
        // console.log(`${type} checks returned no errors using ${varOne}`);
        // console.log(bool)
        return false
    }
    if (bool === true) {
        // console.log(`${type} checks returned error ${varOne}`);
        // console.log(bool)
        return true
    }
}

const passwordCheck = (specialChar,uppercase,varOne) => {
    // console.log('check password running')
    let bool = true;
        for (let v in varOne) {
            for (let k in specialChar) {
                if (varOne[v] === specialChar[k]) { bool = false } //no error
                if (varOne[v] === uppercase[k]) { bool = false } // no error
            }
        }
        return bool // error
}
    