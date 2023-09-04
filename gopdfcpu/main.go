package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/pdfcpu/pdfcpu/pkg/api"
    "github.com/pdfcpu/pdfcpu/pkg/pdfcpu/model"
)

func DownloadFile(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
    conf := model.NewDefaultConfiguration()
    conf.Cmd = model.LISTFORMFIELDS
    inFile := "p11d.pdf"
    outFile := "p11d.json"
	if err := api.ExportFormFile(inFile, outFile, conf); err != nil {
		fmt.Printf("woooah: %v\n", err)
	}
	fmt.Println("PDFTK generation took", time.Since(start))
	http.ServeFile(w, r, "pdftkfile.pdf")
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", DownloadFile)
	fmt.Println("Go web app started on port 3002")


	start := time.Now()
    conf := model.NewDefaultConfiguration()
    conf.Cmd = model.LISTFORMFIELDS
    inFile := "p11d.pdf"
    inJson := "p11dfill.json"
    outFile := "p11dfill.pdf"
	if err := api.FillFormFile(inFile, inJson, outFile, conf); err != nil {
		fmt.Printf("woooah: %v\n", err)
	}

	fmt.Println("PDFTK generation took", time.Since(start))


	log.Fatal(http.ListenAndServe(":3000", router))
}
