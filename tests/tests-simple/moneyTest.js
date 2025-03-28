import { formatcurrency } from "../../scripts/utils/money.js";

if(formatcurrency(2095)==='20.95'){
    console.log('Passed');
}
else { 
    console.log('failed');
    
}
if(formatcurrency(0)==='0.00'){
    console.log('Passed');
}
else { 
    console.log('failed');
    
}
 if(formatcurrency(2000.5)==='20.01'){
    console.log('Passed');
}
else { 
    console.log('failed');
    
}
if(formatcurrency(2000.4)==='20.00'){
    console.log('Passed');
}
else { 
    console.log('failed');
    
}
if(formatcurrency(-2000.4)==='-20.00'){
    console.log('Passed');
}
else { 
    console.log('failed');
    
}