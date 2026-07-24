interface PortfolioHeaderProps {
  name: string;
  title: string;
}

export function PortfolioHeader({
  name,
  title,
}: PortfolioHeaderProps) {
  return (
    <header className="portfolio-header">
      <div className="portfolio-header__identity">
        <span className="portfolio-mark" aria-hidden="true">
          <span>OS</span>
        </span>
        <div>
          <p className="portfolio-header__name">{name}</p>
          <h1 className="portfolio-header__title">{title}</h1>
        </div>
      </div>

      <p className="portfolio-header__hint">Choose a channel</p>
    </header>
  );
}
