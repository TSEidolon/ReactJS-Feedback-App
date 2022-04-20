import { createContext, useState, useEffect } from "react";


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

  const [isLoading, setIsLoading] = useState (true)

  const [feedback, setFeedback] = useState ([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(()=> {
    fetchFeedback();
  }, [])

  //fetch feedback
  const fetchFeedback = async () => {
    //JSON server gives the capability to sort etc by adding query perams
    //sort by id and order by desc
    const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc")
    const data = await response.json()

    setFeedback(data)
    setIsLoading (false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch ('http://localhost:5000/feedback', {
      method:'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback]) 
    // ... is a spread operator by taking the feedback items that are already there and place them inside the array ... 
    // sets feedback to an array with all the current feedback items and the new one
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch (`http://localhost:5000/feedback/${id}`, {method: 'DELETE'})
      
      setFeedback(feedback.filter((item) => item.id !== id)) 
    }
  }

  //Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch (`http://localhost:5000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()

    setFeedback(feedback.map((item) => item.id === id ? {...item, ...data } : item))

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider 
      value={{
        feedback,
        feedbackEdit, //piece of state that holds the item and the boolean
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback, // funciton
        updateFeedback,
      }}>
    {children}
  </FeedbackContext.Provider>
  )
 
}

export default FeedbackContext