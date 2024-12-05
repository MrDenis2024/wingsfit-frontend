import { useState } from "react";
import {createCertificate, getTrainerProfile} from "./trainersThunks.ts";
import AddTrainerCertificates from "./components/addTrainerCertificates.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneTrainer} from "./trainersSlice.ts";

const NewAddTrainerCertificates = () => {
  const dispatch = useAppDispatch()
  const oneTrainer = useAppSelector(selectOneTrainer);
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (
    certificates: { title: string; image: File }[],
  ) => {
    setIsLoading(true);
    try {
      for (const certificate of certificates) {
        await dispatch(createCertificate([certificate]));
        dispatch(getTrainerProfile(oneTrainer!.user._id));
      }
    } catch (error) {
      console.error("Ошибка при создании сертификатов", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AddTrainerCertificates onSubmit={onFormSubmit} isLoading={isLoading} />
    </>
  );
};

export default NewAddTrainerCertificates;
