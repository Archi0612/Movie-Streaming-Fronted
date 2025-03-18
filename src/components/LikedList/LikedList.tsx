// import "./LikedList.css";
// import { AppDispatch, RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleLike } from "../../redux/slices/LikedList/LikedList";
// import { toast } from "react-toastify";

// function Likedlist() {
//   const LikedListState = useSelector((state: RootState) => state.likedlist);
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

//   const handlePlayVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation(); // Stop event from reaching the parent div
//     navigate(`/videoPlayer`);
//   };

//   const handleLike = async (contentId: string, contentType: string) => {
//     const response = await dispatch(toggleLike({ contentId, contentType }));
//     // console.log(response.payload.message, "Response from detail page");

//     if (response.payload.message === "Unliked successfully") {
//       toast.info("Removed from Liked List");
//     } else {
//       toast.success("Added to Liked List");
//     }
//   };

//   return (
//     <>
//       <div className="main-likedlist">
//         <div className="likedlist-heading">
//           <h3 className="likedList-headingh3">Liked </h3>
//         </div>
//         <div className="likedlist-content">
//           {LikedListState.data?.map((likedlist, index) => (
//             <div className="likedlist" key={index}>
//               <div className="likedlist-img">
//                 <img src={likedlist.contentId?.poster} alt="Poster" />
//               </div>
//               <div className="likedlist-info">
//                 <h4>{likedlist.contentId?.title || "Unknown Title"}</h4>
//                 <p className="likedlistinfo-p">
//                   {
//                     "This is a placeholder description. Add real descriptions later."
//                   }
//                 </p>
//               </div>
//               <div className="likedlist-button">
//                 <button className="likedListBtn" onClick={handlePlayVideo}>
//                   Watch
//                 </button>
//                 <button
//                   className="likedListBtn"
//                   onClick={() =>
//                     handleLike(likedlist.contentId?._id, likedlist.contentType)
//                   }
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Likedlist;
import "./LikedList.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { toggleLike } from "../../redux/slices/LikedList/LikedList";

interface Content {
  _id: string;
  title: string;
  poster: string;
  description: string;
}

interface LikedItem {
  contentId?: Content;
  contentType: string;
}

function Likedlist() {
  const likedListState = useSelector((state: RootState) => state.likedlist);
  const dispatch = useDispatch<AppDispatch>();

  const handleWatch = (id: string) => {
    console.log(`Watching movie with ID: ${id}`);
  };

  //   const handleRemove = (id: string) => {
  //     console.log(`Removing movie with ID: ${id}`);
  //   };
  const handleLike = async (contentId: string, contentType: string) => {
    const response = await dispatch(toggleLike({ contentId, contentType }));
    if (response.payload.message === "Unliked successfully") {
      toast.info("Removed from Liked List");
    } else {
      toast.success("Added to Liked List");
    }
  };
  return (
    <div className="main-likedlist">
      <div className="likedlist-heading">
        <h3 className="likedList-headingh3">Liked Movies</h3>
      </div>

      {/* Validation: Show message when likedListState.data is empty */}
      {likedListState.data?.length ? (
        <div className="likedlist-content">
          {likedListState.data.map((likedlist) => (
            <div className="likedlist" key={likedlist.contentId?._id}>
              <div className="likedlist-img">
                <img src={likedlist.contentId?.poster} alt="Movie Poster" />
              </div>
              <div className="likedlist-info">
                <h4>{likedlist.contentId?.title || "Unknown Title"}</h4>
                <p className="likedlistinfo-p">
                  {likedlist.contentId?.description?.length > 60
                    ? likedlist.contentId.description.slice(0, 60) + "..."
                    : likedlist.contentId?.description}
                </p>
              </div>
              <div className="likedlist-button">
                <button
                  className="likedListBtn"
                  onClick={() => handleWatch(likedlist.contentId?._id)}
                >
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
      ) : (
        <div className="empty-likedlist-container">
          <p className="empty-likedlist">
            Add movies to your likedlist to see them here.
          </p>
        </div>
      )}
    </div>
  );
}

export default Likedlist;
