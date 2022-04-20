import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

  const [text, setText] = useState ('')
  const [rating, setRating] = useState (10)
  const [btnDisabled, setbtnDisabled] = useState (true)
  const [message, setMessage] = useState ('')


  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect (() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  //Validation to run whenever we types something in.
  const handleTextChange = (e) => {
    if (text === '') {
      setbtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setbtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setMessage(null)
      setbtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text: text, //text is key and :text is the id connected to FeedbackData
        rating, // short hand of the above ^^
      }
      if (feedbackEdit.edit === true) {
        updateFeedback (feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2> How would you rate your service with us? </h2>
        <RatingSelect select={setRating} selected={rating}></RatingSelect>
        {/* <RatingSelect select={(rating) => setRating(rating)}> </RatingSelect> */}
        <div className="input-group">
          <input onChange={handleTextChange}
          type="text" 
          placeholder="Write a review" 
          value= {text}
          />
          <Button type="submit" isDisabled={btnDisabled}> Send </Button>
        </div>
        {message && <div className="message"> {message} </div>}
      </form>
    </Card>
    
  )
}

export default FeedbackForm