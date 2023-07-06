import './PortfolioItem.css'

const PortfolioItem = ({ projectData }) => {
  return (
    <li className="portfolio__item">
      <a
        href={projectData.link}
        className="portfolio__link"
        target="_blank"
        rel="noreferrer"
      >
        {projectData.title}
      </a>
    </li>
  )
}

export default PortfolioItem
