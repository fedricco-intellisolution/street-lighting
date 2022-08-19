import { createContext, useContext, useReducer } from "react";
import api from "../utils/api";
// import { setSession, setUID } from "../utils/jwt";
// import * as authApi from "../api/authApi";
import NotyfContext from "../contexts/NotyfContext";
import { useNavigate } from "react-router-dom";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    uid: null,
};

const JWTReducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE:
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
                uid: action.payload.uid,
            };
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                uid: action.payload.uid,
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                uid: null,
                user: null,
            };

        case SIGN_UP:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };

        default:
            return state;
    }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(JWTReducer, initialState);
    const notyf = useContext(NotyfContext);
    const navigate = useNavigate();

    //   const initialize = useCallback(async () => {
    //       try {
    //         const accessToken = window.localStorage.getItem("accessToken");
    //         const uid = window.localStorage.getItem('uid')
    //         if (accessToken && isValidToken(accessToken)) {
    //           setSession(accessToken);
    //           const response = await usersApi.getUser(uid);
    //           const user  = response.data.data;
    //           dispatch({
    //             type: INITIALIZE,
    //             payload: {
    //               isAuthenticated: true,
    //               user,
    //             },
    //           });

    //         } else {
    //           dispatch({
    //             type: INITIALIZE,
    //             payload: {
    //               isAuthenticated: false,
    //               user: null,
    //             },
    //           });
    //           //navigate('/auth/sign-in')
    //         }
    //       } catch (err) {
    //         dispatch({
    //           type: INITIALIZE,
    //           payload: {
    //             isAuthenticated: false,
    //             user: null,
    //           },
    //         });

    //       }
    //   }, []);

    //   useEffect(() => {
    //     initialize();
    //   }, [initialize]);

    const signIn = async (data) => {
        navigate("/");
        // const response = await authApi.logIn(data);
        // if (response.data.status === "SUCCESS") {
        //     setSession(response.data.data.token);
        //     setUID(response.data.data.uid);
        //     const uid = response.data.data.uid;
        //     dispatch({
        //         type: SIGN_IN,
        //         payload: {
        //             uid,
        //         },
        //     });
        //     navigate("/");
        //     //   initialize()
        // }

        // if (response.data.status === "ERROR") {
        //     notyf.open({
        //         type: "danger",
        //         message: response.data.message,
        //     });
        // }
    };

    const signOut = async () => {
        navigate("/auth/sign-in");
        notyf.open({
            type: "success",
            message: "You've successfully logged out.",
        });
        // try {
        //     // const response = await authApi.logOut()
        //     setSession(null);
        //     setUID(null);
        //     dispatch({ type: SIGN_OUT });
        //     const accessToken = window.localStorage.getItem("accessToken");
        //     if (!accessToken) {
        //         navigate("/auth/sign-in");
        //         notyf.open({
        //             type: "success",
        //             message: "You've successfully logout",
        //         });
        //     }
        // } catch (error) {}
    };

    const signUp = async (email, password, firstName, lastName) => {
        const response = await api.post("/api/auth/sign-up", {
            email,
            password,
            firstName,
            lastName,
        });
        const { accessToken, user } = response.data;

        window.localStorage.setItem("accessToken", accessToken);
        dispatch({
            type: SIGN_UP,
            payload: {
                user,
            },
        });
    };

    const resetPassword = (email) => console.log(email);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: "jwt",
                signIn,
                signOut,
                signUp,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
