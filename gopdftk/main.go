package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"time"

	"github.com/gorilla/mux"
)

func DownloadFile(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	out, err := exec.Command("./pdftk", "p11D.pdf", "fill_form", "commands.fdf", "output", "pdftkfile.pdf", "flatten").Output()
	if err != nil {
		fmt.Println(out)
		fmt.Println(err)
	}
	fmt.Println("PDFTK generation took", time.Since(start))
	http.ServeFile(w, r, "pdftkfile.pdf")
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", DownloadFile)
	fmt.Println("Go web app started on port 3002")

	log.Fatal(http.ListenAndServe(":3000", router))
}
