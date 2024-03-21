import {useFormik} from "formik";
import style from './AuthForm.module.scss'
import {InputComponent} from "../InputComponent/InputComponent.tsx";
import SelectComponent from "../SelectComponent/SelectComponent.tsx";
import CheckboxChomponent from "../CheckboxComponent/CheckboxChomponent.tsx";
import ButtonComponent from "../ButtonComponent/ButtonComponent.tsx";
import {useMock} from "../../mockServer";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent.tsx";
import {useState} from "react";
import * as Yup from 'yup';


const options = [
    { "title": "Выбор 1", "value": "01" },
    { "title": "Выбор 2", "value": "02" },
    { "title": "Выбор 3", "value": "03" },
    { "title": "Выбор 4", "value": "04" },
]

const schema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Заполните поле'),
    password: Yup.string().required('Пароль обязательный'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    email: Yup.string().email('Заполните поле').required('Заполните поле'),
    checked: Yup
        .bool()
        .oneOf([true], 'Нужно подтвердить'),
});

const AuthForm = () => {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [isOk, setIsOK] = useState<boolean>(false);

    const {fetch} = useMock()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            selected: null,
            checked: false,
        },
        validationSchema: schema,
        onSubmit: values => {
            setIsloading(true);
            fetch(values).then(r => {
              if (r.data.message === 'OK') {
                        setIsOK(true);
              }
            }).finally(() => {
                setIsloading(false)
            })
        },
    });

    return (
        <div className={style.container}>
            {isLoading ? <SpinnerComponent/> :
                !isOk && <form className={style.form} onSubmit={formik.handleSubmit}>
                    <InputComponent
                        className={style.input}
                        label='Ваш ФИО'
                        name='name'
                        onChange={formik.handleChange}
                        required
                        type='text'
                        value={formik.values.name}
                        error={formik.errors.name}
                        placeholder='ФИО'/>

                    <InputComponent
                        className={style.input}
                        label='Ваш e-mail'
                        name='email'
                        onChange={formik.handleChange}
                        required
                        type='email'
                        value={formik.values.email}
                        error={formik.errors.email}
                        placeholder='Ваш e-mail'/>

                    <InputComponent
                        className={style.input}
                        label='Пароль'
                        name='password'
                        onChange={formik.handleChange}
                        required
                        type='password'
                        value={formik.values.password}
                        error={formik.errors.password}
                        placeholder='Пароль'/>

                    <InputComponent
                        className={style.input}
                        label='Повторите пароль'
                        name='repeatPassword'
                        onChange={formik.handleChange}
                        required
                        type='password'
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                        placeholder='Пароль'/>

                    <SelectComponent
                        label='Выберете пункт из списка'
                        options={options}
                        selected={formik.values.selected}
                        onChange={(v) => formik.setFieldValue('selected', {title: 'Выбор' + ' ' + v, value: v})}
                        placeholder="Выбор"
                    />

                    <div>
                        <CheckboxChomponent
                            className={style.checkbox}
                            error={formik.errors.checked}
                            name='checked'
                            checked={formik.values.checked}
                            onChange={formik.handleChange}
                            label={<>Я подтверждаю, что даю согласие на <a href="#">обработку персональных данных</a></>}/>
                    </div>

                    <ButtonComponent type='submit'>Регистрация</ButtonComponent>
                </form>}
            {isOk &&
                <div className={style['success-form']}>
                    <h1 className={style['success-form__title']}>Регистрация прошла успешно!</h1>
                    <p className={style['success-form__text']}>Поздравляем, вы успешно зарегистрировались на
                        портале!</p>
                    <p className={style['success-form__text']}>Письмо с подтверждением регистрации было выслано на вашу
                        почту</p>
                    <ButtonComponent type={'reset'}>ОТПРАВИТЬ ПОВТОРНО</ButtonComponent>
                </div>
            }
        </div>
    );
};

export default AuthForm;