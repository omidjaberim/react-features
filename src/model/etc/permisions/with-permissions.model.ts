import { ReactElement } from 'react';

export interface WithPermissionsProps {
  checkAll?: boolean;
  children: ReactElement<string, string>;
  permissions?: string | string[];
  placeholder?: any;
}

export type WithPermissions = (props: WithPermissionsProps) => JSX.Element;