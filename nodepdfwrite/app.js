const express = require('express');
const { PDFDocument, PDFCrossRefSection } = require("pdf-lib");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const standardFonts = require("pdf-lib").StandardFonts
  
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', async (req, res, next) => {
  const id = uuidv4();
  var startTime = performance.now()
  // PDF Modification
  const pdfData = fs.readFileSync('virginp11D.pdf');
  const pdfDoc = await PDFDocument.load(pdfData)
  const pages = pdfDoc.getPages()

  const helveticaFont = await pdfDoc.embedFont(standardFonts.Helvetica)
  var startTime2 = performance.now()
  pages[0].setFont(helveticaFont)

  pages[0].moveTo(28, 688)
  pages[0].drawText('Anders', { size: 12 })
  pages[0].moveTo(28, 674)
  pages[0].drawText('Smith', { size: 14 })
  pages[0].moveTo(28, 755)
  pages[0].drawText('Demo Company', { size: 14 })
  pages[0].moveTo(28, 720)
  pages[0].drawText('paye-ref', { size: 14 })
  pages[0].moveTo(28, 643)
  pages[0].drawText('123A', { size: 14 })
  pages[0].moveTo(224, 643)
  pages[0].drawText('1', { size: 14 })
  pages[0].moveTo(240, 643)
  pages[0].drawText('2', { size: 14 })
  pages[0].moveTo(258, 643)
  pages[0].drawText('3', { size: 14 })
  pages[0].moveTo(274, 643)
  pages[0].drawText('4', { size: 14 })
  pages[0].moveTo(290, 643)
  pages[0].drawText('5', { size: 14 })
  pages[0].moveTo(306, 643)
  pages[0].drawText('6', { size: 14 })
  pages[0].moveTo(322, 643)
  pages[0].drawText('7', { size: 14 })
  pages[0].moveTo(338, 643)
  pages[0].drawText('8', { size: 14 })
  pages[0].moveTo(354, 643)
  pages[0].drawText('A', { size: 14 })

  pages[0].moveTo(360, 672)
  pages[0].drawText('Y', { size: 14 })

  pages[0].moveTo(439, 672)
  pages[0].drawText('0', { size: 14 })
  pages[0].moveTo(455, 672)
  pages[0].drawText('6', { size: 14 })
  pages[0].moveTo(471, 672)
  pages[0].drawText('1', { size: 14 })
  pages[0].moveTo(487, 672)
  pages[0].drawText('1', { size: 14 })
  pages[0].moveTo(503, 672)
  pages[0].drawText('1', { size: 14 })
  pages[0].moveTo(520, 672)
  pages[0].drawText('9', { size: 14 })
  pages[0].moveTo(536, 672)
  pages[0].drawText('9', { size: 14 })
  pages[0].moveTo(551, 672)
  pages[0].drawText('4', { size: 14 })

  pages[0].moveTo(550, 643)
  pages[0].drawText('M', { size: 14 })

  pages[0].moveTo(320, 495)
  pages[0].drawText('100', { size: 14 })
  pages[0].moveTo(400, 495)
  pages[0].drawText('20', { size: 14 })
  pages[0].moveTo(505, 495)
  pages[0].drawText('80', { size: 14 })

  pages[1].moveTo(320, 516)
  pages[1].drawText('100', { size: 14 })
  pages[1].moveTo(400, 516)
  pages[1].drawText('20', { size: 14 })
  pages[1].moveTo(505, 516)
  pages[1].drawText('80', { size: 14 })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()
  
  var endTime = performance.now()
  console.log(`Call to write took ${endTime - startTime} milliseconds ${endTime - startTime2}`)

  console.log("Returning file")
  res.setHeader("Content-Disposition", 'attachment; filename=' + id + ".pdf");
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdfBytes))
})

app.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running, and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);