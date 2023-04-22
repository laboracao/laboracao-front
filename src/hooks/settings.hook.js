import React, {useState, useEffect} from "react";
import { API, getUserDataInStorage, setUserDataInStorage } from "../services/api";

const SettingsHook = () => {
    const {_id} = getUserDataInStorage();
    const [userData, setUserData] = useState('');
    const [value, setValue] = useState('dom');

    const [formValues, setFormValues] = useState({
        hora1: 0,
        hora2: 0,
        hora3: 0,
        hora4: 0,
        minuto1: 0,
        minuto2: 0,
        minuto3: 0,
        minuto4: 0
    });

    const [hora1, setHora1] = useState(0);
    const [hora2, setHora2] = useState(0);
    const [hora3, setHora3] = useState(0);
    const [hora4, setHora4] = useState(0);
    const [minuto1, setMinuto1] = useState(0);
    const [minuto2, setMinuto2] = useState(0);
    const [minuto3, setMinuto3] = useState(0);
    const [minuto4, setMinuto4] = useState(0);
    const [waterSchedule, setWaterSchedule] = useState([]);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleChangeV2 = (value) => {
        setValue(value);
    };

    const handleFormChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

    //   const data = {
    //     day: value,
    //     gl_start: {
    //     hour: hora1 ||  0,
    //     minute: minuto1 ||  0
    //     },
    //     gl_middle: {
    //     hour: hora2 ||  0,
    //     minute: minuto2 ||  0
    //     },
    //     gl_end: {
    //     hour: hora3 ||  0,
    //     minute: minuto3 ||  0
    //     },
    //     water_config: {
    //     hour: hora4 ||  0,
    //     minute: minuto4 ||  0
    //     }
    //   }
  
      await API.post('/hours', {hour: formValues.hora4, minute: formValues.minuto4}).then((response) => {
            const {listHours} = response.data;
            setWaterSchedule(listHours);
      }).catch((e) => {
          console.log(e);
      })
    };

    const handleEditSettings = async (value, formValues, waterSchedule) => {
        const data = {
            day_config: {
                day: value,
                gl_start: {
                    hour: formValues.hora1 ||  0,
                    minute: formValues.minuto1 ||  0
                },
                gl_middle: {
                    hour: formValues.hora2 ||  0,
                    minute: formValues.minuto2 ||  0
                },
                gl_end: {
                    hour: formValues.hora3 ||  0,
                    minute: formValues.minuto3 ||  0
                },
                water_config: {
                    hour: formValues.hora4 ||  0,
                    minute: formValues.minuto4 ||  0
                },
                water_schedule: waterSchedule
            }
        }

        await API.put(`/users/edit/${_id}`, data).then((response) => {
            setUserData(response.data);
            setUserDataInStorage(response.data);
        }).catch((e) => {
            console.log(e)
        });
    };

    const loadStateValues = (findedSettings) => {
        const form = {
            hora1: findedSettings.gl_start.hour,
            hora2: findedSettings.gl_middle.hour,
            hora3: findedSettings.gl_end.hour,
            hora4: findedSettings.water_config.hour,
            minuto1: findedSettings.gl_start.minute,
            minuto2: findedSettings.gl_middle.minute,
            minuto3: findedSettings.gl_end.minute,
            minuto4: findedSettings.water_config.minute
        }
        setFormValues(form);
    };

    useEffect(() => {
        if(waterSchedule.length > 0){
            handleEditSettings(value, formValues, waterSchedule);
        }
    }, [waterSchedule]);

    useEffect(() => {
        API.get(`/users/${_id}`).then((response) => {
            setUserData(response.data);
            const searchedGlConfig = response.data.gl_List.find((item) => {
                return item.day === value;
            })
            if(searchedGlConfig){
                loadStateValues(searchedGlConfig);
            }
        }).catch((e) => {
            console.log(e)
        })
    }, [value, _id])


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
        handleChange,
        formValues,
        handleFormChange,
        handleChangeV2
    }
}

export default SettingsHook