import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import cs from "classnames";

import { Select } from "components";
import { Provinces } from "constants/Provinces";
import { Districts } from "constants/Districts";
import { IAddr } from "../AddressInformation/AddressInformation";

interface provinceObjType {
  key: number | null;
  value: string;
}

interface Iprops {
  name: string;
  error: boolean | undefined;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any> ? void : (e: string) => void;
  };
  value: number | null;
  helperText: string | false | undefined;
  firstSelectLabel: string;
  secondSelectLabel: string;
  labelWidth: string;
  selectWidth: string;
  setAddrObj?: Dispatch<SetStateAction<IAddr>>;
}

const DistrictDropdown = (props: Iprops) => {
  const {
    name,
    onChange,
    value,
    error,
    helperText,
    firstSelectLabel,
    secondSelectLabel,
    labelWidth,
    selectWidth,
    setAddrObj,
  } = props;

  const { t, i18n } = useTranslation();

  const [provinceValue, setProvinceValue] = useState<number>(0);
  const [provinceState, setProvinceState] = useState<provinceObjType[]>([
    { key: 0, value: "" },
  ]);
  const [countyState, setCountyState] = useState<provinceObjType[]>([
    { key: null, value: "" },
  ]);

  useEffect(() => {
    const provinceObj: provinceObjType[] = [];
    Provinces.map(({ name, parent }) =>
      provinceObj.push({
        key: parent,
        value: t(name),
      })
    );

    setProvinceState(provinceObj);
  }, []);

  useEffect(() => {
    const districtsObj: provinceObjType[] = [];
    Districts.filter(({ parent }) => parent === provinceValue).map(
      ({ code, title, name }) =>
        districtsObj.push({
          key: code,
          value: i18n.language === "fa-IR" ? title : name,
        })
    );

    setCountyState(districtsObj);
  }, [provinceValue]);

  useEffect(() => {
    const addrInfo: IAddr = {
      province: "",
      city: "",
    };

    const specificProvince = Provinces.filter(
      ({ parent }) => parent === provinceValue
    );

    addrInfo.province =
      i18n.language === "fa-IR"
        ? specificProvince[0]?.title
        : specificProvince[0]?.name;

    if (countyState.length) {
      const specificCountyObj = countyState.filter(({ key }) => key === value);
      addrInfo.city = specificCountyObj[0]?.value;
    }

    if (setAddrObj) setAddrObj(addrInfo);
  }, [provinceValue, countyState, value]);

  return (
    <div className="w-full flex flex-wrap justify-between">
      <div className="flex items-center justify-center">
        <label className={cs("font-bold", labelWidth)}>
          {firstSelectLabel}
        </label>
        <Select
          classname={cs(`!m-0`, selectWidth)}
          values={provinceState}
          id="province"
          name="province"
          value={provinceValue}
          onChange={({ target }) => setProvinceValue(target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <label className={cs("font-bold", labelWidth)}>
          {secondSelectLabel}
        </label>
        <div className="flex flex-col">
          <Select
            id={name}
            name={name}
            values={countyState}
            value={value}
            onChange={onChange}
            error={error}
            classname={cs(
              `!m-0 ${!provinceValue && "pointer-events-none opacity-50"}`,
              selectWidth
            )}
          />
          <p className="text-xs text-Error pr-4">{helperText}</p>
        </div>
      </div>
    </div>
  );
};

export default DistrictDropdown;
