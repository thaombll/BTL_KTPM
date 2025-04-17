const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

async function createPDF(text) {
    return new Promise((resolve, reject) => {
        try {
            const outputPath = path.join(__dirname, 'translate.pdf');
            const stream = fs.createWriteStream(outputPath);
            const pdf = new PDFDocument({
                margin: {
                    top: 30,
                    bottom: 30,
                    right: 50,
                    left: 50
                },
                bufferPages: true,
                info: {
                    CreationDate: new Date()
                }
            });

            pdf.pipe(stream);

            pdf.font('font/Roboto-Regular.ttf');
            pdf.fontSize(13);

            const paragraph = text.split('\n');
            let y = 50;

            paragraph.forEach((p) => {
                if (p.trim() === '') return;

                if (y > 700) {
                    pdf.addPage();
                    y = 50;
                }

                pdf.y = y;
                pdf.text(p, {
                    width: 520,
                    align: 'left',
                    lineGap: 3
                });

                y = pdf.y + 10;
            });

            pdf.end();

            stream.on('finish', () => {
                resolve(outputPath);
            });
            

            stream.on('error', (error) => {
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { createPDF };
