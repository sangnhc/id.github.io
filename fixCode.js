import { convertNumberToMathMode,thay_haicham_colon, themdolachoso,xoa_khoangtrong_trong_ngoac, them_dola_cho_so } from './numberUtils.js';
import { replaceTextWithJson, convertArrayToHeva, convertArrayToHoac,removeSpacesInMathMode } from './replaceUtils.js';
import { them_dola_cho_so_new} from './numberUtils.js';
export function fixCode() {
    let inputCode = document.getElementById('inputCode').value;
    inputCode = inputCode.replace('Lò̀i giải','Lời giải')
    inputCode = them_dola_cho_so_new(inputCode)
    inputCode = inputCode.replace(/Câu\s+\$(\d+)\$\s*([.:])/g, 'Câu $1$2');
    inputCode = inputCode.replace(/\\mathrm{R}/g, '\\mathbb{R}');
    inputCode = convertNumberToMathMode(inputCode);
    inputCode = inputCode.replace(/}\s*{/g, '}{');
    inputCode = convertArrayToHeva(inputCode);
    inputCode = convertArrayToHoac(inputCode);
    //inputCode = removeSpacesInMathMode(inputCode);
    inputCode = themdolachoso(inputCode);
    inputCode = them_dola_cho_so(inputCode)
    inputCode = xoa_khoangtrong_trong_ngoac(inputCode)
    inputCode = thay_haicham_colon(inputCode)
    
    fetch('replace.json')
        .then(response => response.json())
        .then(data => {
            inputCode = replaceTextWithJson(data, inputCode);
            document.getElementById('outputCode').value = inputCode;
        })
        .catch(error => console.error('Error:', error));
}
