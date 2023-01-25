import { useTranslation } from 'react-i18next';
import styled from 'styled-components'


interface ToastComponentProps {
    title: string;
    description?: string;
}

const ToastComponent = (props: ToastComponentProps) => {
    const { i18n } = useTranslation();

    return (
        <ToastView direction={i18n.language}>
            <div className="toast-wrapper">
                <span className="title">
                    {props.title ? props.title : 'this is sample toast '}
                </span>
                <span className="desc">
                    {props.description ? props.description : null}
                </span>
            </div>
        </ToastView>
    );
};

export default ToastComponent;


const ToastView = styled.div<{direction : string}>(({direction}) => `
  
.toast-wrapper {
  display: flex;
  flex-direction: column;
  direction: ${direction === 'fa-IR' ? 'rtl' : 'ltr' };
  font-family: "IRANSans";
  text-align: ${direction === 'fa-IR' ? 'right' : 'left' };
  .title {
    font-size: 15px;
    font-weight: bold;
    font-family: "IRANSans";
    font-size: 12px;
    text-align: ${direction === 'fa-IR' ? 'right' : 'left' };
  }
  .desc {
    font-size: 12px;
    font-family: "IRANSans";
    font-size: 10px;
    text-align: ${direction === 'fa-IR' ? 'right' : 'left' };
  }
}

`)