import { ReactNode, useEffect } from "react";
import { Button, ButtonProps } from "react-native-paper"


interface GreenButtonProps extends Omit<ButtonProps, 'children'> {
    children: ReactNode;
}


const GreenButton = ({
    children,
    ...props
}: GreenButtonProps) => {
    return (
        <Button className="!p-2" mode="contained" {...props}>
            {children}
        </Button>
    );
};

export default GreenButton