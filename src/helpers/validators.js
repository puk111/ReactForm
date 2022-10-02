
const peselCheck = (pesel) =>{
  const peselReg = /^[0-9]{11}$/
  if(peselReg.test(pesel) === false) 
        return false;
    else{
      const digits = (""+pesel).split("");
        if ((parseInt(pesel.substring( 4, 6)) > 31)||(parseInt(pesel.substring( 2, 4)) > 12))
            return false;
          
        var checksum = (1*parseInt(digits[0]) + 3*parseInt(digits[1]) + 7*parseInt(digits[2]) + 9*parseInt(digits[3]) + 1*parseInt(digits[4]) + 3*parseInt(digits[5]) + 7*parseInt(digits[6]) + 9*parseInt(digits[7]) + 1*parseInt(digits[8]) + 3*parseInt(digits[9]))%10;
        if(checksum===0) checksum = 10;
            checksum = 10 - checksum;
  
        return (parseInt(digits[10])===checksum);
    }
}

const nipCheck = (nip) =>{
  if(typeof nip !== 'string')
  return false;

  nip = nip.replace(/[\ \-]/gi, '');

  let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  let controlNumber = parseInt(nip.substring(9, 10));
  let weightCount = weight.length;
  for (let i = 0; i < weightCount; i++) {
    sum += (parseInt(nip.substr(i, 1)) * weight[i]);
  }

  return sum % 11 === controlNumber;
}

export { nipCheck ,peselCheck}