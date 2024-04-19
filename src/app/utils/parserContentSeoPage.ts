import { arrayClassName, arrayKeyName } from "../constant/arrayClassSeoPage";
import { resultArrayContent } from "./filterArrayContent";
import { JSDOM } from 'jsdom';

const splitUrlLink = (text:string | null) => {
    if(text){
        const textLink = text.split('find/')
        return textLink
    }
    
}
export function parseData(data: string) {
    const parser = new JSDOM(data);;
    const doc = parser.window.document;

    const result: any = [];

    doc.querySelectorAll('*').forEach(node => {
        if (node.textContent && node.textContent.trim() !== '') {
            const text = node.textContent.trim();
            const classList = node.classList;
            const obj: { [key: string ]: string | null | undefined } = {};
            for (let i = 0; i < classList.length; i++) {
               
                for (let i = 0; i < classList.length; i++) {
                    const className = classList.item(i);
                    if (className) {
                        obj[className] = text;
                        if (classList.contains('all-routes__link')) {
                            const linkClassName = classList.item(i);
                            if (linkClassName) {
                                const textLinks = node.getAttribute('href');
                                const resultTextLink = splitUrlLink(textLinks)
                                if(resultTextLink){
                                   obj[linkClassName] = resultTextLink[1]; 
                                }
                            }
                        }
                    }
                }
            }
            result.push(obj);
        }
    });

    const results = resultArrayContent(result, arrayClassName, arrayKeyName);
    return results;
}