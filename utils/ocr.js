const { createWorker } = require('tesseract.js');
const path = require('path');

async function image2text(imagePath) {
    const langPath = path.join(__dirname, 'tessdata');
    const worker = await createWorker({
        langPath,
        logger: m => console.log(`Progress: ${m.progress ? Math.floor(m.progress * 100) : 0}%`),
    });
    
    try {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        const { data } = await worker.recognize(imagePath);
        await worker.terminate();
        
        data.text = data.text.replace(/\n\n+/g, '###');
        data.text = data.text.replaceAll('\n', ''); 
        data.text = data.text.replace('###', '\n\n'); 

        return data.text;
    } catch (error) {
        await worker.terminate();
        throw error;
    }
}

module.exports = { image2text};

