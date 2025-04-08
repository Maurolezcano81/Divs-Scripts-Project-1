import { ReactNode } from "react";
import { Button, ButtonProps } from "react-native-paper"


interface GreenButtonProps extends Omit<ButtonProps, 'children'> {
    children: ReactNode;
}

const GreenButton = ({
    children,
    ...props
}: GreenButtonProps) => {
    return (
        <Button className="!p-2" {...props}>
            {children}
        </Button>
    );
};

export default GreenButton