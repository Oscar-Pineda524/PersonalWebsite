import { ProfileButton } from "@/components/menu/profile-button";
import { StatusClock } from "@/components/menu/status-clock";

interface PortfolioHeaderProps {
  name: string;
  title: string;
  onProfileSelect: () => void;
}

export function PortfolioHeader({
  name,
  title,
  onProfileSelect,
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

      <div className="portfolio-header__status">
        <StatusClock />
        <ProfileButton name={name} onSelect={onProfileSelect} />
      </div>
    </header>
  );
}
