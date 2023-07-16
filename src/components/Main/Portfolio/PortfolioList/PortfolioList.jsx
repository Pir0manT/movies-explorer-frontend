import PortfolioItem from '../PortfolioItem/PortfolioItem'
import './PortfolioList.css'

const projects = [
  {
    title: 'Статичный сайт',
    link: 'https://pir0mant.github.io/how-to-learn/',
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://pir0mant.github.io/russian-travel/',
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://mesto.top61.ru/',
  },
]

const PortfolioList = () => {
  return (
    <ul className="portfolio__list">
      {projects.map((project) => (
        <PortfolioItem key={project.title} projectData={project} />
      ))}
    </ul>
  )
}

export default PortfolioList
