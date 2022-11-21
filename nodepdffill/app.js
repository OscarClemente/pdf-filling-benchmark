const express = require('express');
const { PDFDocument } = require("pdf-lib");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
  
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', async (req, res, next) => {
  const id = uuidv4();
  var startTime = performance.now()
  // PDF Modification
  const pdfData = fs.readFileSync('p11D.pdf');
  const pdfDoc = await PDFDocument.load(pdfData)
  const form = pdfDoc.getForm()
  
  // Fill the form's fields
  form.getTextField('employer_name').setText('Jolanda Neff');

  // Flatten the form's fields
  form.flatten();

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(id+'.pdf', pdfBytes);
  
  var endTime = performance.now()
  console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  console.log("Returning file")
  res.sendFile(id+'.pdf', options);
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);