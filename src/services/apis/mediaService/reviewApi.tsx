import { api } from "../../api"
import { RatingProps } from "../../../interfaces/MediaInterface/review.interface";

export const addReviewApi = async(reviewData: RatingProps) =>{
try{
    const response = await api.post("/review/addOrUpdateReview", reviewData);
    return response;
}catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred while fetching episode Data");
    }
  }
}