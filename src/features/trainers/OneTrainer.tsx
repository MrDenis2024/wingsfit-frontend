import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect, useState } from "react";
import { selectOneTrainer } from "./trainersSlice.ts";
import { getTrainerProfile } from "./trainersThunks.ts";
import { apiURL } from "../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { fetchCourses } from "../courses/coursesThunks.ts";
import { selectCourses } from "../courses/coursesSlice.ts";
import { selectUser } from "../users/userSlice.ts";
import { toast } from "react-toastify";
import { selectError } from "../reviewForm/reviewSlice.ts";
import { ITrainer } from "../../types/trainerTypes.ts";
import { createReview } from "../reviewForm/reviewThunk.ts";
import TrainerProfileDetails from "./components/TrainerProfileDetails.tsx";

const OneTrainer = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneTrainer = useAppSelector(selectOneTrainer);
  const user = useAppSelector(selectUser);
  const courses = useAppSelector(selectCourses);
  const reviewError = useAppSelector(selectError);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getTrainerProfile(id));
    dispatch(fetchCourses(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
    }
  }, [reviewError]);

  const avatarImage = oneTrainer?.user.avatar
    ? `${apiURL}/${oneTrainer.user.avatar}`
    : imageNotFound;

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

  const isOwner = user?._id === oneTrainer?.user._id;

  return (
    oneTrainer && (
      <>
        <TrainerProfileDetails
          avatarImage={avatarImage}
          trainerProfile={oneTrainer as ITrainer}
          courses={courses}
          isOwner={isOwner}
          id={id}
          showForm={showForm}
          setShowForm={setShowForm}
          handleReviewSubmit={handleReviewSubmit}
        />
      </>
    )
  );
};

export default OneTrainer;
