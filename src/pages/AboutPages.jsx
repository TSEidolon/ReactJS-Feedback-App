import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPages() {
  return (
    <Card>
      <div className="about">
        <h1> About this Project </h1>
        <p> This is a React app to leave feedback for a product or service </p>
        <p> &copy;Edgar Caballero, Version: 1</p>
        <p> This project was made in the "React Front to Back 2022" course by Brad Traversy in <a href="http://udemy.com" target="_blank" class="udemy-link">Udemy.com</a> </p>

        <p>
          <Link to='/' class="about-home-link"> Back to Home </Link>
        </p>
      </div>
    </Card>
  )
}

export default AboutPages