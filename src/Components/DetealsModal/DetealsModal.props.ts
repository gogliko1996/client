import { ReactElement } from "react";

export interface DetealsModalProps{
    isOpen: boolean;
    onClose: (e: boolean) => void;
    children?: ReactElement;
}