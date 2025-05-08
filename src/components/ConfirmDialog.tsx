import Button from "./Button";

interface ConfirmDialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({
  title,
  onConfirm,
  onCancel,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
}: ConfirmDialogProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center justify-end gap-4">
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
