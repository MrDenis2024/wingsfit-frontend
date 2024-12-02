import { useState } from "react";
import { createCertificate } from "./trainersThunks.ts";
import AddTrainerCertificates from "./components/addTrainerCertificates.tsx";
import { useAppDispatch } from "../../app/hooks.ts";

const NewAddTrainerCertificates = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (
    certificates: { title: string; image: File }[],
  ) => {
    setIsLoading(true);
    try {
      for (const certificate of certificates) {
        await dispatch(createCertificate([certificate]));
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
