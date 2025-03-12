import './LikedList.css';
import poster2 from "../../assets/salar.jpeg";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function Likedlist() {
    const LikedListState = useSelector((state: RootState) => state.likedlist);

    return (
        <>
            <div className="main-likedlist">
                <div className='likedlist-heading'>
                    <h3 className='likedList-headingh3'>Liked </h3>
                </div>
                <div className='likedlist-content'>
                    {LikedListState.data?.map((likedlist, index) => (
                        <div className='likedlist' key={index}>
                            <div className='likedlist-img'>
                                <img src={likedlist.contentId?.poster} alt="Poster" />
                            </div>
                            <div className='likedlist-info'>
                                <h4>{likedlist.contentId?.title || "Unknown Title"}</h4>
                                <p className='likedlistinfo-p'>{"This is a placeholder description. Add real descriptions later."}</p>
                            </div>
                            <div className='likedlist-button'>
                                <button className='likedListBtn'>Watch</button>
                                <button className='likedListBtn'>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Likedlist;