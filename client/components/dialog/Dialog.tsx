import { ReactNode } from "react";
import { Button, Dialog as PaperDialog, Portal, useTheme } from "react-native-paper";

interface DialogProps {
  children: ReactNode;
  isVisible: boolean;
  onDismiss: () => void;
  onSubmit: (data: any) => void;
  title: string;
}

const CustomDialog = ({
  onDismiss,
  onSubmit,
  children,
  isVisible,
  title
}: DialogProps) => {
  const { colors } = useTheme();

  return (
    <Portal>
      <PaperDialog visible={isVisible} onDismiss={onDismiss}
        style={{ backgroundColor: colors.background }}
      >
        <PaperDialog.Title>{title}</PaperDialog.Title>
        <PaperDialog.Content>
          {children}
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={onSubmit}>Enviar</Button>
        </PaperDialog.Actions>
      </PaperDialog>
    </Portal>
  );
};

export default CustomDialog;