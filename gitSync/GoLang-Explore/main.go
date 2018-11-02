package main

import (
	"io"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"os"
	"crypto/sha256"
	"encoding/hex"
	_ "encoding/hex"
	_ "encoding/json"
	_ "io"
	_ "log"
	_ "net/http"
	_ "os"
	"time"
	_ "time"

	_ "github.com/davecgh/go-spew/spew"
	_ "github.com/gorilla/mux"
	_ "github.com/joho/godotenv"
)

type Block struct { // Block structure for blockchain
	BlockHeight int
	TimeStamp   string
	Data        int
	Hash        string
	PrevHash    string
}

var BlockChain []Block // BlockChain

func calculateHash(b Block) string {
	record := string(b.BlockHeight) + b.TimeStamp + string(b.Data) + b.PrevHash
	h := sha256.New()
	h.Write([]byte(record))
	hashed := h.Sum(nil)
	return hex.EncodeToString(hashed)
}

/**Generate Blocks*/
func generateBlock(ob Block, d int) (Block, error) {
	var newBlock Block
	t := time.Now()

	newBlock.BlockHeight = ob.BlockHeight + 1
	newBlock.TimeStamp = t.String()
	newBlock.PrevHash = ob.PrevHash
	newBlock.Data = d
	newBlock.Hash = calculateHash(newBlock)

	return newBlock, nil
}

func isBlockValid(o, n Block) bool {
  if o.BlockHeight != (n.BlockHeight -1)
  {
	  return false
  }

  if o.Hash != n.PrevHash {
	  return false
  }

  if calculateHash(n) != n.Hash {
	  return false
  }

  return true
}

func replaceChain(newBlocks []Block) {
	if len(newBlocks) > len(Blockchain) {
		Blockchain = newBlocks
	}
}


// web server 
func run() error {
	mux := makeMuxRouter()
	httpAddr := os.Getenv("ADDR")
	log.Println("Listening on ", os.Getenv("ADDR"))
	s := &http.Server{
		Addr:           ":" + httpAddr,
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	if err := s.ListenAndServe(); err != nil {
		return err
	}

	return nil
}

func makeMuxRouter() http.Handler {
	muxRouter := mux.NewRouter()
	muxRouter.HandleFunc("/",handleGetBlockchain).Methods("GET")
	muxRouter.HandleFunc("/",handleWriteBlock).Methods("POST")
	return muxRouter
}

func handleGetBlockchain(w http.ResponseWriter, r *http.Request){
	bytes, err := json.MarshalIndent(BlockChain,""," ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	io.WriteString(w, string(bytes))
}