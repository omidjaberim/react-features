//library
import {useState , useEffect} from 'react';
//custom
import UploadFile from 'components/pure-element/Upload';
import { ErrorToast } from 'components/toast-view/func-toast';
import ToastComponent from 'components/toast-view/ToastComponent';
import { Toaster } from 'components/toast-view/Toaster';
import {ToastRenderFuncProps} from 'model/etc/toast-final.model'
import { END_POINTS } from 'constants/enum/end-points.enum';
import { ACCEPT_ENUMS } from 'constants/enum/accept-input.enum';
import { AcceptGenerateToString } from 'tools/pure-function/accept-file-generate';

export interface FileObject {
  lastModified : number ;
  lastModifiedDate : Date;
  name : string;
  size : number;
  type : string ; 
  webkitRelativePath : string;

}

export default function TestPage() {
  const [files ,setFiles] = useState<object>({})

  const p :ToastRenderFuncProps =  {
    title : 'sdsd',
    id : 'fsdfs',
    description : 'asdasd'
  }

  const clickToas = async () => {
    console.log('toast =----------------------------------------');

    Toaster.error(
      <ToastComponent
        title={'title'}
        description={'desc'}
      />,
      { toastId: '123' });

    Toaster.success(
      <ToastComponent
        title={'title'}
        description={'desc'}
      />,
      { toastId: '3333' });

    Toaster.info(
      <ToastComponent
        title={'title'}
        description={'desc'}
      />,
      { toastId: '5555' });

      Toaster.warning(
        <ToastComponent
          title={'title'}
          description={'desc'}
        />,
        { toastId: '4444' });

    ErrorToast(p)
  }


  const sunbmit =() =>{
    // console.log(upload.start())
    // upload.start()

  }

  
  useEffect(() => {
    console.log('item' , Object.entries(files).map(([key , value]) => value) , files)
  }, [files ])

   
  return (
    <div>
      <UploadFile 
        url={END_POINTS.TUS_UPLOAD}
        setFiles={setFiles}
        value={files}
        title={<div className='flex flex-col gap-2'>
            <div className='text-sm'>
                لطفا فایل خود را وارد کنید 
            </div>
            <div className='text-xs' >
              لطفا ابتدا کلیک کرده سپس فایل خود را انتخاب کنید
            </div>
            <div className='text-xs' >
             شما همچنین میتوانید فایل خود را درگ کرده و داخل کادر قرار دهید
            </div>
            <div className='text-xs'>
              حجم فایل حداکثر 50 مگابایت
            </div>
            <div className='text-xs' style={{color:'red'}}>
                فقط فایل هایی با پسوند 
               {AcceptGenerateToString(ACCEPT_ENUMS.IMAGE)}
            </div>
           </div>
          }
        id='red'
        width={'350px'}
        height={'200px'}
        isTusProtocol={true}
        accept={ACCEPT_ENUMS.IMAGE}
          
      />
      <button onClick={sunbmit} style={{display:'block'}}>
        submit
      </button>
        
      
      <button onClick={() => clickToas()}>
        click to render func toast
      </button>

      
      
    </div>
  )
}
