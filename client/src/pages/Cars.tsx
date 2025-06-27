import { Link } from "react-router-dom"


const Cars = () => {
  return (
    <div>
      <h1>Available Cars</h1>
      <p>Explore our collection of cars available for rent.</p>
      {/* Add more content or components as needed */}
      <Link to={"/car-details/:id"}>car detail</Link>
      
    </div>
  )
}

export default Cars
