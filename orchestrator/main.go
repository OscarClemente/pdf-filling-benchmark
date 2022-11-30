package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"
	"time"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received home page request")
	fmt.Fprintf(w, "Test Go web app.")
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
}

func main() {
	fmt.Println("Go web app started on port 3000")
	setupRoutes()

	time.Sleep(3 * time.Second)
	//getFileFrom("http://nodepdffill:3000", "node.pdf")
	//getFileFrom("http://gopdftk:3000", "go.pdf")
	//getFileFrom("http://nodepdfwrite:3000", "nodepdfwrite.pdf")
	const calls = 1000

	dur1 := getFileFromConcurrently("http://nodepdffill:3000", calls)
	//dur2 := getFileFromConcurrently("http://gopdftk:3000", calls)
	dur3 := getFileFromConcurrently("http://nodepdfwrite:3000", calls)
	fmt.Println("nodepdffill:", dur1, calls, "nodepdfwrite:", dur3, calls)

	http.ListenAndServe(":3000", nil)
}

func getFileFrom(url, filename string) {
	time.Sleep(1 * time.Second)

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

	if len(filename) > 0 {
		err = os.WriteFile(filename, body, 0644)
		if err != nil {
			fmt.Println("Error writing file")
		}
	}
}

func getFileFromConcurrently(url string, calls int) time.Duration {
	fmt.Println("-- Getting files from", url)
	time.Sleep(2 * time.Second)

	var wg sync.WaitGroup
	start := time.Now()
	for i := 0; i < calls; i++ {
		i := i
		// Increment the WaitGroup counter.
		wg.Add(1)
		// Launch a goroutine to fetch the URL.
		go func(url string) {
			// Decrement the counter when the goroutine completes.
			defer wg.Done()
			// Fetch the URL.
			_, err := http.Get(url)
			if err != nil {
				fmt.Println(url, "failed", i, err)
			}
		}(url)
	}
	// Wait for all HTTP fetches to complete.
	wg.Wait()
	dur := time.Since(start)
	fmt.Println("-- Finished", url, dur)
	return dur
}
