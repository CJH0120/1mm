import { ReactNode } from 'react';

const Modal = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center px-3">
      <div className="w-full max-w-[500px] bg-white p-10 rounded">
        {children}
      </div>
    </div>
  );
};
export default Modal;
