import './Watchlist.css';
import poster1 from "../assets/kgf2poster.jpeg";

function WatchList() {
    const WatchLists = [
        {
            title: 'Inception',
            description: 'A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal history erased if he can successfully plant an idea into someone’s mind.'
        },
        {
            title: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival as Earth becomes increasingly uninhabitable.'
        },
        {
            title: 'The Dark Knight',
            description: 'Batman faces off against the Joker, a criminal mastermind who seeks to create chaos and challenge Gotham’s sense of morality.'
        },
        {
            title: 'Pulp Fiction',
            description: 'The lives of two hitmen, a boxer, a gangster, and his wife intertwine in a series of violent and unexpected events.'
        },
        {
            title: 'Forrest Gump',
            description: 'The story of a simple man with good intentions who unknowingly influences major historical events throughout his lifetime.'
        },
        {
            title: 'Inception',
            description: 'A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal history erased if he can successfully plant an idea into someone’s mind.'
        },
        {
            title: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival as Earth becomes increasingly uninhabitable.'
        },
        {
            title: 'The Dark Knight',
            description: 'Batman faces off against the Joker, a criminal mastermind who seeks to create chaos and challenge Gotham’s sense of morality.'
        },
        {
            title: 'Pulp Fiction',
            description: 'The lives of two hitmen, a boxer, a gangster, and his wife intertwine in a series of violent and unexpected events.'
        },
        {
            title: 'Forrest Gump',
            description: 'The story of a simple man with good intentions who unknowingly influences major historical events throughout his lifetime.'
        }
    ];
    return (
        <>
            <div className="main-watchlist">
                <div className='watchlist-heading'>
                    <h3 className='watchlist-headingh3'>Watchlist</h3>
                </div>
                <div className='watchlist-content'>
                    {WatchLists.map((watchlist, index) => (

                        <div className='watchlist' key={index}>
                            <div className='watchlist-img'>
                                <img src={poster1} alt="Poster" />
                            </div>
                            <div className='watchlist-info'>
                                <h4>{watchlist.title}</h4>
                                <p>{watchlist.description.substring(0, 30)}</p>
                            </div>
                            <div className='watchlist-button'>
                                <button>Watch</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>

    )
}

export default WatchList