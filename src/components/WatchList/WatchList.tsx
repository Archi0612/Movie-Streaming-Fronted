// import './Watchlist.css';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { WatchListItem } from '../../interfaces/movie.interface';
// import { toggleWatchList } from "../../redux/slices/WatchList/WatchList";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";

// function WatchList() {
//     const watchListState = useSelector((state: RootState) => state.watchlist);
//     const dispatch = useDispatch<AppDispatch>();
//     return (
//         <div className="main-watchlist">
//             <div className='watchlist-heading'>
//                 <h3 className='watchlist-headingh3'>Watchlist</h3>
//             </div>


//             <div className='watchlist-content'>
//                 {watchListState.data && watchListState.data.length > 0 ? (
//                     watchListState.data.map((item: WatchListItem, index) => (
//                         <div className='watchlist' key={index}>
//                             <div className='watchlist-img'>
//                                 <img
//                                     src={item.contentId?.poster || "https://via.placeholder.com/150"}
//                                     alt={item.contentId?.title || "No Title"}
//                                 />
//                             </div>
//                             <div className='watchlist-info'>
//                                 <h4>{item.contentId?.title || "Unknown Title"}</h4>
//                                 <p className='watchlistinfo-p'>{"This is a placeholder description. Add real descriptions later."}</p>
//                             </div>
//                             <div className='watchlist-buttons'>
//                                 <button className='watchlistBtn'>Watch</button>
//                                 <button className='watchlistBtn' onClick={() => dispatch(toggleWatchList({ contentId: item.contentId?._id || '', contentType: item.contentType || '' }))}>Remove</button>

//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No movies in your watchlist.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default WatchList;

import './Watchlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { WatchListItem } from '../../interfaces/movie.interface';
import { toggleWatchList } from "../../redux/slices/WatchList/WatchList";
import { AppDispatch } from "../../redux/store";

function WatchList() {
    const watchListState = useSelector((state: RootState) => state.watchlist);
    const dispatch = useDispatch<AppDispatch>();
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
                                <button className='watchlistBtn' onClick={() => dispatch(toggleWatchList({ contentId: item.contentId?._id || '', contentType: item.contentType || '' }))}>Remove</button>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className='empty-watchlist-container'>
                    <p className="empty-watchlist">Add movies to your watchlist to see them here.</p>
                </div>
                )}
            </div>
        </div>
    );
}

export default WatchList;