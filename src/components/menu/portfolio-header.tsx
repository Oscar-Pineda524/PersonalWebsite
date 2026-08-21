import Image from "next/image";

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
        <span className="portfolio-mark">
          <Image
            src="/assets/pictures/profilepic.png"
            alt={`${name} profile photo`}
            width={200}
            height={200}
          />
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
