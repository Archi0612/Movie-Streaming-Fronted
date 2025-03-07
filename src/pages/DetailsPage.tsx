import React from 'react';
import './DetailsPage.css';

const DetailsPage: React.FC = () => {
  return (
    <div className="details-container">
      <div className="header-container">
        <div className="header-image-container">
          <img 
            src="https://w0.peakpx.com/wallpaper/641/809/HD-wallpaper-jurassic-park-dark-dinosaur-jurassic-logo-movie-park-whatsapp-world.jpg" 
            alt="Jurassic Park Banner" 
            className="header-image" 
          />
          <div className="logo-container">
            <img 
              src="/api/placeholder/150/75" 
              alt="Jurassic Park Logo" 
              className="movie-logo" 
            />
          </div>
        </div>
        <div className="navigation-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="content-container">
        <div className="title-section">
          <h1 className="movie-title">Jurassic Park</h1>
          <div className="movie-meta">
            <span className="runtime">2 hours 7 minutes</span>
            <span className="divider">•</span>
            <span className="rating">PG-13</span>
            <span className="divider">•</span>
            <span className="genres">Action, Adventure</span>
            <span className="divider">•</span>
            <span className="release-date">11 June 1993 (USA)</span>
          </div>
        </div>

        <div className="rating-container">
          <div className="star-rating">
            <span className="star">★</span>
            <span className="rating-score">8.1</span>
            <span className="total-votes">/10 (1.4M)</span>
          </div>
        </div>

        <div className="main-content">
          <div className="left-content">
            <section className="description-section">
              <h2>Description</h2>
              <p>
                A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a
                couple of kids after a power failure causes the park's cloned dinosaurs to run loose.
              </p>
            </section>

            <section className="credits-section">
              <div className="director">
                <h3>Director</h3>
                <p><a href="#" className="person-link">Steven Spielberg</a></p>
              </div>
              <div className="writers">
                <h3>Writers</h3>
                <p>
                  <a href="#" className="person-link">Michael Crichton</a> (novel), 
                  <a href="#" className="person-link">Michael Crichton</a> (screenplay), 
                  <a href="#" className="person-link">David Koepp</a> (screenplay)
                </p>
              </div>
              <div className="stars">
                <h3>Stars</h3>
                <p>
                  <a href="#" className="person-link">Sam Neill</a>, 
                  <a href="#" className="person-link">Laura Dern</a>, 
                  <a href="#" className="person-link">Jeff Goldblum</a> 
                  | <a href="#" className="see-all">See all cast & crew</a>
                </p>
              </div>
            </section>

            <section className="gallery-section">
              <h2>Gallery</h2>
              <div className="gallery-grid">
                <div className="gallery-item">
                  <img src="/api/placeholder/240/160" alt="Scene 1" />
                </div>
                <div className="gallery-item">
                  <img src="/api/placeholder/240/160" alt="Scene 2" />
                </div>
                <div className="gallery-item">
                  <img src="/api/placeholder/240/160" alt="Scene 3" />
                </div>
                <div className="gallery-item">
                  <img src="/api/placeholder/240/160" alt="Scene 4" />
                </div>
                <div className="gallery-item">
                  <img src="/api/placeholder/240/160" alt="Scene 5" />
                </div>
                <div className="gallery-item">
                  <img src="/api/placeholder/240/160" alt="Scene 6" />
                </div>
              </div>
              <div className="gallery-count">
                <span>2,931 Images</span>
                <button className="view-all-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </section>
          </div>

          <div className="right-content">
            <div className="reviews-section">
              <h2>Reviews</h2>
              <div className="review-summary">
                <div className="review-meter">
                  <div className="meter-circle positive">
                    <span className="meter-value">90</span>
                  </div>
                  <div className="meter-label">User Reviews</div>
                  <div className="meter-count">See details and 36 ratings</div>
                </div>
                <div className="metacritic">
                  <div className="meter-circle meta-positive">
                    <span className="meter-value">77</span>
                  </div>
                  <div className="meter-label">Metascore</div>
                  <div className="meter-count">See all details</div>
                </div>
              </div>

              <div className="featured-review">
                <p className="review-text">
                  "I don't know why I could this movie so much. Maybe it was the plot, maybe it was the special effects. Whatever the reason, it was phenomenal and I love it to this day."
                </p>
                <div className="reviewer-info">
                  <span className="reviewer-name">John D</span>
                  <div className="reviewer-rating">
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </div>

              <div className="review-actions">
                <button className="review-action-btn">1,027 Reviews</button>
                <button className="review-action-btn">276 Critics</button>
              </div>
            </div>

            <div className="actions-container">
              <button className="action-button share-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Share
              </button>
              <button className="action-button watchlist-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;