import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Header ({text, bgColor, textColor}) {
  const Headerstyles = {
    backgroundColor: bgColor, 
    color: textColor
  }
    return (
      <header style={Headerstyles}>
        <div className="container">
          <Link to='/' clas="header-text-main">
            <h1 class="header-text-logo">{text}</h1> 
          </Link>
        </div>
      </header>
    )
  }
// If you arent passing anything in the props
  Header.defaultProps = {
    text: 'Feedback UI',
    bgColor: '#fff',
    textColor: '#ff6a95',
  }
  Header.propTypes = {
    text: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string
  }
export default Header