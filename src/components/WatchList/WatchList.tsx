import './Watchlist.css';
import React, { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { WatchListItem } from '../../interfaces/movie.interface';
import { toggleWatchList } from "../../redux/slices/WatchList/WatchList";
import { AppDispatch } from "../../redux/store";
import { CiCircleRemove } from "react-icons/ci";
import { Play } from "lucide-react";
import { toast } from 'react-toastify';

const WatchList = () => {
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
                                    alt={item.contentId?.title || "No Img"}
                                />
                            </div>
                            <div className='watchlist-info'>
                                <h4>{item.contentId?.title || "Unknown Title"}</h4>
                                <p className='watchlistinfo-p'>{"This is a placeholder description. Add real descriptions later."}</p>
                            </div>
                            <div className='watchlist-buttons'>
                                <button className='watchlistBtn'><Play size={20}/></button>
                            <button className='watchlistBtn' onClick={() => {
                                dispatch(toggleWatchList({ contentId: item.contentId?._id || '', contentType: item.contentType || '' }));
                                toast.success("Removed from Watchlist successfully!");
                            }}><CiCircleRemove size={20}/></button>

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