import { checkPermissions } from "./check-permisions";
import { GetPermissions, UseCheckPermissions } from "model/etc/permisions/index";

export function createCheckPermissionsHook(
    getCurrentPermissions: GetPermissions
): UseCheckPermissions {
    return () => ({
        checkPermissions: (
            permissions?: string[] | string | null,
            checkAll = true
        ): boolean => checkPermissions(getCurrentPermissions(), permissions, checkAll),
    });
}