import "./LikedList.css";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../redux/slices/LikedList/LikedList";
import { toast } from "react-toastify";

function Likedlist() {
  const LikedListState = useSelector((state: RootState) => state.likedlist);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handlePlayVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event from reaching the parent div
    navigate(`/videoPlayer`);
  };

  const handleLike = async (contentId: string, contentType: string) => {
    const response = await dispatch(toggleLike({ contentId, contentType }));
    // console.log(response.payload.message, "Response from detail page");

    if (response.payload.message === "Unliked successfully") {
      toast.info("Removed from Liked List");
    } else {
      toast.success("Added to Liked List");
    }
  };
  
  return (
    <>
      <div className="main-likedlist">
        <div className="likedlist-heading">
          <h3 className="likedList-headingh3">Liked </h3>
        </div>
        <div className="likedlist-content">
          {LikedListState.data?.map((likedlist, index) => (
            <div className="likedlist" key={index}>
              <div className="likedlist-img">
                <img src={likedlist.contentId?.poster} alt="Poster" />
              </div>
              <div className="likedlist-info">
                <h4>{likedlist.contentId?.title || "Unknown Title"}</h4>
                <p className="likedlistinfo-p">
                  {
                    "This is a placeholder description. Add real descriptions later."
                  }
                </p>
              </div>
              <div className="likedlist-button">
                <button className="likedListBtn" onClick={handlePlayVideo}>
                  Watch
                </button>
                <button
                  className="likedListBtn"
                  onClick={() =>
                    handleLike(likedlist.contentId?._id, likedlist.contentType)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Likedlist;
