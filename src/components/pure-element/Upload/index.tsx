// library
import React, {
    ForwardedRef,
    forwardRef,
    DragEvent,
    FormEvent,
    ChangeEvent,
    SetStateAction,
    Dispatch,
    useCallback
}
    from 'react';
// import { AiOutlineDelete } from 'react-icons/ai'
import { useTus } from 'use-tus'
import LinearProgress from '@mui/material/LinearProgress';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
//custom
import {
    UploadStyled,
    InputStyled,
    LabelStyled,
    DragFilePosition,
    ShowItemName,
    FormStyled,
    ShowErrorFileUnderButton
} from './style';
import { END_POINTS } from 'constants/enum/end-points.enum';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { IAuth } from 'model/redux/auth';
import { SuccessToast } from 'components/toast-view/func-toast';
import { ToastRenderFuncProps } from 'model/etc/toast-final.model';
import { ACCEPT_ENUMS } from 'constants/enum/accept-input.enum';
import { isIncludedType } from 'tools/pure-function/accept-file-generate';



type TypeInput = 'file';

interface UploadProps {
    // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    setFiles: Dispatch<SetStateAction<object>>;
    value: object;
    id: string;
    url: string;
    accept: ACCEPT_ENUMS;

    isTusProtocol?: boolean;
    name?: string;
    width?: string;
    height?: string;
    className?: string;
    classNameInput?: string;
    classNameLabel?: string;
    disabled?: boolean;
    multiple?: boolean;
    style?: object;
    type?: TypeInput;
    title?: JSX.Element;
    maximumSize?: number;

    // For Toast Message 
    toastMessageTitle?: string
    toastMessageDesc?: string;
    toastId?: string | number;

}


const UploadFile = forwardRef((props: UploadProps, ref: ForwardedRef<HTMLInputElement | null>): JSX.Element => {
    const messageSuccess: ToastRenderFuncProps = {
        title: props.toastMessageTitle ? props.toastMessageTitle : 'فایل اپلود شد',
        description: props.toastMessageDesc ? props.toastMessageDesc : 'فایل شما با موفقیت آپلود شد ',
        id: props.toastId ? props.toastId : 'rn-succees-upload',
    }

    const [dragActive, setDragActive] = React.useState<boolean>(false);
    const { upload, setUpload } = useTus({autoAbort: true});
    const auth = useAppSelector((store: RootState): IAuth => store.auth);
    const { token } = auth;


    const mgabit_5 = 1024 * 5000 ;
    const [percent, setPercent] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isIncludedTypeFormat, setIsIncludedTypeFormat] = React.useState<boolean>(false)
    const [isIncludedSize, setIsIncludedSize] = React.useState<boolean>(false)


    const handleDrag = function (e: DragEvent<HTMLDivElement> | FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            props.setFiles(e.dataTransfer.files);
        }
    };





    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (!e.target.files && !e.target?.files![0]) {
        //     return;
        // }
        console.log('e.target.files' , e.target.files)
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].size > props.maximumSize!) {
                setIsIncludedSize(true)
                if (isIncludedType(props.accept, e.target.files)) {
                    setIsIncludedTypeFormat(false)
                    props.setFiles(e.target.files);
                } else if(!isIncludedType(props.accept, e.target.files)) {
                    setIsIncludedTypeFormat(true);
                }
            } else {
                setIsIncludedSize(false)
                if (isIncludedType(props.accept, e.target.files)) {
                    setIsIncludedTypeFormat(false)
                    props.setFiles(e.target.files);
                } else if(!isIncludedType(props.accept, e.target.files)) {
                    setIsIncludedTypeFormat(true);
                }
            }
        }

       

        if (props.isTusProtocol) {
            if (props.multiple) {
                Object.entries(e?.target?.files!).map(([key, value]: any) =>
                    setUpload(value, {
                        endpoint: `${process.env.REACT_APP_BASE_URL}/${END_POINTS.MEDIA_MANAGMENT}${props.url}`,
                        headers: {
                            "X-VERSION": `${process.env.REACT_APP_VERSION}`,
                            "X-REALM": "smartbss",
                            Authorization: "Bearer " + token.access_token,

                        },
                        metadata: {
                            filename: value.name,
                            filetype: value.type,
                        },
                        chunkSize: mgabit_5, // 5mb
                        // chunkSize : 100000000, // 100mb
                        onProgress: function (bytesUploaded: number, bytesTotal: number): void | null {
                            let percentage: any = (bytesUploaded / bytesTotal * 100).toFixed(2)
                            setPercent(percentage)
                        },
                        onSuccess: function () {
                            
                            SuccessToast(messageSuccess)
                            // onDeleteItem(e.target.files?.item(0)!.lastModified!)
                            props.setFiles({})
                        }
                    },
                    )
                )
            } else {
                setUpload(e?.target?.files!.item(0)!, {
                    endpoint: `${process.env.REACT_APP_BASE_URL}/${END_POINTS.MEDIA_MANAGMENT}${props.url}`,
                    headers: {
                        "X-VERSION": `${process.env.REACT_APP_VERSION}`,
                        "X-REALM": "smartbss",
                        Authorization: "Bearer " + token.access_token,

                    },
                    metadata: {
                        filename: e?.target?.files!.item(0)!.name,
                        filetype: e?.target?.files!.item(0)!.type,
                    },
                    chunkSize: mgabit_5, // 5mb ,
                    // chunkSize : 100000000, // 100mb
                    onProgress: function (bytesUploaded: number, bytesTotal: number): void | null {
                        let percentage: any = (bytesUploaded / bytesTotal * 100).toFixed(2)
                        setPercent(percentage)
                    },
                    onSuccess: function () {
                        SuccessToast(messageSuccess)
                        // onDeleteItem(e.target.files?.item(0)!.lastModified!)
                        props.setFiles({})
                        
                    }
                })

            }
        }
    }
    // }, [])

    React.useEffect(() => {
       console.log('value',props.value )
    }, [props.value])
    


    // const onDeleteItem = useCallback((id: string | number) => {
    //     if(props.multiple){
    //         const deepCopy = {...props?.value}
    //         const maper: any = Object.entries(deepCopy).map(([key, value]: any) => value)
    //         const filterDel = maper.filter((item: any) => item.lastModified !== id)
    //         const obj = Object.assign({}, filterDel);
    //         props?.setFiles(obj);
    //     }else {
    //         const deepCopy = {...props?.value}
    //         const maper: any = Object.entries(deepCopy).map(([key, value]: any) => value)
    //         const filterDel = maper.filter((item: any) => item.lastModified !== id)
    //         const obj = Object.assign({}, filterDel);
    //         props?.setFiles(obj);
    //     }
    // },[props.value])

    const handleStartUploadTus = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault()

        if (!upload) {
            return;
        }

        // upload.findPreviousUploads().then(function (previousUploads) {
        //     // Found previous uploads so we select the first one. 
        //     if (previousUploads.length) {
        //         upload.resumeFromPreviousUpload(previousUploads[0])
        //     }
        //     // Start the upload
        // })
        upload.start()

    }, [upload]);

    const handleAbort = useCallback(() => {
        if (!upload) {
            return;
        }

        upload.abort()
    }, [upload]);


    const handleUploadFileWithrestApi = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formdata = new FormData()
            formdata.append('name', 'this is test')
            // const res = await uploadServices.uploadFilRestapi(formdata)
            const res = await axios.post(props.url, formdata)

            console.log(res)

        } catch (e) {
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }
    
    




    return (
        <>
            <FormStyled
                onDragEnter={handleDrag}
                onSubmit={(e: React.SyntheticEvent) => {
                    if (props.isTusProtocol) {
                        handleStartUploadTus(e)
                    } else {
                        handleUploadFileWithrestApi(e)
                    }
                }}>

                <UploadStyled isFileAvailable={Object.entries(props.value).length !== 0 ? true : false} height={props.height} width={props.width} className={`${props.className} rounded-lg`}>
                    <LabelStyled
                        className={`${props.classNameLabel}`}
                        htmlFor={props.id}>
                        {props!.title!}
                    </LabelStyled>
                    <InputStyled
                        ref={ref}
                        type={props.type ? props.type : 'file'}
                        style={props.style}
                        id={props.id}
                        className={`${props.classNameInput}`}
                        disabled={props.disabled}
                        name={props.name}
                        // value={Object.entries(props.value).map(([key , value]) => value) as any}
                        onChange={handleChange}
                        multiple={props.multiple}
                        accept={props.accept}
                    />
                    {dragActive && <DragFilePosition className='rounded-lg' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} />}

                </UploadStyled>

                {isIncludedTypeFormat && <ShowErrorFileUnderButton style={{ width: `${props.width}` }} className='text-center rounded-lg my-1.5 px-6 py-2.5 h-10 text-xs'>
                    فرمت فایل را به درستی وارد فرمایید
                </ShowErrorFileUnderButton>}

                {isIncludedSize && <ShowErrorFileUnderButton style={{ width: `${props.width}` }} className='text-center rounded-lg my-1.5 px-6 py-2.5 h-10 text-xs'>
                    لطفا حداکثر سایز فایل 50 مگابایت باشد
                </ShowErrorFileUnderButton>}


                <div className={`row-center column my-1.5`} style={{ width: `${props.width}`}}>
                    <button disabled={(Object.entries(props.value).length !== 0 && isIncludedTypeFormat === false && isIncludedSize === false) ? false : true} type='submit' className={`w-full  my-1.5 inline-block px-6 py-2.5 h-10 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50`}>
                        {loading ? <ClipLoader cssOverride={{ margin: '-5px 0' }} color="#36d7b7" size={30} /> : 'Submit'}
                    </button>
                    {props.isTusProtocol && <button onClick={handleAbort} className='w-full my-1.5 inline-block px-6 py-2.5 h-10 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                        Pause
                    </button>}
                </div>
                {
                    Object.entries(props?.value).map(([key, value]: any) =>
                        <>
                        
                            <ShowItemName key={value.lastModified} width={props.width} className='bg-default rounded-lg h-10'>
                                <span className='showitem-name'>{value.name}</span>
                                {/* <AiOutlineDelete cursor={'pointer'} onClick={() => onDeleteItem(value.lastModified)} color={'#fff'} className='icon' /> */}
                            </ShowItemName>
                            <LinearProgress variant="determinate" value={percent} sx={{ width: `${props.width}` }} className={'my-2.5'} />
                        </>
                    )
                }

            </FormStyled>
        </>
    )
})
export default UploadFile

UploadFile.defaultProps = {
    multiple: false,
    disabled: false,
    isTusProtocol: true,
    style: {},
    width: '100%',
    height: '600px',
    maximumSize: 1024 * 80000
}



