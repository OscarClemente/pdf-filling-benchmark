package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received home page request")
	fmt.Fprintf(w, "Test Go web app.")
}

func askNodePdfFill(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received ask request")

	resp, err := http.Get("http://nodepdffill:3001")
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Fprintf(w, "Test Go web app asks Node web app: %s", body)
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/nodePdfFill", askNodePdfFill)
}

func main() {
	fmt.Println("Go web app started on port 3000")
	setupRoutes()

	getFileFrom("http://nodepdffill:3000", "node.pdf")
	getFileFrom("http://gopdftk:3000", "go.pdf")

	http.ListenAndServe(":3000", nil)
}

func getFileFrom(url, filename string) {
	time.Sleep(4 * time.Second)
	resp, err := http.Get(url)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println(url, "Cool")

	err = os.WriteFile(filename, body, 0644)
	if err != nil {
		fmt.Println("Error writing file")
	}
}
