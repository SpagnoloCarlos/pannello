import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { studySchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { createStudy, fetchUserStudyById, updateStudy } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";

interface IFormInput {
  title: string;
  institution: string;
  year: string;
  description: string;
}

interface StudyFormProps {
  onSuccess?: () => void;
  idStudy?: number;
}

const StudyForm = ({ onSuccess, idStudy }: StudyFormProps) => {
  const [defaultValues, setDefaultValues] = useState({
    title: "",
    institution: "",
    year: "",
    description: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(studySchema),
  });
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setError("");
    if (!token) {
      return;
    }

    const response = idStudy
      ? await updateStudy(token, idStudy, data)
      : await createStudy(token, data);
    if (response.status === 0) {
      closeModal();
      onSuccess?.();
      showToast({
        title: idStudy ? "Estudio modificado con éxito" : "Estudio creado con éxito",
        position: "bottomRight",
      });
    } else {
      showToast({
        title: response.msg,
        position: "bottomRight",
      });
      setError(response.msg);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token && idStudy) {
      startTransition(async () => {
        const response = await fetchUserStudyById(token, idStudy);
        if (response.status === 0 && response.study) {
          setDefaultValues(response.study);
          reset(response.study);
        } else {
          showToast({
            title: response.msg,
            position: "bottomRight",
          });
        }
      });
    }
  }, [idStudy, token, reset]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-lg gap-4"
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="title"
            label="Título"
            placeholder="Ing. en sistemas de información"
            required
            error={errors?.title?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="institution"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="institution"
            label="Institución"
            placeholder="Universidad Tecnológica Nacional"
            required
            error={errors?.institution?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="year"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            id="year"
            label="Año"
            placeholder="2024"
            required
            error={errors?.year?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="description"
            label="Descripción"
            placeholder="Especializado en frontend"
            required
            error={errors?.description?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2 disabled:bg-gray-500" disabled={loading || isPending}>
        {idStudy ? "Editar Estudio" : "Agregar Estudio"}
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default StudyForm;
