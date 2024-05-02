// src/declarations.d.ts

declare module '@fortawesome/react-fontawesome' {
    import * as React from 'react';
    import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
    export interface FontAwesomeIconProps {
      icon: IconDefinition;
      size?: SizeProp;
      color?: string;
    }
    export class FontAwesomeIcon extends React.Component<FontAwesomeIconProps, any> {}
  }
  
  declare module '@fortawesome/free-solid-svg-icons' {
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    export const faMapMarkerAlt: IconDefinition;
    export const faPhone: IconDefinition;
    export const faEnvelope: IconDefinition;
    export const faMap: IconDefinition;
  }
  