import './Watchlist.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { WatchListItem } from '../../interfaces/movie.interface';

function WatchList() {
    const watchListState = useSelector((state: RootState) => state.watchlist);

    return (
        <div className="main-watchlist">
            <div className='watchlist-heading'>
                <h3 className='watchlist-headingh3'>Watchlist</h3>
            </div>

            <div className='watchlist-content'>
                {watchListState.data && watchListState.data.length > 0 ? (
                    watchListState.data.map((item: WatchListItem, index) => (
                        <div className='watchlist' key={index}>
                            <div className='watchlist-img'>
                                <img
                                    src={item.contentId?.poster || "https://via.placeholder.com/150"}
                                    alt={item.contentId?.title || "No Title"}
                                />
                            </div>
                            <div className='watchlist-info'>
                                <h4>{item.contentId?.title || "Unknown Title"}</h4>
                                <p className='watchlistinfo-p'>{"This is a placeholder description. Add real descriptions later."}</p>
                            </div>
                            <div className='watchlist-buttons'>
                                <button className='watchlistBtn'>Watch</button>
                                <button className='watchlistBtn' onClick={()=> dispatchEvent(toggleWatchList())}>Remove</button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies in your watchlist.</p>
                )}
            </div>
        </div>
    );
}

export default WatchList;