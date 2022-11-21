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
  form.getTextField('employer_name').setText('Demo PDF');
  form.getTextField('paye_reference').setText('123456Q');
  form.getTextField('surname').setText('Smith');
  form.getTextField('first_names').setText('Anders');
  form.getTextField('works_number').setText('123A');
  form.getTextField('ni_1').setText('1');
  form.getTextField('ni_2').setText('2');
  form.getTextField('ni_3').setText('3');
  form.getTextField('ni_4').setText('4');
  form.getTextField('ni_5').setText('5');
  form.getTextField('ni_6').setText('6');
  form.getTextField('ni_7').setText('7');
  form.getTextField('ni_8').setText('8');
  form.getTextField('ni_9').setText('A');
  form.getTextField('director').setText('Y')
  form.getTextField('dob_d1').setText('0');
  form.getTextField('dob_d2').setText('6');
  form.getTextField('dob_m1').setText('1');
  form.getTextField('dob_m2').setText('1');
  form.getTextField('dob_y1').setText('1');
  form.getTextField('dob_y2').setText('9');
  form.getTextField('dob_y3').setText('9');
  form.getTextField('dob_y4').setText('4');
  form.getTextField('gender').setText('M');
  form.getTextField('class_i_cost').setText('200');
  form.getTextField('class_i_made_good').setText('50');
  form.getTextField('class_i_cash_equivalent').setText('150');
  form.getTextField('class_m_description').setText('turbogym');
  form.getTextField('class_m_cost').setText('100');
  form.getTextField('class_m_made_good').setText('20');
  form.getTextField('class_m_cash_equivalent').setText('80');

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