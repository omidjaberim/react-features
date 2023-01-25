import {ToastOptions} from 'react-toastify'

export interface ToastRenderFuncProps{
    title : string ;
    id : string | number;
    description?: string;
    options?: ToastOptions;
}