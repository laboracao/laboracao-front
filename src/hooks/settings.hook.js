import React, {useState, useEffect} from "react";
import { API, getUserDataInStorage } from "../services/api";

const SettingsHook = () => {
    const {_id} = getUserDataInStorage();
    const [userData, setUserData] = useState('');
    const [value, setValue] = useState('dom');
    const [hora1, setHora1] = useState('');
    const [hora2, setHora2] = useState('');
    const [hora3, setHora3] = useState('');
    const [hora4, setHora4] = useState('');
    const [minuto1, setMinuto1] = useState('');
    const [minuto2, setMinuto2] = useState('');
    const [minuto3, setMinuto3] = useState('');
    const [minuto4, setMinuto4] = useState('');
    const [settingList, setSettingList] = useState([]);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
          day: value,
          gl_start: {
            hour: hora1,
            minute: minuto1
          },
          gl_middle: {
            hour: hora2,
            minute: minuto2
          },
          gl_end: {
            hour: hora3,
            minute: minuto3
          },
          water_config: {
            hour: hora4,
            minute: minuto4
          }
      }
  
      await API.post('/hours', {hour: hora4, minute: minuto4}).then((response) => {
          const {listHours} = response.data;
          data.water_schedule = listHours;
          const filteredSettings = settingList.filter((item) => {return item.day !== value});
          setSettingList([...filteredSettings, ...[data]])
      }).catch((e) => {
          console.log(e);
      })
    }
  
    const handleEditUser = async (settingList) => {
        const data = {gl_List: settingList};
        await API.put(`/users/edit/${_id}`, data).then((response) => {
            setUserData(response.data);
        }).catch((e) => {
            console.log(e)
        })
    };

    const loadStateValues = (findedSettings) => {
        setHora1(findedSettings?.gl_start?.hour || '');
        setHora2(findedSettings?.gl_middle?.hour || '');
        setHora3(findedSettings?.gl_end?.hour || '');
        setHora4(findedSettings?.water_config?.hour || '');
        setMinuto1(findedSettings?.gl_start?.minute || '');
        setMinuto2(findedSettings?.gl_middle?.minute || '');
        setMinuto3(findedSettings?.gl_end?.minute || '');
        setMinuto4(findedSettings?.water_config?.minute || '');
    }
  
    useEffect(() => {
        if(settingList.length > 0 && userData.gl_List.length !== settingList.length){
            handleEditUser(settingList);
        }
    }, [settingList, userData]);

    useEffect(() => {
        API.get(`/users/${_id}`).then((response) => {
            setUserData(response.data);
            setSettingList(response?.data?.gl_List);
        }).catch((e) => {
            console.log(e)
        })
    }, [_id]);

    useEffect(() => {
        const findedSettings = settingList?.gl_List?.find((item) => {
            return item.day === value;
        });
        loadStateValues(findedSettings);
    }, [value, settingList])

    useEffect(() => {

        const findedSettings = userData?.gl_List?.find((item) => {
            return item.day === value;
        });

        loadStateValues(findedSettings);
    }, [value, userData])

    return {
        value,
        hora1,
        setHora1,
        hora2,
        setHora2,
        hora3,
        setHora3,
        hora4,
        setHora4,
        minuto1,
        setMinuto1,
        minuto2,
        setMinuto2,
        minuto3,
        setMinuto3,
        minuto4,
        setMinuto4,
        handleSubmit,
        handleChange
    }
}

export default SettingsHook