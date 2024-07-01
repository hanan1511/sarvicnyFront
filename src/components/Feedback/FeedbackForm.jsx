import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "axios";
import { useLocation } from 'react-router-dom';
const MySwal = withReactContent(Swal);

const FeedbackForm = ({orderid}) => {
  let selectedRating = null;
  const location = useLocation();
  let api= ``;
  if(location.pathname=="/ordersCust"){
    api = `https://localhost:7188/api/Customer/addCustomerRating/${orderid}`
  }else if(location.pathname=="/provider/reqdetail"){
     api = `https://localhost:7188/api/ServiceProvider/addProviderRating/${orderid}`
  }
  const handleFeedback = async (rating, feedbackText) => {
    const values={
      rate:rating,
      comment:feedbackText
    } 
    if(api!=``){
      const resp = await axios.post(api,values).catch((err)=>(
        console.log(err.response.data.message)
      ));
      console.log(rating, feedbackText,orderid);
      if(resp){
        MySwal.fire({
          icon: rating >= 4 ? 'success' : 'info',
          title: 'Thank you for your feedback!',
          text: `You selected ${rating} out of 5\n\nAdditional feedback: ${feedbackText}`,
        });
      }
    }
    
  };

  const showFeedbackPopup = () => {
    MySwal.fire({
      title: 'How was your experience getting help with this issue?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Close',
      confirmButtonText: 'Submit',
      html: `
        <div>
          <button id="rate-1" class="swal2-styled border-0 rounded-4">😡</button>
          <button id="rate-2" class="swal2-styled border-0 rounded-4">😕</button>
          <button id="rate-3" class="swal2-styled border-0 rounded-4">😐</button>
          <button id="rate-4" class="swal2-styled border-0 rounded-4">🙂</button>
          <button id="rate-5" class="swal2-styled border-0 rounded-4">😄</button>
        </div>
        <textarea id="feedback-text" class="swal2-textarea" placeholder="Additional feedback" style="margin-top: 20px; width: 70%;"></textarea>
      `,
      didOpen: () => {
        document.getElementById('rate-1').addEventListener('click', () => selectedRating = 1);
        document.getElementById('rate-2').addEventListener('click', () => selectedRating = 2);
        document.getElementById('rate-3').addEventListener('click', () => selectedRating = 3);
        document.getElementById('rate-4').addEventListener('click', () => selectedRating = 4);
        document.getElementById('rate-5').addEventListener('click', () => selectedRating = 5);
      },
      preConfirm: () => {
        const feedbackText = document.getElementById('feedback-text').value;
        if (selectedRating === null) {
          Swal.showValidationMessage('You need to choose a rating!');
          return false;
        }
        return { rating: selectedRating, feedbackText };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { rating, feedbackText } = result.value;
        handleFeedback(rating, feedbackText);
      }
    });
  };

  return (
    <div>
      <button onClick={showFeedbackPopup}>
        Give Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
