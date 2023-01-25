import { createCheckPermissionsHook } from './create-check-permision-hook';
import { createWithPermissionsWrapper } from './create-with-permision-wrapper';
import { GetPermissions, UseCheckPermissions, WithPermissions } from 'model/etc/permisions/index';

export function createPermissionCheckers(fun: GetPermissions): PermissionCheckers {
  const useCheckPermissions = createCheckPermissionsHook(fun);
  const withPermissions = createWithPermissionsWrapper(useCheckPermissions);
  return {
    useCheckPermissions,
    WithPermissions: withPermissions,
  };
}

interface PermissionCheckers {
  useCheckPermissions: UseCheckPermissions;
  WithPermissions: WithPermissions;
}