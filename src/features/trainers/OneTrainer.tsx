import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect, useState } from "react";
import {
  selectOneTrainer,
  selectTrainerProfile,
  selectTrainerProfileLoading,
} from "./trainersSlice.ts";
import { getTrainerProfile } from "./trainersThunks.ts";
import { fetchCourses } from "../courses/coursesThunks.ts";
import { selectCourses } from "../courses/coursesSlice.ts";
import { selectUser } from "../users/userSlice.ts";
import { toast } from "react-toastify";
import { selectError } from "../reviewForm/reviewSlice.ts";
import { createReview } from "../reviewForm/reviewThunk.ts";
import TrainerProfileDetails from "./components/TrainerProfileDetails.tsx";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";

const OneTrainer = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const trainerProfile = useAppSelector(selectTrainerProfile);
  const oneTrainer = useAppSelector(selectOneTrainer);
  const user = useAppSelector(selectUser);
  const courses = useAppSelector(selectCourses);
  const reviewError = useAppSelector(selectError);
  const [showForm, setShowForm] = useState(false);
  const loading = useAppSelector(selectTrainerProfileLoading);

  useEffect(() => {
    dispatch(getTrainerProfile(id));
    dispatch(fetchCourses(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
    }
  }, [reviewError]);

  const handleReviewSubmit = async (
    reviewText: string,
    ratingValue: number | null,
  ) => {
    try {
      if (reviewText && ratingValue !== null) {
        await dispatch(
          createReview({
            comment: reviewText,
            rating: ratingValue,
            trainerId: id,
          }),
        ).unwrap();
        toast.success("Отзыв успешно отправлен!");
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isMyProfile = user?._id === id;

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <TrainerProfileDetails
          trainerProfile={isMyProfile ? trainerProfile : oneTrainer}
          courses={courses}
          isOwner={isMyProfile}
          id={id}
          showForm={showForm}
          setShowForm={setShowForm}
          handleReviewSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};

export default OneTrainer;
