async function translate(text) {
    try{
        const translate = require('google-translate-api-x');
        const paragraphs = text.split('/\r?\n\s*\r?\n/');
        const translatedParagraphs = [];

        for (let i = 0; i < paragraphs.length; i += 1) {
            
            const translation = await translate(
                paragraphs[i], {
                    from: 'en',
                    to: 'vi'
                }
            );

            translatedParagraphs.push(translation.text);
            
        }
        return translatedParagraphs.join('\n');
    } catch(error){
        throw error;
    }
    
}

module.exports = { translate };