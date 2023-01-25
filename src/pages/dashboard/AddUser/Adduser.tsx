import { Divider, Grid } from "@mui/material";
import {
  Modal,
  Select,
  Typography,
  LoadingButton,
  MultiSelect,
  TextFieldIdentity,
} from "components";
import { useTranslation } from "react-i18next";
import { Districts } from "constants/Districts";
import { useCallback, useEffect, useState } from "react";
import { RoleServiceSM } from "services/role/role-sm.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { rolesWasFetched } from "redux/slices/roles";
import { IRole } from "model/redux/roles";
import { RootState } from "redux/store";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserServiceSM } from "services/user/user-sm.service";
import { UserEntityCreateModel } from "model/entity/user/user.model";
import { Regexes } from "constants/regex";

const AddUser = () => {
  const [rolesloading, setRolesLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { t } = useTranslation();
  const roles = new RoleServiceSM();
  const dispatch = useAppDispatch();
  const storeRoles = useAppSelector((store: RootState) => store.role.roles);
  const user = new UserServiceSM();
  const validationSchema = yup.object({
    username: yup
      .string()
      .required(() => t("MoileInvalid"))
      .matches(Regexes.phone, () => t("MoileInvalid")),
    firstName: yup.string().required(() => t("FisrtsNameInvalid")),
    lastName: yup.string().required(() => t("LastNameInvalid")),
    attributes: yup.object().shape({
      code: yup.string().required(() => t("codeNamayandeRequired")),
      region: yup.string().required(() => t("RegionRequired")),
      nationalCode: yup
        .string()
        .required(() => t("nationalCodeRequired"))
        .matches(Regexes.codemeli, () => t("nationalCodeInvalid")),
    }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      enabled: true,
      roles: [] as string[],
      attributes: {
        code: "",
        region: 0,
        phone: "",
        nationalCode: "",
        gender: "",
        parentUsername: "",
        userType: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveUser({
        ...values,
        username: values.username,
        roles: values.roles.map((role: string) => ({
          id: role,
          name: storeRoles.find((stRole: IRole) => stRole.id === role)?.name,
          description: "",
        })),
      });
    },
  });

  const saveUser = async (values: UserEntityCreateModel) => {
    try {
      setSaveLoading(true);
      await user.create(values);
      formik.setValues(formik.initialValues);
    } catch (e) {
    } finally {
      setSaveLoading(false);
    }
  };

  const getRoles = useCallback(async () => {
    try {
      setRolesLoading(true);
      const res = await roles.getList({ page: 0, size: 100 });
      dispatch(
        rolesWasFetched(
          res.data
            .filter((x) => x.name !== "default-roles-smartbss")
            .map(
              /////!NOTICE! map fetched params to redux params Always do this mapping pls :-)
              (role): IRole => ({
                id: role.id,
                description: role?.description ?? role.name,
                name: role.name,
              })
            )
        )
      );
    } catch (e) {
    } finally {
      setRolesLoading(false);
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Grid className="flex justify-center items-center w-full">
      <form onSubmit={formik.handleSubmit} className="w-full xl:w-1/2 ">
        <Grid className="flex flex-col justify-center items-center">
          <Grid className="flex justify-center items-center">
            <Typography variant="body1" classname="font-sans">
              {t("userType")}
            </Typography>
            <MultiSelect
              classname="w-96"
              name={"roles"}
              id={"roles"}
              value={formik.values.roles}
              loading={rolesloading}
              values={storeRoles.map((val: any) => ({
                key: val.id,
                value: val?.description ?? val.name,
              }))}
              onChange={formik.handleChange}
            />
          </Grid>
          <Divider className="w-full my-8" />
          <Grid className="flex flex-col justify-center items-center w-full">
            <Grid className="flex w-full mt-2">
              <Typography variant="body1">{t("identityInfo")}</Typography>
            </Grid>
            <Grid className="flex w-full mt-4 justify-center items-center">
              <Grid className="flex flex-col justify-between mt-4">
                <div className="flex items-center justify-strat mx-2 my-4">
                  <Typography classname="w-24" variant="body2">
                    {t("firstname")}
                  </Typography>
                  <TextFieldIdentity
                    classes="w-40"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    name={"firstName"}
                    id={"firstName"}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </div>
                <div className="flex items-center justify-start  m-2 my-4">
                  <Typography classname="w-24" variant="body2">
                    {t("nationalCode")}
                  </Typography>
                  <TextFieldIdentity
                    classes="w-40"
                    value={formik.values.attributes.nationalCode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched?.attributes?.nationalCode &&
                      Boolean(formik.errors?.attributes?.nationalCode)
                    }
                    helperText={
                      formik.touched?.attributes?.nationalCode &&
                      formik.errors?.attributes?.nationalCode
                    }
                    name="attributes.nationalCode"
                    id="attributes.nationalCode"
                  />
                </div>
                <div className="flex items-center justify-start  my-4">
                  <Typography classname="w-[90px] ml-4" variant="body2">
                    {t("districtChoose")}
                  </Typography>
                  <Select
                    classname="w-36"
                    name="attributes.region"
                    id="attributes.region"
                    values={Districts.map((val) => ({
                      key: val.code,
                      value: val.title,
                    }))}
                    value={formik.values.attributes.region}
                    onChange={formik.handleChange}
                    error={
                      formik.touched?.attributes?.region &&
                      Boolean(formik.errors?.attributes?.region)
                    }
                    helperText={
                      formik.touched?.attributes?.region &&
                      formik.errors?.attributes?.region
                    }
                  />
                </div>
              </Grid>
              <Grid className="flex flex-col justify-between ">
                <div className="flex items-center justify-between my-4 m-2">
                  <Typography classname="w-32" variant="body2">
                    {t("lastname")}
                  </Typography>
                  <TextFieldIdentity
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    name="lastName"
                    id="lastName"
                  />
                </div>
                <div className="flex items-center justify-between m-2 my-4">
                  <Typography classname="w-32" variant="body2">
                    {t("mobile")}
                  </Typography>
                  <TextFieldIdentity
                    name="username"
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    placeholder="9122314567"
                  />
                </div>
                <div className="flex items-center justify-between m-2 my-4">
                  <Typography classname="w-32" variant="body2">
                    {t("namayandeCode")}
                  </Typography>
                  <TextFieldIdentity
                    name="attributes.code"
                    id="attributes.code"
                    value={formik.values?.attributes.code}
                    onChange={formik.handleChange}
                    error={
                      formik.touched?.attributes?.code &&
                      Boolean(formik.errors?.attributes?.code)
                    }
                    helperText={
                      formik.touched?.attributes?.code &&
                      formik.errors?.attributes?.code
                    }
                  />
                </div>
              </Grid>
            </Grid>
            <Divider className="w-full my-8" />
            <Grid className="flex w-full justify-center my-4">
              <LoadingButton
                variant="contained"
                className="w-52 mx-2 bg-primary rounded-xl"
                type="submit"
                loading={saveLoading}
              >
                <Typography>{t("registerUser")}</Typography>
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default AddUser;
