


const Reviews = (props)=>{
    const {comment, rating} = props.data

    

    console.log("comment and rating", comment, rating)
    

    
    const stars = Array.from({ length: rating }, (_, index) => (
        <span key={index} role="img" aria-label="emoji">⭐</span>
      ));

    return(
        <div>
            <h5>Anonimo</h5> 
            <p>{stars}</p>
            <p>{comment}</p>


        </div>
    ) 
}

export default Reviews;