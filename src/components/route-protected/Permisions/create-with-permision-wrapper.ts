import { UseCheckPermissions, WithPermissions, WithPermissionsProps } from 'model/etc/permisions/index';

export function createWithPermissionsWrapper(useCheckPermissions: UseCheckPermissions): WithPermissions {
  return ({ checkAll = true, children, permissions, placeholder = null }: WithPermissionsProps) => {
    const { checkPermissions } = useCheckPermissions();
    return checkPermissions(permissions, checkAll) ? children : placeholder;;
  }
}