// In a type declaration file, e.g., react-image-crop.d.ts
declare module 'react-image-crop' {
    import { ComponentType } from 'react';
    
    export interface Crop {
      x: number;
      y: number;
      width: number;
      height: number;
      aspect?: number;
    }
  
    interface ReactCropProps {
      src: string;
      crop: Crop;
      onChange: (newCrop: Crop) => void;
      onComplete?: (crop: Crop) => void;
    }
  
    const ReactCrop: ComponentType<ReactCropProps>;
    export default ReactCrop;
  }
  