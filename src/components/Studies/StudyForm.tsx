import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { studySchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createStudy } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

interface IFormInput {
  title: string;
  institution: string;
  year: string;
  description: string;
}

interface StudyFormProps {
  onSuccess?: () => void;
}

const StudyForm = ({ onSuccess }: StudyFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      institution: "",
      year: "",
      description: "",
    },
    resolver: zodResolver(studySchema),
  });
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setError("");
    if (!token) {
      return;
    }
    const response = await createStudy(token, data);

    if (response.status === 0) {
      onSuccess?.();
      closeModal();
    } else {
      setError(response.msg);
    }

    setLoading(false);
  };

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
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2 disabled:bg-gray-500" disabled={loading}>
        Agregar Estudio
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default StudyForm;
