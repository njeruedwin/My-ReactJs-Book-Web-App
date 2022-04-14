import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_CONTENT } from "../GraphQl/Queries";

import "../css/paper.css";

function Book() {
  //load my query
  const { loading, error, data } = useQuery(LOAD_CONTENT);
  //set states
  const [clicked, setClicked] = useState(false);
  const [wordValue, setWordValue] = useState("");
  const [clickedWord, setClickedWord] = useState("");
  const [leftPage, setLeftPage] = useState(0);
  const [rightPage, setRightPage] = useState(1);

  //check for error and state if API is loading
  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //function to respond to word clicked
  const wordClickCallback = (word, sentence, currentPage) => {
    setClicked(true);
    setClickedWord(word);
    console.log("word: " + word + " sentence: " + sentence);

    //check the position of the word in the sentence
    // To break the sentence in words
    let s = sentence.split(" ");
    let counter = 0;
    let wordPosition = 0;

    // To get the postion of the word in the sentence
    for (let temp = 0; temp < s.length; temp++) {
      // Comparing the current word
      // with the word to be searched
      //and save the counter number
      if (s[temp] === word) {
        wordPosition = counter;
      }
      counter++;
    }

    //get the value of the word from the token
    const newWordValue = currentPage.tokens[wordPosition].value;
    setWordValue(newWordValue);
  };

  //function to change the double page to next
  const changeToNext = () => {
    const newLeftPage = leftPage + 2;
    const newRightPage = rightPage + 2;

    setLeftPage(newLeftPage);
    setRightPage(newRightPage);
  };

  //function to change the double page to previous
  const changeToPrevious = () => {
    const newLeftPage = leftPage - 2;
    const newRightPage = rightPage - 2;

    setLeftPage(newLeftPage);
    setRightPage(newRightPage);
  };

  //function to display the left page scontent
  const displayLeftPage = () => {
    //pick the current page
    const currentPage = data.book.pages[leftPage];
    const sentence = currentPage.content;
    const words = sentence.split(/ /g);

    return (
      <div className="left_paper_container">
        {/*set page Number */}
        <span className="page_number">{leftPage + 1}.</span>
        <div className="left_paper_content">
          {" "}
          {words.map((word) => (
            <span
              onClick={() => wordClickCallback(word, sentence, currentPage)}
              style={{ cursor: "pointer" }}
            >
              {clicked && word === clickedWord ? " " + wordValue : " " + word}
            </span>
          ))}{" "}
        </div>
        {/* show previous button unless on the first page */}
        {leftPage !== 0 ? (
          <button
            className="previous previous_button"
            onClick={() => changeToPrevious()}
          >
            {" "}
            &laquo;Previous{" "}
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  //function to display the right page content
  const displayRightPage = () => {
    //pick the current page
    const currentPage = data.book.pages[rightPage];
    const sentence = currentPage.content;
    const words = sentence.split(/ /g);

    return (
      <div className="right_paper_container">
        {/*set page Number */}
        <span className="page_number">{rightPage + 1}.</span>
        <div className="right_paper_content">
          {" "}
          {words.map((word) => (
            <span
              onClick={() => wordClickCallback(word, sentence, currentPage)}
              style={{ cursor: "pointer" }}
            >
              {clicked && word === clickedWord ? " " + wordValue : " " + word}
            </span>
          ))}{" "}
        </div>
        {/* show next button unless on the last page */}
        {rightPage !== 27 ? (
          <button class="next next_button" onClick={() => changeToNext()}>
            {" "}
            Next &raquo;
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div>
      <p>{displayLeftPage()}</p>
      <p>{displayRightPage()}</p>

      <p className="identity">Created By Edwin Mugambi Njeru</p>
    </div>
  );
}

export default Book;
