#!/bin/sh

# to check that the pdf generation is valid
docker cp pdfeditor-orchestrator-1:/app/node.pdf .
docker cp pdfeditor-orchestrator-1:/app/go.pdf .
#docker cp pdfeditor-orchestrator-1:/app/golib.pdf .
docker cp pdfeditor-orchestrator-1:/app/nodepdfwrite.pdf .