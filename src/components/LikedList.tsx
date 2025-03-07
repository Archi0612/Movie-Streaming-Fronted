import './LikedList.css';
import poster2 from "../assets/salar.jpeg";

function Likedlist() {
    const Likedlists = [
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
            <div className="main-likedlist">
                <div className='likedlist-heading'>
                    <h3 className='likedList-headingh3'>Liked </h3>
                </div>
                <div className='likedlist-content'>
                    {Likedlists.map((likedlist, index) => (

                        <div className='likedlist' key={index}>
                            <div className='likedlist-img'>
                                <img src={poster2} alt="Poster" />
                            </div>
                            <div className='likedlist-info'>
                                <h4>{likedlist.title}</h4>
                                <p>{likedlist.description.substring(0, 30)}</p>
                            </div>
                            <div className='likedlist-button'>
                                <button>Watch</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>

    )
}

export default Likedlist