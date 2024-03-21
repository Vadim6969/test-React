import style from './AuthPage.module.scss';
import AuthForm from "../../components/AuthForm/AuthForm.tsx";


const AuthPage = () => {

    return (
        <div className={style.container}>
            <div className={style.background}></div>
            <AuthForm />
        </div>

    );
};

export default AuthPage;