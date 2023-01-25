import {NotFoundImg} from 'components'

const NotFound = () => {
  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <div className="h-2/5 w-1/6" >
        <NotFoundImg />
      </div>
    </div>
  );
};

export default NotFound;
